import { BodyParams, Controller, Get, Post, QueryParams, Request, Required, Response } from '@tsed/common';
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

  @Post('')
  saveUser(
    @Request() request,
    @Response() response,
    @Required() @BodyParams() comment: Comment,
    @QueryParams() query: any
  ){
    return this.commentService.saveComment(comment, query);
  }
}
