import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  const authService = {
    signIn: jest.fn(),
    getProfile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: JwtService, useValue: { verifyAsync: jest.fn() } },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService.signIn.mockReset();
    authService.getProfile.mockReset();
  });

  it('signs in with email and password', async () => {
    authService.signIn.mockResolvedValue({ access_token: 'token' });

    await expect(
      controller.signIn({ email: 'ada@example.com', password: 'secret' }),
    ).resolves.toEqual({ access_token: 'token' });
    expect(authService.signIn).toHaveBeenCalledWith(
      'ada@example.com',
      'secret',
    );
  });

  it('returns the logged in user profile', async () => {
    const profile = { id: 1, name: 'Ada Lovelace', email: 'ada@example.com' };
    authService.getProfile.mockResolvedValue(profile);

    await expect(
      controller.getProfile({ user: { sub: 1, email: 'ada@example.com' } }),
    ).resolves.toEqual(profile);
    expect(authService.getProfile).toHaveBeenCalledWith(1);
  });
});
