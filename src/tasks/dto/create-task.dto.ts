import { IsString, IsEnum, IsOptional } from "class-validator";

export class CreateTaskDto {

  @IsString()
  todo: string;

  @IsEnum(['complete', 'active'], { message: 'Status must be complete, pending or in-progress' })
  @IsOptional()
  status: 'complete' | 'active';
}
