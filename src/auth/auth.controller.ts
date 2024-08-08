import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { UniqueEmailGuard } from './guards/unique-email.guard';
import { SignInDto } from './dto/sign-in.dto';
import { RefreshGuard } from './guards/refresh.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../repositories/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MongooseDocument } from '../common/types/mongoose-document.type';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @UseGuards(UniqueEmailGuard)
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @ApiBearerAuth('refresh')
  @Post('refresh')
  @UseGuards(RefreshGuard)
  async refresh(@GetUser() user: MongooseDocument<User>) {
    return this.authService.refresh(user);
  }
}
