import { Service } from '@tsed/common';
import { ConnectionManager } from '../../connection-manager';
import { Comment } from '../model/comment.model';
import { User } from '../model/user.model';

@Service()
export class CommentService {
  private readonly allIncludedItems = ['owner', 'video'];

  constructor(
    private conManager: ConnectionManager
  ) {}

  getAllComments(queryParams: any): Promise<Array<Comment>> {
    const includeValue: string = queryParams ? queryParams['include'] : '';
    const includeList: Array<string> = includeValue ? includeValue.split(',').map(el => el.replace(/\s+/g, '')) : [];
    if (includeList.length !== 0) {
      const relationsArr = this.allIncludedItems.filter(el => includeList.indexOf(el) >= 0);
      return this.conManager.connection.then((connection) => {
        return connection.getRepository(Comment).find({relations: relationsArr});
      })
    }
    return this.conManager.connection.then((connection) => {
      return connection.manager.find(Comment)
    })
  }

  saveComment(comment: Comment, queryParams: any) {
    return this.conManager.connection.then((connection) => {
      return connection.getRepository(Comment).save(comment).then(data => {
        const includeValue: string = queryParams ? queryParams['include'] : '';
        const includeList: Array<string> = includeValue ? includeValue.split(',').map(el => el.replace(/\s+/g, '')) : [];
        if (includeList.length !== 0) {
          const relationsArr = this.allIncludedItems.filter(el => includeList.indexOf(el) >= 0);
          return this.conManager.connection.then((connection) => {
            return connection.manager.getRepository(Comment).findOne(data.id, {relations: relationsArr});
          });
        }
        return this.conManager.connection.then((connection) => {
          return connection.manager.find(Comment, {id: data.id});
        })
      })
    })
  }

}
