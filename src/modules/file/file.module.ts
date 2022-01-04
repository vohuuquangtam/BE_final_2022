import { CommentQuestionController } from '@comment-question/comment-question.controller';
import { CommentQuestionService } from '@comment-question/comment-question.service';
import { CommentQuestionRepository } from '@comment-question/repositories';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionRepository } from '@question/repositories';
import { RecommenderModule } from '@recommender/recommender.module';
import { UserRepository } from '@user/repositories';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CommentQuestionRepository,
            QuestionRepository,
            UserRepository,
        ]),
        RecommenderModule,
    ],
    controllers: [FileController],
    providers: [FileService],
})
export class CommentQuestionModule {}