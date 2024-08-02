import { Module } from '@nestjs/common';
import { MeetsController } from './meets.controller';
import { MeetsService } from './meets.service';
import { MeetsRepositoryModule } from '../repositories/meetings/meets-repository.module';

@Module({
  imports: [MeetsRepositoryModule],
  controllers: [MeetsController],
  providers: [MeetsService],
})
export class MeetsModule {}
