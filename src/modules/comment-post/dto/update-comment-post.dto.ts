import { ICommentPostModel } from '@comment-post/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export type IUpdateCommentPostDTO = Pick<ICommentPostModel, 'content'>;

export class UpdateCommentPostDTO implements IUpdateCommentPostDTO {
    @ApiProperty({ example: 'The quick brown fox jumps over the lazy dog' })
    @IsNotEmpty()
    @IsString()
    content: string;
}
