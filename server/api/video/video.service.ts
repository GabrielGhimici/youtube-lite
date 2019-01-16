import { Service } from '@tsed/common';
import { ConnectionManager } from '../../connection-manager';
import { Video } from '../model/video.model';
import { Like } from 'typeorm';
import { User } from '../model/user.model';

@Service()
export class VideoService {
  private readonly allIncludeValues = ['owner', 'metadata', 'comments', 'comments.owner'];

  constructor(
    private conManager: ConnectionManager
  ) {}

  getAllVideos(queryParams: any): Promise<Array<Video>> {
    const includeValue: string = queryParams ? queryParams['include'] : '';
    const queryValue: string = queryParams ? queryParams['q'] : '';
    const includeList: Array<string> = includeValue ? includeValue.split(',').map(el => el.replace(/\s+/g, '')) : [];
    if (includeList.length !== 0) {
      const relationArr = this.allIncludeValues.filter(el => includeList.indexOf(el) >= 0);
      return this.conManager.connection.then((connection) => {
        return queryValue ?
          connection.getRepository(Video).find({name: Like(`%${queryValue}%`)},{relations: relationArr}) :
          connection.getRepository(Video).find({relations: relationArr});
      });
    }
    return this.conManager.connection.then((connection) => {
      return queryValue ? connection.getRepository(Video).find({name: Like(`%${queryValue}%`)}) : connection.manager.find(Video)
    })
  }

  getCurrentVideo(id: any, queryParams: any): Promise<User> {
    const includeValue: string = queryParams ? queryParams['include'] : '';
    const includeList: Array<string> = includeValue ? includeValue.split(',').map(el => el.replace(/\s+/g, '')) : [];
    if (includeList.length !== 0) {
      const relationsArr = this.allIncludeValues.filter(el => includeList.indexOf(el) >= 0);
      return this.conManager.connection.then((connection) => {
        return connection.manager.getRepository(Video).findOne(id, {relations: relationsArr});
      });
    }
    return this.conManager.connection.then((connection) => {
      return connection.manager.find(Video, {id: id});
    })
  }

}
