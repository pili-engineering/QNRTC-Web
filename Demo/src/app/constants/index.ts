export * from './qiniu';
export * from './error';

export const RecordOptions = {
  "1080p": {
    audio: true,
    video: {
      width: 1920,
      height: 1080,
    },
  },
  "720p": {
    audio: true,
    video: {
      width: 1280,
      height: 720,
    },
  },
  "480p": {
    audio: true,
    video: {
      width: 640,
      height: 480,
      frameRate: 15,
    },
  },
};
