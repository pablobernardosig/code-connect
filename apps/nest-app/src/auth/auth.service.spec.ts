import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { hash } from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const usersService = {
    findByEmail: jest.fn(),
    findById: jest.fn(),
    toPublicUser: jest.fn(),
  };
  const jwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService.findByEmail.mockReset();
    usersService.findById.mockReset();
    usersService.toPublicUser.mockReset();
    jwtService.signAsync.mockReset();
  });

  it('returns an access token for valid credentials', async () => {
    usersService.findByEmail.mockResolvedValue({
      id: 1,
      email: 'ada@example.com',
      passwordHash: await hash('secret', 10),
    });
    jwtService.signAsync.mockResolvedValue('signed-token');

    await expect(service.signIn('ada@example.com', 'secret')).resolves.toEqual({
      access_token: 'signed-token',
    });
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      sub: 1,
      email: 'ada@example.com',
    });
  });

  it('throws unauthorized when credentials are invalid', async () => {
    usersService.findByEmail.mockResolvedValue(null);

    await expect(
      service.signIn('ada@example.com', 'secret'),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('returns the public user profile', async () => {
    const user = {
      id: 1,
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      passwordHash: 'hash',
    };
    usersService.findById.mockResolvedValue(user);
    usersService.toPublicUser.mockReturnValue({
      id: 1,
      name: 'Ada Lovelace',
      email: 'ada@example.com',
    });

    await expect(service.getProfile(1)).resolves.toEqual({
      id: 1,
      name: 'Ada Lovelace',
      email: 'ada@example.com',
    });
  });
});
