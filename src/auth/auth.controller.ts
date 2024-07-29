import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { UniqueEmailGuard } from './guards/unique-email.guard';
import { SignUpResponseDto } from './response-dto/sign-up.response-dto';
import { SignInResponseDto } from './response-dto/sign-in.response-dto';
import { SignInDto } from './dto/sign-in.dto';
import { RefreshGuard } from './guards/refresh.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../repositories/entities/user.entity';
import { RefreshResponseDto } from './response-dto/refresh.response-dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @UseGuards(UniqueEmailGuard)
  async signUp(@Body() signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
    return this.authService.signIn(signInDto);
  }

  @ApiBearerAuth('refresh')
  @Post('refresh')
  @UseGuards(RefreshGuard)
  async refresh(@GetUser() user: User): Promise<RefreshResponseDto> {
    return this.authService.refresh(user);
  }
}
