import { Controller, Get, QueryParams } from '@tsed/common';
import { CommentService } from './comment.service';
import { Comment } from '../model/comment.model';

@Controller('/comments')
export class CommentController {

  constructor(
    private commentService: CommentService
  ) {}

  @Get('')
  getCommentList(
    @QueryParams() query: any
  ): Promise<Array<Comment>> {
    return this.commentService.getAllComments(query);
  }
}
