import { Video } from '../video';

export interface CurrentVideoState {
  video: Video;
  loading: boolean;
  saving: boolean;
  error: any
}
