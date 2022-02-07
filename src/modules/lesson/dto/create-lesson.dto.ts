import { ILessonModel } from '@lesson/dto/lesson.model';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export type ICreateLessonDTO = Omit<ILessonModel, 'classe'>;

export class CreateLessonDTO implements ICreateLessonDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    duration: number;

    @ApiProperty()
    @IsOptional()
    @IsUrl()
    featuredvideo: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    @Transform(value => new Date(value))
    startTime: Date;
}
