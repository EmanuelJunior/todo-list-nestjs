import { CreateTaskDto } from './create-task.dto';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsEnum } from 'class-validator';

export class FilterSearchTaskDto extends PartialType( OmitType(CreateTaskDto, ['status'] as const) ) {
  @IsEnum(['complete', 'active', 'all'], {
    message: 'Status must be complete, active or all',
  })
  @IsOptional()
  status: 'complete' | 'active' | 'all';
}