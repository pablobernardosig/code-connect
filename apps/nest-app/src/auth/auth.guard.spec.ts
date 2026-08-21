import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  const jwtService = {
    verifyAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthGuard, { provide: JwtService, useValue: jwtService }],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
    jwtService.verifyAsync.mockReset();
  });

  function createContext(authorization?: string) {
    const request = {
      headers: { authorization },
    };

    return {
      request,
      context: {
        switchToHttp: () => ({
          getRequest: () => request,
        }),
      } as ExecutionContext,
    };
  }

  it('allows a request with a valid bearer token', async () => {
    const payload = { sub: 1, email: 'ada@example.com' };
    jwtService.verifyAsync.mockResolvedValue(payload);
    const { request, context } = createContext('Bearer valid-token');

    await expect(guard.canActivate(context)).resolves.toBe(true);
    expect(request.user).toEqual(payload);
    expect(jwtService.verifyAsync).toHaveBeenCalledWith('valid-token');
  });

  it('throws unauthorized when the token is missing', async () => {
    const { context } = createContext();

    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });

  it('throws unauthorized when the token is invalid', async () => {
    jwtService.verifyAsync.mockRejectedValue(new Error('invalid token'));
    const { context } = createContext('Bearer invalid-token');

    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });
});
