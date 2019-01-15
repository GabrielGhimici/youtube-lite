import { Element } from '../../../../core/generic-components/element';
import './video-player.styles.scss';
export class VideoPlayerElement extends Element{
  constructor() {
    super()
  }
  onInit(): void {
    super.onInit();
  }
  render(): void {
    const video = document.createElement('video');
    video.controls = true;
    video.src = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    video.poster = 'https://i.vimeocdn.com/video/749825438.webp?mw=900&mh=507';
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
