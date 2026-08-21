import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isTest = configService.get('NODE_ENV') === 'test';

        return {
          type: 'postgres' as const,
          host: configService.get<string>('POSTGRES_HOST', 'localhost'),
          port: Number(configService.get('POSTGRES_PORT', 5432)),
          username: configService.get<string>('POSTGRES_USER', 'codeconnect'),
          password: configService.get<string>(
            'POSTGRES_PASSWORD',
            'codeconnect',
          ),
          database: isTest
            ? configService.get<string>('POSTGRES_TEST_DB', 'codeconnect_test')
            : configService.get<string>('POSTGRES_DB', 'codeconnect'),
          autoLoadEntities: true,
          synchronize: configService.get('NODE_ENV') !== 'production',
          retryAttempts: 10,
          retryDelay: 3000,
        };
      },
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
