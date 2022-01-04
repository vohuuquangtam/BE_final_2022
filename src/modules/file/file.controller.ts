import { FindOneParams, IDeleteResultDTO } from '@/shared';
import { Auth } from '@/shared/auth';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtUser } from '@user/dto';
import { User } from '@user/user.decorator';
import { FileModel } from './dto/file.model';
import { FileService } from './file.service';

@ApiTags('files')
@Controller()
export class FileController {
    constructor(
        private readonly fileService: FileService,
    ) {}

    @Auth()
    @ApiOperation({
        summary: 'Create question comment by :questionId',
        description: 'Create a comment with questionId',
    })
    @Post('upload')
    createComment(
        @Param() { id }: FindOneParams,
        @Body() data: FileModel,
        @User() jwtUser: JwtUser,
    ): Promise<FileModel> {
        return this.fileService.uploadFile(id, data, jwtUser);
    }
}