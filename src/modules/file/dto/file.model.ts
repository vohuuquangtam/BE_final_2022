import { ApiProperty } from '@nestjs/swagger';
import { QuestionModel } from '@question/dto';
import { UserModel } from '@user/dto';

export interface IFileModel {
    fileName: string;
    fileDownloadUri: string;
    fileType: string;
    size: number;
}

export class FileModel implements IFileModel {
    @ApiProperty()
    fileName: string;

    @ApiProperty()
    fileDownloadUri: string;

    @ApiProperty()
    fileType: string;

    @ApiProperty()
    size: number;
}