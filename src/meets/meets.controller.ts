import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MeetsService } from './meets.service';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../repositories/entities/user.entity';
import { CreateMeetDto } from './dto/create-meet.dto';
import { CreateMeetResponseDto } from './response-dto/create-meet.response-dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetMeetResponseDto } from './response-dto/get-meets.response-dto';
import { GetMeetsDto } from './dto/get-meets.dto';

@ApiTags('meets')
@ApiBearerAuth('default')
@Controller('meets')
@UseGuards(AuthGuard)
export class MeetsController {
  constructor(private meetsService: MeetsService) {}

  // TODO: add date/time validation guard
  @Post()
  async create(
    @GetUser() user: User,
    @Body() createMeetDto: CreateMeetDto,
  ): Promise<CreateMeetResponseDto> {
    console.log({ createMeetDto });
    return this.meetsService.create(user, createMeetDto);
  }

  @Get()
  async getNearby(
    @GetUser() user: User,
    @Query() getMeetsDto: GetMeetsDto,
  ): Promise<GetMeetResponseDto[]> {
    return this.meetsService.getNearby(user, getMeetsDto);
  }

  @Get('owner/:ownerId')
  async getByOwner(@Param('ownerId') owner: string) {
    return this.meetsService.getByOwner(owner);
  }
}
