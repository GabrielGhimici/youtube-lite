import { Controller, Get, QueryParams } from '@tsed/common';
import { VideoService } from './video.service';
import { Video } from '../model/video.model';

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
}
