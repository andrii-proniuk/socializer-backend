import { Exclude } from 'class-transformer';
import { SignUpResponseDto } from './sign-up.response-dto';

@Exclude()
export class SignInResponseDto extends SignUpResponseDto {}
