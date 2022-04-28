# QNRTC-API-Examples

七牛实时音视频 API Examples 用于演示如何通过 QNRTC SDK 来实现不同的场景需求。

## 场景列表

- 摄像头采集音视频通话
- canvas 采集纯视频通话
- audio buffer 采集纯音频通话
- 屏幕录制采集音视频通话
- 麦克风采集纯音频通话
- 自定义采集纯音频通话
- CDN 单人转推 
- CDN 合流转推（默认合流任务）
- CDN 合流转推（自定义合流任务）
- 音频文件混音
- 发送房间消息
- 大小流
- 通话质量统计
- 音视频静音
- 切换媒体设备

## 项目运行

```
cd API-Examples-Web
npx http-server .
```

然后访问 `http://localhost:8080/` 即可。


> 该项目仅用于演示不同场景下的接口调用情况，不包含 token 生成等业务服务相关的逻辑实现。因此，为保证项目正常运行，需要您在如下位置自行填入音视频通话的房间 [token](https://developer.qiniu.com/rtc/9909/the-rtc-basic-concept#4)，若您还没有生成 token 的相关服务，可参考[如何通过控制台获取 token](https://developer.qiniu.com/rtc/9858/applist#4) 来获取临时 token。

```javascript
const ROOM_TOKEN = "自定义房间 token"
const client = QNRTC.createClient()
client.join(ROOM_TOKEN)
```

> 若您有 CDN 转推的相关需求，同样需要在如下位置自行填入待转推的推流地址才可正常运行，推流地址的获取方式可参考[直播云快速入门文档](https://developer.qiniu.com/pili/1221/the-console-quick-start)：

```javascript
const PUBLISH_URL = "自定义推流地址"
const client = QNRTC.createClient()
await client.startDirectLiveStreaming({
    ...config,
    url: PUBLISH_URL
});
```