import { combineEpics, ofType } from 'redux-observable';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import http from '../../../http';
import { User } from '../../user-management/user/user';
import { VideoListActions, VideoListActionTypes } from './video-list.actions';
import { PayloadAction } from '../../payload-action';
import { ListType } from '../video-management.reducer';
import { Video } from '../video';
import { Metadata } from '../metadata';

export class VideoListEpics {
  public createEpic(type: string) {
    return combineEpics(
      this.videoListEpic(type)
    )
  }

  private videoListEpic(type: string) {
    return action$ => action$.pipe(
      ofType(VideoListActionTypes.LoadStart),
      filter(({meta}) => meta !== null && meta !== undefined && meta === type),
      switchMap((action: PayloadAction) => {
        switch(action.meta) {
          case ListType.Main: {
            return from(http.get('/api/videos', {params: {include: 'owner'}})).pipe(
              switchMap((req: any) => {
                return of(req.data);
              }),
              map((result: any) => {
                result = result.map(element => {
                  const video = new Video();
                  video.id = element.id;
                  video.name = element.name;
                  video.url = element.url;
                  video.thumbnailUrl = element.thumbnailUrl;
                  video.ownerId = element.ownerId;
                  const user = new User();
                  user.id = element.owner.id;
                  user.firstName = element.owner.firstName;
                  user.lastName = element.owner.lastName;
                  user.email = element.owner.email;
                  user.gender = element.owner.gender;
                  user.birthDate = element.owner.birthDate;
                  video.owner = user;
                  return video;
                });
                return VideoListActions.loadSucceeded(type, result);
              }),
              catchError(err => of(VideoListActions.loadFailed(type, err)))
            )
          }
          case ListType.Recommended: {
            return from(http.get('/api/videos',{params: {include: 'owner'}})).pipe(
              switchMap((req: any) => {
                return of(req.data);
              }),
              map((result: any) => {
                result = result.map(element => {
                  const video = new Video();
                  video.id = element.id;
                  video.name = element.name;
                  video.url = element.url;
                  video.thumbnailUrl = element.thumbnailUrl;
                  video.ownerId = element.ownerId;
                  const user = new User();
                  user.id = element.owner.id;
                  user.firstName = element.owner.firstName;
                  user.lastName = element.owner.lastName;
                  user.email = element.owner.email;
                  user.gender = element.owner.gender;
                  user.birthDate = element.owner.birthDate;
                  video.owner = user;
                  return video;
                });
                return VideoListActions.loadSucceeded(type, result);
              }),
              catchError(err => of(VideoListActions.loadFailed(type, err)))
            )
          }
          case ListType.Filtered: {
            return from(http.get('/api/videos', {params: {include: 'owner,metadata', q: action.payload.q}})).pipe(
              switchMap((req: any) => {
                return of(req.data);
              }),
              map((result: any) => {
                result = result.map(element => {
                  const video = new Video();
                  video.id = element.id;
                  video.name = element.name;
                  video.url = element.url;
                  video.thumbnailUrl = element.thumbnailUrl;
                  video.ownerId = element.ownerId;
                  const user = new User();
                  user.id = element.owner.id;
                  user.firstName = element.owner.firstName;
                  user.lastName = element.owner.lastName;
                  user.email = element.owner.email;
                  user.gender = element.owner.gender;
                  user.birthDate = element.owner.birthDate;
                  video.owner = user;
                  video.metadataId = element.metadataId;
                  const metadata = new Metadata();
                  metadata.id = element.metadata.id;
                  metadata.description = element.metadata.description;
                  metadata.likes = element.metadata.likes;
                  metadata.dislikes = element.metadata.dislikes;
                  metadata.shares = element.metadata.shares;
                  metadata.uploadDate = element.metadata.uploadDate;
                  video.metadata = metadata;
                  return video;
                });
                return  VideoListActions.loadSucceeded(type, result);
              }),
              catchError(err => of(VideoListActions.loadFailed(type, err)))
            )
          }
          default:
            return of(VideoListActions.loadFailed(type, new Error('Undefined list')));
        }
      })
    )
  }
}
