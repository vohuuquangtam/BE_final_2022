import { AppResources } from '@/app.roles';
import { BaseService } from '@/commons/base-service';
import { grantPermission, IDeleteResultDTO } from '@/shared';
import {
    CommentQuestionParam,
    CreateCommentQuestionDTO,
    ICommentQuestionRO,
    UpdateCommentQuestionDTO,
} from '@comment-question/dto';
import { CommentQuestionEntity } from '@comment-question/entities';
import { CommentQuestionRepository } from '@comment-question/repositories';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IQuestionRO } from '@question/dto';
import { QuestionRepository } from '@question/repositories';
import { JwtUser } from '@user/dto';
import { UserRepository } from '@user/repositories';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { RecommenderService } from '../recommender/recommender.service';
import { FileModel } from './dto/file.model';

@Injectable()
export class FileService extends BaseService<
    CommentQuestionEntity,
    CommentQuestionRepository
> {
    constructor(
        private readonly commentQuestionRepository: CommentQuestionRepository,
        private readonly questionRepository: QuestionRepository,
        private readonly userRepository: UserRepository,
        private readonly recommenderService: RecommenderService,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder,
    ) {
        super(commentQuestionRepository);
    }

    async uploadFile(
        id: string,
        data: FileModel,
        jwtUser: JwtUser,
    ): Promise<FileModel> {
        const [question, user] = await Promise.all([
            this.questionRepository.getQuestionById(id),
            this.userRepository.findOne({ where: { id: jwtUser.id } }),
        ]);
        if (!user) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        if (question) {
            return data;
        } else
            throw new HttpException(
                `Question with id: ${id} not found`,
                HttpStatus.NOT_FOUND,
            );
    }

}