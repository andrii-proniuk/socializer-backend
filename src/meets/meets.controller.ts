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
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { GetMeetsDto } from './dto/get-meets.dto';
import { Locals } from '../common/decorators/locals.decorator';
import {
  MeetMember,
  MeetMemberStatusEnum,
} from '../repositories/entities/meet-member';
import { Meet } from '../repositories/entities/meet.entity';
import { MeetMemberExistsGuard } from './guards/meet-member-exists.guard';
import { MeetExistsGuard } from './guards/meet-exists.guard';
import { ProfileCanGetMembersGuard } from './guards/profile-can-get-members.guard';
import { MeetOwnerGuard } from './guards/meet-owner.guard';
import { MeetNotStartedGuard } from './guards/meet-not-started.guard';
import { CheckMeetMemberStatus } from './decorators/check-meet-member-status.decorator';
import { MeetMemberNotOwnerGuard } from './guards/meet-member-not-owner.guard';
import { MeetMemberStatusGuard } from './guards/meet-member-status.guard';
import { ProfileCanJoinMeetGuard } from './guards/profile-can-join-meet.guard';
import { GetMeetMembersDto } from './dto/get-meet-members.dto';

@ApiTags('meets')
@ApiBearerAuth('default')
@Controller('meets')
@UseGuards(AuthGuard)
export class MeetsController {
  constructor(private meetsService: MeetsService) {}

  @Post()
  async create(@GetUser() user: User, @Body() createMeetDto: CreateMeetDto) {
    return this.meetsService.create(user.profile, createMeetDto);
  }

  @Get()
  async getNearby(@Query() getMeetsDto: GetMeetsDto) {
    return this.meetsService.getNearby(getMeetsDto);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'string' })
  @UseGuards(MeetExistsGuard)
  async getById(@Param('id') id: string) {
    return this.meetsService.getById(id);
  }

  @Post(':id/join')
  @ApiParam({ name: 'id', type: 'string' })
  @UseGuards(MeetExistsGuard, MeetNotStartedGuard, ProfileCanJoinMeetGuard)
  async joinMeet(@GetUser() { profile }: User, @Locals('meet') meet: Meet) {
    return this.meetsService.joinMeet(profile, meet);
  }

  @Patch(':id/member/:profileId/accept')
  @ApiParam({ name: 'profileId', type: 'string' })
  @ApiParam({ name: 'id', type: 'string' })
  @CheckMeetMemberStatus(MeetMemberStatusEnum.Pending)
  @UseGuards(
    MeetMemberExistsGuard,
    MeetOwnerGuard,
    MeetMemberStatusGuard,
    MeetNotStartedGuard,
  )
  async acceptMember(@Locals('meetMember') meetMember: MeetMember) {
    return this.meetsService.acceptMember(meetMember);
  }

  @Patch(':id/member/:profileId/reject')
  @ApiParam({ name: 'profileId', type: 'string' })
  @ApiParam({ name: 'id', type: 'string' })
  @CheckMeetMemberStatus(MeetMemberStatusEnum.Pending)
  @UseGuards(
    MeetMemberExistsGuard,
    MeetOwnerGuard,
    MeetMemberStatusGuard,
    MeetNotStartedGuard,
  )
  async rejectMember(@Locals('meetMember') meetMember: MeetMember) {
    return this.meetsService.rejectMember(meetMember);
  }

  @Patch(':id/member/:profileId/kick')
  @ApiParam({ name: 'profileId', type: 'string' })
  @ApiParam({ name: 'id', type: 'string' })
  @CheckMeetMemberStatus(MeetMemberStatusEnum.Accepted)
  @UseGuards(
    MeetMemberExistsGuard,
    MeetOwnerGuard,
    MeetMemberStatusGuard,
    MeetNotStartedGuard,
  )
  async kickMember(@Locals('meetMember') meetMember: MeetMember) {
    return this.meetsService.kickMember(meetMember);
  }

  @Patch(':id/leave')
  @ApiParam({ name: 'id', type: 'string' })
  @CheckMeetMemberStatus(MeetMemberStatusEnum.Accepted)
  @UseGuards(
    MeetMemberExistsGuard,
    MeetMemberNotOwnerGuard,
    MeetMemberStatusGuard,
    MeetNotStartedGuard,
  )
  async leaveMeet(@Locals('meetMember') meetMember: MeetMember) {
    return this.meetsService.leaveMeet(meetMember);
  }

  @Get(':id/members')
  @ApiParam({ name: 'id', type: 'string' })
  @UseGuards(MeetExistsGuard, ProfileCanGetMembersGuard)
  async getMembers(
    @Locals('meet') meet: Meet,
    @GetUser() { profile }: User,
    @Query() getMeetMembersDto: GetMeetMembersDto,
  ) {
    return this.meetsService.getMembers(profile, meet, getMeetMembersDto);
  }
}
