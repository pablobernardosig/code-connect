import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QueryFailedError } from 'typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  const usersRepository = {
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: usersRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository.findOneBy.mockReset();
    usersRepository.create.mockReset();
    usersRepository.save.mockReset();
  });

  it('creates a user without exposing the password hash', async () => {
    usersRepository.findOneBy.mockResolvedValue(null);
    usersRepository.create.mockImplementation((data: Partial<User>) => data);
    usersRepository.save.mockImplementation((user: Partial<User>) =>
      Promise.resolve({ id: 1, ...user }),
    );

    const user = await service.create(
      'Ada Lovelace',
      'ada@example.com',
      'secret',
    );

    expect(user).toEqual({
      id: 1,
      name: 'Ada Lovelace',
      email: 'ada@example.com',
    });
    expect(user).not.toHaveProperty('passwordHash');
  });

  it('throws conflict when email is already in use', async () => {
    usersRepository.findOneBy.mockResolvedValue({
      id: 1,
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      passwordHash: 'hash',
    });

    await expect(
      service.create('Ada', 'ADA@example.com', 'other'),
    ).rejects.toBeInstanceOf(ConflictException);
    expect(usersRepository.save).not.toHaveBeenCalled();
  });

  it('throws conflict when postgres reports a unique violation', async () => {
    usersRepository.findOneBy.mockResolvedValue(null);
    usersRepository.create.mockImplementation((data: Partial<User>) => data);
    const driverError = Object.assign(new Error('duplicate key'), {
      code: '23505',
    });
    usersRepository.save.mockRejectedValue(
      new QueryFailedError('INSERT', [], driverError),
    );

    await expect(
      service.create('Ada', 'ada@example.com', 'secret'),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('finds a user by email and id', async () => {
    const stored = {
      id: 1,
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      passwordHash: 'hash',
    };
    usersRepository.findOneBy.mockResolvedValue(stored);

    await expect(service.findByEmail('ada@example.com')).resolves.toEqual(
      stored,
    );
    await expect(service.findById(1)).resolves.toEqual(stored);
  });
});
