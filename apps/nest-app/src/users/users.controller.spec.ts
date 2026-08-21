import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  const usersService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: usersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService.create.mockReset();
  });

  it('creates a user from the request body', async () => {
    const created = { id: 1, name: 'Ada Lovelace', email: 'ada@example.com' };
    usersService.create.mockResolvedValue(created);

    await expect(
      controller.create({
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        password: 'secret',
      }),
    ).resolves.toEqual(created);

    expect(usersService.create).toHaveBeenCalledWith(
      'Ada Lovelace',
      'ada@example.com',
      'secret',
    );
  });
});
