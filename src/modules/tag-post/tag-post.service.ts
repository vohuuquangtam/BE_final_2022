import { AppResources } from '@/app.roles';
import { BaseService } from '@/commons';
import {
    customPaginate,
    grantPermission,
    IPagination,
    paginateFilter,
    PaginateParams,
} from '@/shared';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ITagPostRO, TagPostRO } from '@tag-post/dto';
import { TagPostEntity } from '@tag-post/entities';
import { TagPostRepository } from '@tag-post/repositories';
import { JwtUser } from '@user/dto';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';

@Injectable()
export class TagPostService extends BaseService<
    TagPostEntity,
    TagPostRepository
> {
    constructor(
        private readonly tagPostRepository: TagPostRepository,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder,
    ) {
        super(tagPostRepository);
    }

    async getAllTags(
        pagOpts: PaginateParams,
        jwtUser: JwtUser,
    ): Promise<IPagination<ITagPostRO>> {
        const permission = grantPermission(
            this.rolesBuilder,
            AppResources.TAG_POST,
            'read',
            jwtUser,
            null,
        );
        if (permission.granted) {
            try {
                const data = await this.tagPostRepository.getAllTags(pagOpts);
                const result = customPaginate<TagPostRO>(data, pagOpts);
                return paginateFilter(result, permission);
            } catch ({ detail }) {
                throw new HttpException(
                    detail || `Oops! Can't get all tags`,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        } else
            throw new HttpException(
                `You don't have permission for this!`,
                HttpStatus.FORBIDDEN,
            );
    }
}
