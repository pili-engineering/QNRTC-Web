import { RecordConfig } from "pili-rtc-web";
export * from './qiniu';
export * from './error';

export const RECORD_KEYS = {
  "low": "低清：352x288 15fps",
  "middle1": "标清1：640x480 15fps",
  "middle2": "标清2：960x544 15fps",
  "high": "高清：1280x720 20fps",
};

export const RecordOptions: { [key: string]: RecordConfig } = {
  [RECORD_KEYS.high]: {
    audio: {
      enabled: true,
    },
    video: {
      enabled: true,
      bitrate: 1000,
      width: 1280,
      frameRate: 20,
      height: 720,
    },
  },
  [RECORD_KEYS.middle2]: {
    audio: {
      enabled: true,
    },
    video: {
      enabled: true,
      bitrate: 700,
      width: 960,
      height: 544,
      frameRate: 15,
    },
  },
  [RECORD_KEYS.middle1]: {
    audio: {
      enabled: true,
    },
    video: {
      enabled: true,
      bitrate: 400,
      width: 640,
      height: 480,
      frameRate: 15,
    },
  },
  [RECORD_KEYS.low]: {
    audio: {
      enabled: true,
    },
    video: {
      enabled: true,
      bitrate: 300,
      width: 352,
      height: 288,
      frameRate: 15,
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
