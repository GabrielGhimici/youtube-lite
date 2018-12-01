import { Service } from '@tsed/common';
import { ConnectionManager } from '../../connection-manager';
import { Video } from '../model/video.model';

@Service()
export class VideoService {
  private readonly allIncludeValues = ['owner', 'metadata', 'comments'];

  constructor(
    private conManager: ConnectionManager
  ) {}

  getAllVideos(queryParams: any): Promise<Array<Video>> {
    const includeValue: string = queryParams ? queryParams['include'] : '';
    const includeList: Array<string> = includeValue ? includeValue.split(',').map(el => el.replace(/\s+/g, '')) : [];
    if (includeList.length !== 0) {
      const relationArr = this.allIncludeValues.filter(el => includeList.indexOf(el) >= 0);
      return this.conManager.connection.then((connection) => {
        return connection.getRepository(Video).find({relations: relationArr});
      });
    }
    return this.conManager.connection.then((connection) => {
      return connection.manager.find(Video)
    })
  }

}
