import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { QueryOptions } from 'mongoose';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(20)
  limit?: number = 10;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  skip?: number = 0;

  getPaginationOptions(): QueryOptions {
    return { limit: this.limit + 1, skip: this.skip };
  }
}
