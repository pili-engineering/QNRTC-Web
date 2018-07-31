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
  "PCM-audio": {
    audio: {
      enabled: true,
      buffer: true,
    },
  },
  "screen-share": {
    audio: {
      enabled: true,
    },
    screen: {
      enabled: true,
      source: "screen",
      width: 1280,
      height: 720,
    },
  },
  "window-share": {
    audio: {
      enabled: true,
    },
    screen: {
      enabled: true,
      source: "window",
      width: 640,
      height: 480,
    },
  },
  "audio-only": {
    audio: {
      enabled: true,
    },
  },
};
