import { BodyParams, Controller, Get, PathParams, Post, QueryParams, Request, Required, Response } from '@tsed/common';
import { MultipartFile } from "@tsed/multipartfiles";
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

  @Post('/videoFile')
  private uploadVideoFile(
    @Response() resp,
    @MultipartFile('file') file: Express.Multer.File) {
    return resp.status(200).send({fileName: file.filename, path: file.path});
  }

  @Post('/thumbnailFile')
  private uploadThumbnailFile(
    @Response() resp,
    @MultipartFile('file') file: Express.Multer.File) {
    return resp.status(200).send({fileName: file.filename, path: file.path});
  }

  @Post('')
  saveVideo(
    @Request() request,
    @Response() response,
    @Required() @BodyParams() video: Video
  ){
    return this.videoService.saveVideo(video);
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
