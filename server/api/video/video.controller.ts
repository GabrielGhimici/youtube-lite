import { Controller, Get, PathParams, QueryParams, Request } from '@tsed/common';
import { VideoService } from './video.service';
import { Video } from '../model/video.model';
import { User } from '../model/user.model';

@Controller('/videos')
export class VideoController {

  constructor(
    private videoService: VideoService
  ) {}

  @Get('')
  getVideoList(
    @QueryParams() query: any
  ): Promise<Array<Video>> {
    return this.videoService.getAllVideos(query);
  }

  @Get('/:id(\\d+)')
  getVideo(
    @Request() request,
    @PathParams("id") id: number,
    @QueryParams() query: any
  ): Promise<User> {
    return this.videoService.getCurrentVideo(id, query);
  }
}
