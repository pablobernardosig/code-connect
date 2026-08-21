import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcryptjs';
import { QueryFailedError, Repository } from 'typeorm';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(
    name: string,
    email: string,
    password: string,
  ): Promise<UserResponseDto> {
    const normalizedEmail = email.toLowerCase();
    const existing = await this.findByEmail(normalizedEmail);

    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const user = this.usersRepository.create({
      name,
      email: normalizedEmail,
      passwordHash: await hash(password, 10),
    });

    try {
      const saved = await this.usersRepository.save(user);
      return this.toPublicUser(saved);
    } catch (error) {
      if (isPostgresUniqueViolation(error)) {
        throw new ConflictException('Email already in use');
      }

      throw error;
    }
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email: email.toLowerCase() });
  }

  findById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  toPublicUser(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}

function isPostgresUniqueViolation(error: unknown): boolean {
  if (!(error instanceof QueryFailedError)) {
    return false;
  }

  const driverError: unknown = error.driverError;
  if (typeof driverError !== 'object' || driverError === null) {
    return false;
  }

  return 'code' in driverError && driverError.code === '23505';
}
