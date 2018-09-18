import { RecordConfig } from "pili-rtc-web";
export * from './qiniu';
export * from './error';

export const RecordOptions: { [key: string]: RecordConfig } = {
  "1280*720 1200kbps 20fps": {
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
  "640*480 600kbps 20fps": {
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
  "音乐文件输入": {
    audio: {
      enabled: true,
      buffer: true,
    },
  },
  "屏幕共享(需要麦克风)": {
    audio: {
      enabled: true,
    },
    screen: {
      enabled: true,
      source: "screen",
      width: 1920,
      height: 1080,
    },
  },
  "窗口共享(需要麦克风)": {
    audio: {
      enabled: true,
    },
    screen: {
      enabled: true,
      source: "window",
      width: 1920,
      height: 1080,
    },
  },
  "audio-only": {
    audio: {
      enabled: true,
    },
    video: {
      enabled: false,
      height: 720,
      width: 1280,
    },
  },
};
