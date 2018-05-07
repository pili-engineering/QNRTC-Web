import { RecordConfig } from "pili-rtc-web";
export * from './qiniu';
export * from './error';

export const RecordOptions: { [key: string]: RecordConfig } = {
  "1280*720": {
    audio: {
      enabled: true,
    },
    video: {
      enabled: true,
      bitrate: 1200,
      width: 1280,
      frameRate: 20,
      height: 720,
    },
  },
  "960*540": {
    audio: {
      enabled: true,
    },
    video: {
      enabled: true,
      bitrate: 800,
      width: 960,
      frameRate: 20,
      height: 540,
    },
  },
  "640*480": {
    audio: {
      enabled: true,
    },
    video: {
      enabled: true,
      bitrate: 600,
      width: 640,
      height: 480,
      frameRate: 20,
    },
  },
  "audio-only": {
    audio: {
      enabled: true,
    },
    video: {
      enabled: false,
    },
  },
};
