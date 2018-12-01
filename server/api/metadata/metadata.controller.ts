import { Controller, Get, QueryParams } from '@tsed/common';
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
}
