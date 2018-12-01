import { Service } from '@tsed/common';
import { ConnectionManager } from '../../connection-manager';
import { Metadata } from '../model/metadata.model';

@Service()
export class MetadataService {
  private readonly allIncludedItems = ['video'];
  constructor(
    private conManager: ConnectionManager
  ) {}

  getAllMetadataElements(queryParams: any): Promise<Array<Metadata>> {
    const includeValue: string = queryParams ? queryParams['include'] : '';
    const includeList: Array<string> = includeValue ? includeValue.split(',').map(el => el.replace(/\s+/g, '')) : [];
    if (includeList.length !== 0) {
      const relationsArr = this.allIncludedItems.filter(el => includeList.indexOf(el) >= 0);
      return this.conManager.connection.then((connection) => {
        return connection.getRepository(Metadata).find({relations: relationsArr});
      })
    }
    return this.conManager.connection.then((connection) => {
      return connection.manager.find(Metadata)
    })
  }

}
