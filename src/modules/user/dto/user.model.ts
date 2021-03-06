import { AppRoles } from '@/app.roles';
import { ApiProperty } from '@nestjs/swagger';
import { IPostModel, PostModel } from '@post/dto';
import { IQuestionModel, QuestionModel } from '@question/dto';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export interface IUserModel {
    id: string;
    username: string;
    email: string;
    phoneNumber: string;
    name: string;
    avatarUrl: string;
    roles: AppRoles[];
    password: string;
    posts: Partial<IPostModel>[];
    questions: Partial<IQuestionModel>[];
    createdAt?: Date;
    updatedAt?: Date;
}

export class UserModel implements IUserModel {
    @ApiProperty()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    phoneNumber: string;

    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    avatarUrl: string;

    @ApiProperty()
    roles: AppRoles[];

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message:
            'Too weak password. Require minimum 8 characters, at least 1 letter, 1 number and 1 special character',
    })
    password: string;

    @ApiProperty()
    posts: PostModel[];

    @ApiProperty()
    questions: QuestionModel[];

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
