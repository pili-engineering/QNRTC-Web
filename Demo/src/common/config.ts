export const ROOM_STATE_TEXT = [ "未连接", "正在连接中", "已连接", "正在重连" ];

interface RecordConfig {
  video?: {
      frameRate?: number;
      height?: number;
      width?: number;
      bitrate?: number;
      facingMode?: "";
  };
}

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
        width: 1280,
        height: 720,
        frameRate: 20,
        bitrate: 1000,
      },
    },
  },
]
