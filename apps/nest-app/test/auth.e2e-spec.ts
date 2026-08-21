import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { DataSource } from 'typeorm';
import { AppModule } from './../src/app.module';
import { configureApp } from './../src/configure-app';

describe('Auth (e2e)', () => {
  let app: INestApplication<App>;

  const user = {
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    password: 'secret123',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configureApp(app);
    await app.init();

    const dataSource = app.get(DataSource);
    await dataSource.query('TRUNCATE TABLE "users" RESTART IDENTITY CASCADE');
  });

  afterEach(async () => {
    await app.close();
  });

  it('registers, logs in and returns the authenticated profile', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(201)
      .expect({
        id: 1,
        name: user.name,
        email: user.email,
      });

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: user.email, password: user.password })
      .expect(200);

    const { access_token } = loginResponse.body as { access_token: string };
    expect(typeof access_token).toBe('string');

    await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200)
      .expect({
        id: 1,
        name: user.name,
        email: user.email,
      });
  });

  it('returns 401 when the profile is requested without a token', async () => {
    await request(app.getHttpServer()).get('/auth/profile').expect(401);
  });

  it('returns 409 when the email is already registered', async () => {
    await request(app.getHttpServer()).post('/users').send(user).expect(201);
    await request(app.getHttpServer()).post('/users').send(user).expect(409);
  });

  it('returns 401 when login credentials are invalid', async () => {
    await request(app.getHttpServer()).post('/users').send(user).expect(201);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: user.email, password: 'wrong-password' })
      .expect(401);
  });

  it('returns 400 when the register payload is invalid', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({ name: '', email: 'not-an-email', password: '' })
      .expect(400);
  });
});
