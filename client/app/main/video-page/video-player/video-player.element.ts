import { Element } from '../../../../core/generic-components/element';
import './video-player.styles.scss';
import { Video } from '../../../../core/store/video-management/video';
export class VideoPlayerElement extends Element{
  constructor(private data: Video =  new Video()) {
    super()
  }
  onInit(): void {
    super.onInit();
  }
  render(): void {
    this.componentHtml.remove();
    this.componentHtml = document.createElement('div');
    const video = document.createElement('video');
    video.controls = true;
    video.src = this.data.url;
    video.poster = this.data.thumbnailUrl;
    video.setAttribute('type', 'video/mp4');
    this.componentHtml.appendChild(video);
    this.componentHtml.className = 'video-player-container';
    super.render('videoRenderPlaceholder');
  }
  destroy(): void {
    super.destroy();
    if (this.parent && this.parent.componentHtml && this.componentHtml) {
      this.parent.componentHtml.removeChild(this.componentHtml);
    }
  }
}
