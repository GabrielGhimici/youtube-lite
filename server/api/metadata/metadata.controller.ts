import { Controller, Get, PathParams, Post, QueryParams, Request } from '@tsed/common';
import { MetadataService } from './metadata.service';
import { Metadata } from '../model/metadata.model';

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
