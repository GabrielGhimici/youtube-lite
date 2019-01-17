import { BodyParams, Controller, Get, PathParams, Post, QueryParams, Request, Required, Response } from '@tsed/common';
import { MetadataService } from './metadata.service';
import { Metadata } from '../model/metadata.model';
import { Video } from '../model/video.model';

@Controller('/metadata')
export class MetadataController {

  constructor(
    private metadataService: MetadataService
  ) {}

  @Get('')
  getMetadataList(
    @QueryParams() query: any
  ): Promise<Array<Metadata>> {
    return this.metadataService.getAllMetadataElements(query);
  }

  @Post('')
  saveMetadata(
    @Request() request,
    @Response() response,
    @Required() @BodyParams() meta: Metadata
  ){
    return this.metadataService.saveMeta(meta);
  }

  @Post('/:id(\\d+)/like')
  doLike(
    @Request() request,
    @PathParams("id") id: number,
  ): Promise<Metadata> {
    return this.metadataService.doLike(id);
  }

  @Post('/:id(\\d+)/dislike')
  doDislike(
    @Request() request,
    @PathParams("id") id: number,
  ): Promise<Metadata> {
    return this.metadataService.doDislike(id);
  }
}
