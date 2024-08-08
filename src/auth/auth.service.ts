import { BadRequestException, Injectable } from '@nestjs/common';
import * as jwt from 'jwt-simple';
import { UsersRepositoryService } from '../repositories/users/users-repository.service';
import { SignUpDto } from './dto/sign-up.dto';
import { plainToInstance } from 'class-transformer';
import { SignUpResponseDto } from './response-dto/sign-up.response-dto';
import { IJwtTokens } from './interfaces/jwt-tokens.interface';
import { User } from '../repositories/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from '../config/configuration.types';
import { SignInDto } from './dto/sign-in.dto';
import { SignInResponseDto } from './response-dto/sign-in.response-dto';
import { RefreshResponseDto } from './response-dto/refresh.response-dto';
import {
  SuccessResponseDto,
  SuccessResponseDtoParams,
} from '../common/response-dto/success.response-dto';
import { MongooseDocument } from '../common/types/mongoose-document.type';

@Injectable()
export class AuthService {
  private jwtConfig: JwtConfig;

  constructor(
    configService: ConfigService,
    private usersRepositoryService: UsersRepositoryService,
  ) {
    this.jwtConfig = configService.get<JwtConfig>('jwt');
  }

  private generateTokens({ id }: User): IJwtTokens {
    const commonPayload = { id };
    const accessPayload = {
      ...commonPayload,
      exp: Math.floor((Date.now() + this.jwtConfig.accessExpiration) / 1000),
    };
    const refreshPayload = {
      ...commonPayload,
      exp: Math.floor((Date.now() + this.jwtConfig.refreshExpiration) / 1000),
    };

    return {
      accessToken: jwt.encode(accessPayload, this.jwtConfig.accessSecret),
      refreshToken: jwt.encode(refreshPayload, this.jwtConfig.refreshSecret),
    };
  }

  async signUp(signUpDto: SignUpDto) {
    const user = await this.usersRepositoryService.create(signUpDto);

    const tokens = this.generateTokens(user);

    return plainToInstance<
      SuccessResponseDto<SignUpResponseDto>,
      SuccessResponseDtoParams
    >(SuccessResponseDto<SignUpResponseDto>, {
      type: SignUpResponseDto,
      data: user,
      additionalData: tokens,
    });
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersRepositoryService.getByEmail(signInDto.email);

    if (!user) {
      throw new BadRequestException({
        message: 'Invalid email or/and password',
      });
    }

    const isValidPassword = await User.validatePassword(
      user,
      signInDto.password,
    );

    if (!isValidPassword) {
      throw new BadRequestException({
        message: 'Invalid email or/and password',
      });
    }

    const tokens = this.generateTokens(user);

    return plainToInstance<
      SuccessResponseDto<SignInResponseDto>,
      SuccessResponseDtoParams
    >(SuccessResponseDto<SignInResponseDto>, {
      type: SignInResponseDto,
      data: user,
      additionalData: tokens,
    });
  }

  async refresh(user: MongooseDocument<User>) {
    const tokens = this.generateTokens(user);

    return plainToInstance<
      SuccessResponseDto<RefreshResponseDto>,
      SuccessResponseDtoParams
    >(SuccessResponseDto<RefreshResponseDto>, {
      type: RefreshResponseDto,
      data: user,
      additionalData: tokens,
    });
  }
}
