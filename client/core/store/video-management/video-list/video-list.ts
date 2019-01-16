import { Video } from '../video';

export interface VideoListState {
  items: Array<Video>;
  loading: boolean;
  searchParam: string;
  error: any
}
