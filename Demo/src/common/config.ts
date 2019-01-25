import { RecordConfig } from 'pili-rtc-web';

export const ROOM_STATE_TEXT = [ "未连接", "正在连接中", "已连接", "正在重连" ];

export interface publishRecordConfigs {
  camera: RecordConfig;
  audio: RecordConfig;
  buffer_audio: RecordConfig;
  screen_share: RecordConfig;
  window_share: RecordConfig;
}

export interface publishVideoConfigs {
  ['288p']: RecordConfig;
  ['480p']: RecordConfig;
  ['540p']: RecordConfig;
  ['720p']: RecordConfig;
}
export interface PublishRecordOption<T> {
  key: T;
  label: string;
  config: RecordConfig;
  selected?: boolean;
}


export const videoConfig: PublishRecordOption<keyof publishVideoConfigs>[] = [
  {
    key: '288p',
    label: '342x288 , 15fps , 300kbps',
    selected: true,
    config:
    {
      video: {
        enabled: true,
        width: 352,
        height: 288,
        frameRate: 15,
        bitrate: 300,
      },
    },
  },

  {
    key: '480p',
    label: '640x480 , 15fps , 400kbps',
    selected: true,
    config:
    {
      video: {
        enabled: true,
        width: 640,
        height: 480,
        frameRate: 15,
        bitrate: 400,
      },
    },
  },
  {
    key: '540p',
    label: '960x544 , 15fps , 700kbps',
    selected: true,
    config:{
      video:  {
        enabled: true,
        width: 960,
        height: 544,
        frameRate: 15,
        bitrate: 700,
      },
    },
  },
  {
    key: '720p',
    label: '1280x720 , 20fps , 1000kbps',
    config:
    {
      video: {
        enabled: true,
        width: 1280,
        height: 720,
        frameRate: 20,
        bitrate: 1000,
      },
    },
  },
]

// Array
//   0 -> 摄像头
//   1 -> 音频（麦克风）
//   2 -> 音频（外部数据导入）
//   3 -> 屏幕共享
//   4 -> 窗口共享
export const PublishRecordOptions: PublishRecordOption<keyof publishRecordConfigs>[] =
[
  {
    key: 'camera',
    label: '摄像头',
    selected: true,
    config:
    {
      video: {
        enabled: true,
        tag: "camera",
        ...videoConfig[0].config.video,
      },
    },
  },
  {
    key: 'audio',
    label: '音频（麦克风）',
    selected: true,
    config: {
      audio: { enabled: true, tag: "audio" },
    },
  },
  {
    key: 'buffer_audio',
    label: '音频（外部数据导入）',
    config: {
      audio: { enabled: true, tag: "audio", buffer: true },
    },
  },
  {
    key: 'screen_share',
    label: '屏幕共享',
    config: {
      screen: { enabled: true, tag: "screen", source: "screen" },
    },
  },
  {
    key: 'window_share',
    label: '窗口共享',
    config: {
      screen: { enabled: true, tag: "screen", source: "window" },
    },
  },
];

export const selectkeys = PublishRecordOptions.map(v => v.key) as Array<keyof publishRecordConfigs>;
