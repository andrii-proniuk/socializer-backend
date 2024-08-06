import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
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
import { Locals } from '../common/decorators/locals.decorator';
import { MeetMember } from '../repositories/entities/meet-member';
import { Meet } from '../repositories/entities/meet.entity';
import { GetMeetMemberResponseDto } from './response-dto/get-meet-member.response-dto';
import { MeetMemberExistsGuard } from './guards/meet-member-exists.guard';
import { MeetExistsGuard } from './guards/meet-exists.guard';

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
    return this.meetsService.create(user.profile, createMeetDto);
  }

  @Get()
  async getNearby(
    @Query() getMeetsDto: GetMeetsDto,
  ): Promise<GetMeetResponseDto[]> {
    return this.meetsService.getNearby(getMeetsDto);
  }

  @Get(':id')
  @UseGuards(MeetExistsGuard)
  async getById(@Param('id') id: string) {
    return this.meetsService.getById(id);
  }

  @Post(':id/request')
  async createMember(@GetUser() user: User, @Locals('meet') meet: Meet) {
    return this.meetsService.createMember(user.profile, meet);
  }

  @Patch(':id/member/:profileId/accept')
  @UseGuards(MeetMemberExistsGuard)
  async acceptMember(
    @Locals('meetMember') meetMember: MeetMember,
  ): Promise<GetMeetMemberResponseDto> {
    return this.meetsService.acceptMember(meetMember);
  }

  @Patch(':id/member/:profileId/reject')
  @UseGuards(MeetMemberExistsGuard)
  async rejectMember(
    @Locals('meetMember') meetMember: MeetMember,
  ): Promise<GetMeetMemberResponseDto> {
    return this.meetsService.rejectMember(meetMember);
  }

  @Patch(':id/member/:profileId/kick')
  @UseGuards(MeetMemberExistsGuard)
  async kickMember(
    @Locals('meetMember') meetMember: MeetMember,
  ): Promise<GetMeetMemberResponseDto> {
    return this.meetsService.kickMember(meetMember);
  }

  @Patch(':id/leave')
  @UseGuards(MeetMemberExistsGuard)
  async leaveMeet(
    @Locals('meetMember') meetMember: MeetMember,
  ): Promise<GetMeetMemberResponseDto> {
    return this.meetsService.leaveMeet(meetMember);
  }

  @Get(':id/members')
  @UseGuards()
  async getMembers(
    @Param('id') meetId: string,
  ): Promise<GetMeetMemberResponseDto[]> {
    return this.meetsService.getMembers(meetId);
  }
}
