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
  "1280*640/exact": {
    audio: {
      enabled: true,
    },
    video: {
      enabled: true,
      bitrate: 1200,
      width: { exact: 1280 },
      height: { exact: 640 },
    },
  },
  "640*480 ~ 1280*720": {
    audio: {
      enabled: true,
    },
    video: {
      enabled: true,
      width: { min: 640, max: 1280, ideal: 1000 },
      height: { min: 480, max: 720, ideal: 600 },
    },
  },
  "640*480 ~ 1280*720/window-sharing": {
    audio: {
      enabled: true,
    },
    screen: {
      enabled: true,
      source: "window",
      width: { min: 640, max: 1280, ideal: 1000 },
      height: { min: 480, max: 720, ideal: 600 },
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
      width: 1920,
      height: 1080,
    },
  },
  "window-share": {
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
