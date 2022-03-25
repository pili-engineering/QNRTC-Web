import React, { useEffect, useState } from "react";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import {
  QNLiveStreamingState,
  QNTranscodingLiveStreamingTrack,
  QNTranscodingLiveStreamingConfig,
  QNRenderMode,
  QNDirectLiveStreamingConfig,
  QNTranscodingLiveStreamingImage,
} from "qnweb-rtc";
import {
  Drawer,
  TextField,
  Grid,
  MenuItem,
  Button,
  FormControlLabel,
  Switch,
  Divider,
} from "@material-ui/core";
import { RoomStore } from "../../stores/roomStore";
import { MessageStore } from "../../stores/messageStore";

const styles = (theme: Theme) =>
  createStyles({
    mergeWrap: {
      position: "fixed",
      top: "20px",
      right: "15px",
      textAlign: "center",
    },
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
    textField: {
      width: "100%",
    },
    rightXs: {
      marginRight: "15px",
    },
    topLs: {
      marginTop: "20px",
    },
    leftLs: {
      marginLeft: "20px",
    },
    buttonRed: {
      background: "red",
    },
    drawerWrap: {
      maxHeight: "50vh",
      overflowY: "scroll",
      overflowX: "hidden",
    },
  });

interface MergeConfigProp extends WithStyles<typeof styles> {
  roomStore: RoomStore;
  messageStore: MessageStore;
}

interface TranscodingLiveStreamingTrack
  extends QNTranscodingLiveStreamingTrack {
  kind: string;
  // 更新标记
  refreshFlag?: boolean;
  // 是否已经添加合流布局
  isAdd?: boolean;
}

const MergeConfig = (props: MergeConfigProp) => {
  // 渲染模式列表
  const stretchModeList = [
    QNRenderMode.ASPECT_FILL,
    QNRenderMode.ASPECT_FIT,
    QNRenderMode.FILL,
  ];
  const { classes, roomStore, messageStore } = props;
  // 单路转推状态
  const [directLiveStatus, setDirectLiveStatus] = useState(false);
  // 合流弹窗
  const [transcodingLiveModel, setTranscodingLiveModel] = useState(false);
  // 合流参数
  const [transcodingConfig, setTranscodingConfig] = useState<
    QNTranscodingLiveStreamingConfig
  >({
    url: `rtmp://pili-publish.qnsdk.com/sdk-live/${roomStore.id}`,
    streamID: `demo${roomStore.id}`,
    renderMode: QNRenderMode.ASPECT_FILL,
    watermarks: [
      {
        url: "http://pili-playback.qnsdk.com/ivs_background_1280x720.png",
        height: 100,
        width: 100,
        x: 0,
        y: 0,
      },
    ],
    background: {
      url: "http://pili-playback.qnsdk.com/ivs_background_1280x720.png",
      height: 480,
      width: 640,
      x: 0,
      y: 0,
    },
    bitrate: 1000,
    videoFrameRate: 25,
    maxBitrate: 1000,
    minBitrate: 1000,
    holdLastFrame: false,
    width: 640,
    height: 480,
  });
  // 合流布局
  const [transcodingTracks, setTranscodingTracks] = useState<
    (TranscodingLiveStreamingTrack)[]
  >([]);
  // 合流状态 - 0未创建 1已创建 2编辑中
  const [jobStatus, setJobStatus] = useState(0);

  // 开启单路转推
  const startDirectLiveStreaming = () => {
    if (roomStore.session && roomStore.session.userID !== "admin") {
      messageStore.hideLoading();
      messageStore.showAlert({
        show: true,
        title: "没有权限",
        content: '只有"admin"用户可以开启单路转推！！！',
      });
      return false;
    }
    const config: QNDirectLiveStreamingConfig = {
      videoTrack: roomStore.publishedCameraTracks[0].rtcTrack,
      audioTrack: roomStore.publishedAudioTracks[0].rtcTrack,
      streamID: `demo${roomStore.id}`,
      url: `rtmp://pili-publish.qnsdk.com/sdk-live/${roomStore.id}`,
    };
    roomStore.session.startDirectLiveStreaming(config);
  };
  // 关闭单路转推
  const stopDirectLiveStreaming = () => {
    roomStore.session.stopDirectLiveStreaming(`demo${roomStore.id}`);
  };
  // 开始合流
  const startTranscodingLiveStreaming = () => {
    roomStore.session.startTranscodingLiveStreaming({
      ...transcodingConfig,
    });
  };
  // 关闭合流
  const stopTranscodingLiveStreaming = () => {
    roomStore.session.stopTranscodingLiveStreaming(transcodingConfig.streamID);
    // 重制布局
    transcodingTracks.forEach((item) => (item.isAdd = false));
  };
  // 更新合流布局
  const setTranscodingLiveStreamingTracks = (index: number) => {
    const { isAdd, refreshFlag, ...rest } = transcodingTracks[index];
    roomStore.session.setTranscodingLiveStreamingTracks(
      transcodingConfig.streamID,
      [rest]
    );
    const result = [...transcodingTracks];
    result[index].isAdd = true;
    setTranscodingTracks(result);
  };
  // 移除合流布局
  const removeTranscodingLiveStreamingTracks = (index: number) => {
    const { isAdd, refreshFlag, ...rest } = transcodingTracks[index];
    roomStore.session.removeTranscodingLiveStreamingTracks(
      transcodingConfig.streamID,
      [rest]
    );
    transcodingTracks[index].isAdd = false;
  };
  // 同步发布轨
  useEffect(
    () => {
      const tracks = [
        ...[...roomStore.publishedTracks.values()].map((item) => item.rtcTrack),
        ...roomStore.remoteTracks.values(),
      ];
      let map = {} as Record<string, TranscodingLiveStreamingTrack>;
      for (let i of transcodingTracks) {
        map[i.trackID] = {
          ...i,
          refreshFlag: false,
        };
      }
      for (let i of tracks) {
        if (map[i.trackID!]) {
          map[i.trackID!].refreshFlag = true;
        } else {
          map[i.trackID!] = {
            trackID: i.trackID!,
            x: 0,
            y: 0,
            width: 480,
            height: 360,
            zOrder: 0,
            renderMode: QNRenderMode.ASPECT_FILL,
            kind: i.isVideo() ? "video" : "audio",
            refreshFlag: true,
            isAdd: false,
          };
        }
      }
      for (let key in map) {
        if (map[key].refreshFlag === false) {
          delete map[key];
        }
      }
      setTranscodingTracks(Object.values(map));
    },
    [
      Array.from(roomStore.publishedTracks.values()).length,
      Array.from(roomStore.remoteTracks.values()).length,
    ]
  );
  // 声明周期
  useEffect(() => {
    // 合流状态改变
    roomStore.session.on(
      "transcoding-livestreaming-state-changed",
      (jobId: string, state: QNLiveStreamingState) => {
        if (state === QNLiveStreamingState.STARTED) {
          setJobStatus(1);
        }
        if (state === QNLiveStreamingState.STOPPED) {
          setJobStatus(0);
        }
      }
    );
    // 单路转推状态改变
    roomStore.session.on(
      "direct-livestreaming-state-changed",
      (jobId: string, state: QNLiveStreamingState) => {
        if (state === QNLiveStreamingState.STARTED) {
          setDirectLiveStatus(true);
        }
        if (state === QNLiveStreamingState.STOPPED) {
          setDirectLiveStatus(false);
        }
      }
    );
  });
  // 处理合流布局配置变更
  const handleSetTranscodingTracks = <
    T extends TranscodingLiveStreamingTrack,
    K extends keyof TranscodingLiveStreamingTrack
  >(
    key: K,
    index: number,
    value: T[K]
  ) => {
    const result = [...transcodingTracks];
    result[index][key] = value;
    setTranscodingTracks(result);
  };
  // 处理合流背景配置变更
  const handleSetBackground = <
    T extends QNTranscodingLiveStreamingImage,
    K extends keyof QNTranscodingLiveStreamingImage
  >(
    key: K,
    value: T[K]
  ) => {
    const result = { ...transcodingConfig };
    result.background![key] = value;
    setTranscodingConfig(result);
  };
  // 处理水印配置变更
  const handleSetWatermarks = <
    T extends QNTranscodingLiveStreamingImage,
    K extends keyof QNTranscodingLiveStreamingImage
  >(
    key: K,
    value: T[K]
  ) => {
    const result = { ...transcodingConfig };
    result.watermarks![0]![key] = value;
    setTranscodingConfig(result);
  };
  // 打开合流配置弹框
  const handleSetMergeConfig = () => {
    if (roomStore.session && roomStore.session.userID !== "admin") {
      messageStore.hideLoading();
      messageStore.showAlert({
        show: true,
        title: "没有权限",
        content: '只有"admin"用户可以开启单路转推！！！',
      });
      return false;
    }
    setTranscodingLiveModel(true);
  };
  return (
    <div className={classes.mergeWrap}>
      {directLiveStatus ? (
        <div onClick={stopDirectLiveStreaming}>
          <img src={require("../../assets/cdn.png")} alt="" />
          <p>停止转推</p>
        </div>
      ) : (
        <div onClick={startDirectLiveStreaming}>
          <img src={require("../../assets/cdn.png")} alt="" />
          <p>开启转推</p>
        </div>
      )}
      <div onClick={handleSetMergeConfig}>
        <img src={require("../../assets/stream.png")} alt="" />
        <p>合流设置</p>
      </div>
      <Drawer
        anchor="bottom"
        open={transcodingLiveModel}
        onClose={() => setTranscodingLiveModel(false)}
      >
        {jobStatus !== 1 && (
          <Grid
            container
            className={classes.drawerWrap}
            alignItems="center"
            style={{ padding: 20 }}
            spacing={24}
          >
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="合流ID"
                fullWidth
                value={transcodingConfig.streamID}
                onChange={(event) =>
                  setTranscodingConfig({
                    ...transcodingConfig,
                    streamID: event.target.value,
                  })
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="最大码率"
                fullWidth
                value={transcodingConfig.maxBitrate}
                onChange={(event) =>
                  setTranscodingConfig({
                    ...transcodingConfig,
                    maxBitrate: ~~event.target.value,
                  })
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="最低码率"
                fullWidth
                value={transcodingConfig.minBitrate}
                onChange={(event) =>
                  setTranscodingConfig({
                    ...transcodingConfig,
                    minBitrate: ~~event.target.value,
                  })
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="码率"
                fullWidth
                value={transcodingConfig.bitrate}
                onChange={(event) =>
                  setTranscodingConfig({
                    ...transcodingConfig,
                    bitrate: ~~event.target.value,
                  })
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="帧率"
                fullWidth
                value={transcodingConfig.videoFrameRate}
                onChange={(event) =>
                  setTranscodingConfig({
                    ...transcodingConfig,
                    videoFrameRate: ~~event.target.value,
                  })
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="宽度"
                fullWidth
                value={transcodingConfig.width}
                onChange={(event) =>
                  setTranscodingConfig({
                    ...transcodingConfig,
                    width: ~~event.target.value,
                  })
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="高度"
                fullWidth
                value={transcodingConfig.height}
                onChange={(event) =>
                  setTranscodingConfig({
                    ...transcodingConfig,
                    height: ~~event.target.value,
                  })
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                label="渲染模式"
                className={classes.textField}
                variant="outlined"
                value={transcodingConfig.renderMode}
                onChange={(event) =>
                  setTranscodingConfig({
                    ...transcodingConfig,
                    renderMode:
                      (event.target.value as QNRenderMode) ||
                      QNRenderMode.ASPECT_FILL,
                  })
                }
              >
                {stretchModeList.map((option: string) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={transcodingConfig.holdLastFrame}
                    onChange={(event) =>
                      setTranscodingConfig({
                        ...transcodingConfig,
                        holdLastFrame: event.target.checked,
                      })
                    }
                    value={transcodingConfig.holdLastFrame}
                  />
                }
                label="保持最后帧"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="背景地址"
                fullWidth
                value={transcodingConfig.background!.url}
                variant="outlined"
                onChange={(event) =>
                  handleSetBackground("url", event.target.value)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="背景高度"
                fullWidth
                value={transcodingConfig.background!.height}
                variant="outlined"
                onChange={(event) =>
                  handleSetBackground("height", ~~event.target.value)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="背景宽度"
                fullWidth
                value={transcodingConfig.background!.width}
                variant="outlined"
                onChange={(event) =>
                  handleSetBackground("width", ~~event.target.value)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="背景x轴距离"
                fullWidth
                value={transcodingConfig.background!.x}
                variant="outlined"
                onChange={(event) =>
                  handleSetBackground("x", ~~event.target.value)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="背景y轴距离"
                fullWidth
                value={transcodingConfig.background!.y}
                variant="outlined"
                onChange={(event) =>
                  handleSetBackground("y", ~~event.target.value)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="水印地址"
                fullWidth
                value={transcodingConfig.watermarks![0].url}
                variant="outlined"
                onChange={(event) =>
                  handleSetWatermarks("url", event.target.value)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="水印高度"
                fullWidth
                value={transcodingConfig.watermarks![0].height}
                variant="outlined"
                onChange={(event) =>
                  handleSetWatermarks("height", ~~event.target.value)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="水印宽度"
                fullWidth
                value={transcodingConfig.watermarks![0].width}
                variant="outlined"
                onChange={(event) =>
                  handleSetWatermarks("width", ~~event.target.value)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="水印x轴距离"
                fullWidth
                value={transcodingConfig.watermarks![0].x}
                variant="outlined"
                onChange={(event) =>
                  handleSetWatermarks("x", ~~event.target.value)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="水印y轴距离"
                fullWidth
                value={transcodingConfig.watermarks![0].y}
                variant="outlined"
                onChange={(event) =>
                  handleSetWatermarks("y", ~~event.target.value)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={startTranscodingLiveStreaming}
              >
                开启合流
              </Button>
            </Grid>
          </Grid>
        )}
        {jobStatus === 1 && (
          <div className={classes.drawerWrap}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                className={`${classes.buttonRed} ${classes.leftLs} ${
                  classes.topLs
                }`}
                color="primary"
                onClick={stopTranscodingLiveStreaming}
              >
                关闭合流
              </Button>
            </Grid>
            {transcodingTracks.map((item, index) => (
              <div key={item.trackID}>
                <Grid
                  container
                  alignItems="center"
                  style={{ padding: 20 }}
                  spacing={24}
                >
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="TrackID"
                      fullWidth
                      value={item.trackID}
                      disabled
                      variant="outlined"
                    />
                  </Grid>
                  {item.kind === "video" && (
                    <>
                      <Grid item xs={6}>
                        <TextField
                          id="outlined-basic"
                          label="x轴坐标"
                          fullWidth
                          value={item.x}
                          onChange={(event) =>
                            handleSetTranscodingTracks(
                              "x",
                              index,
                              ~~event.target.value
                            )
                          }
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="outlined-basic"
                          label="y轴坐标"
                          fullWidth
                          value={item.y}
                          onChange={(event) =>
                            handleSetTranscodingTracks(
                              "y",
                              index,
                              ~~event.target.value
                            )
                          }
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="outlined-basic"
                          label="层级"
                          fullWidth
                          value={item.zOrder}
                          onChange={(event) =>
                            handleSetTranscodingTracks(
                              "zOrder",
                              index,
                              ~~event.target.value
                            )
                          }
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="outlined-basic"
                          label="宽"
                          fullWidth
                          value={item.width}
                          onChange={(event) =>
                            handleSetTranscodingTracks(
                              "width",
                              index,
                              ~~event.target.value
                            )
                          }
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="outlined-basic"
                          label="高"
                          fullWidth
                          value={item.height}
                          onChange={(event) =>
                            handleSetTranscodingTracks(
                              "height",
                              index,
                              ~~event.target.value
                            )
                          }
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          select
                          label="渲染模式"
                          className={classes.textField}
                          variant="outlined"
                          value={item.renderMode}
                          onChange={(event) =>
                            handleSetTranscodingTracks(
                              "renderMode",
                              index,
                              (event.target.value as QNRenderMode) ||
                                QNRenderMode.ASPECT_FILL
                            )
                          }
                        >
                          {stretchModeList.map((option: string) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                    </>
                  )}
                  <Grid item xs={6}>
                    {!item.isAdd && (
                      <Button
                        variant="contained"
                        className={`${classes.rightXs}`}
                        color="primary"
                        onClick={() => setTranscodingLiveStreamingTracks(index)}
                      >
                        加入合流
                      </Button>
                    )}
                    {item.isAdd && (
                      <Button
                        variant="contained"
                        className={`${classes.buttonRed}`}
                        color="secondary"
                        onClick={() =>
                          removeTranscodingLiveStreamingTracks(index)
                        }
                      >
                        移除合流
                      </Button>
                    )}
                  </Grid>
                </Grid>
                <Divider variant="middle" />
              </div>
            ))}
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default withStyles(styles)(MergeConfig);
