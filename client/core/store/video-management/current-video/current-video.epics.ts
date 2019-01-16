import { combineEpics, ofType } from 'redux-observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PayloadAction } from '../../payload-action';
import { from, of } from 'rxjs';
import http from '../../../http';
import { Video } from '../video';
import { User } from '../../user-management/user/user';
import { Metadata } from '../metadata';
import { Comment } from '../comment';
import { CurrentVideoActions, CurrentVideoActionTypes } from './current-video.actions';

export class CurrentVideoEpics {
  public createEpic() {
    return combineEpics(
      this.loadVideo()
    )
  }
  private loadVideo() {
    return action$ => action$.pipe(
      ofType(CurrentVideoActionTypes.LoadStart),
      switchMap((action: PayloadAction) => {
        return from(http.get(`/api/videos/${action.payload.id}`, {params: {include: 'owner,metadata,comments,comments.owner'}})).pipe(
          switchMap((req: any) => {
            return of(req.data);
          }),
          map((element: any) => {
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
            element.comments.forEach(comment => {
              const officialComment = new Comment();
              officialComment.id = comment.id;
              officialComment.ownerId = comment.ownerId;
              const commentOwner = new User();
              commentOwner.id = comment.owner.id;
              commentOwner.firstName = comment.owner.firstName;
              commentOwner.lastName = comment.owner.lastName;
              commentOwner.email = comment.owner.email;
              commentOwner.gender = comment.owner.gender;
              commentOwner.birthDate = comment.owner.birthDate;
              officialComment.owner = commentOwner;
              officialComment.content = comment.content;
              officialComment.creationDate = comment.creationDate;
              video.addComment(officialComment);
            });
            return  CurrentVideoActions.loadSucceeded(video);
          }),
          catchError(err => of(CurrentVideoActions.loadFailed(err)))
        )
      })
    )
  }
}
