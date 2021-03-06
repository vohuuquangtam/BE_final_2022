import { ApiProperty } from '@nestjs/swagger';
import { IPostModel } from '@post/dto';
import { CreateTagPostDTO } from '@tag-post/dto';
import {
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    MinLength,
} from 'class-validator';

export type IUpdatePostDTO = Omit<
    IPostModel,
    'author' | 'createdAt' | 'updatedAt'
>;

export class UpdatePostDTO implements IUpdatePostDTO {
    @ApiProperty({ example: 'The quick brown fox jumps over the lazy dog' })
    @IsOptional()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'The quick brown fox jumps over the lazy dog' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    subTitle: string;

    @ApiProperty({ example: 'https://doramatching.tk/abc.jpg' })
    @IsOptional()
    @IsString()
    @IsUrl()
    featuredImage: string;

    @ApiProperty({ example: true })
    @IsOptional()
    @IsBoolean()
    isDraft: boolean;

    @ApiProperty({ example: 'The quick brown fox jumps over the lazy dog' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MinLength(43, {
        message:
            'The text you wrote is shorter than "The quick brown fox jumps over the lazy dog"! Please write more...',
    })
    content: string;

    @ApiProperty({ type: () => CreateTagPostDTO, isArray: true })
    @IsArray()
    @IsOptional()
    tags: CreateTagPostDTO[];
}
