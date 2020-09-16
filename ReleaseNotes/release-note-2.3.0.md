# QNRTCWeb v2.3.0

## 简介
QNRTCWeb 是七牛云推出的一款适用于 Web 平台的实时音视频 SDK，提供了包括音视频通话、静音、发布、订阅多种功能，提供灵活的接口，支持高度定制以及二次开发。

## 缺陷修复
- 修复 roomtoken 过期时重连的问题
- 修复当远端 Track 异常终止时，订阅码率为 0 的问题
- 修复用户设置 mute 后，新用户加入房间无法感知是否设置过 mute 的问题
- 修改用户刷新后进入房间 auth-res 数据的 muted 值为 undefined 的问题

## 优化
- 补充缺失的 create-merge-job-res 事件回调
- iOS 端 safari 的监测逻辑和 pc 端保持一致
- 适配 safari 12.1
- 优化视频采集逻辑

## 功能
- 支持录制屏幕时捕获声音
- 增加发送文本消息

关于新功能的细节，可以参考文档站中的 [ReleaseNote](https://doc.qnsdk.com/rtn/web/blog/2020/09/14/v2.3.0-release)

## 问题反馈

当你遇到任何问题时，可以通过在 GitHub 的 repo 提交 `issues` 来反馈问题，请尽可能的描述清楚遇到的问题，如果有错误信息也一同附带，并且在 ```Labels``` 中指明类型为 bug 或者其他。

[通过这里查看已有的 issues 和提交 bug](https://github.com/pili-engineering/QNRTC-Web/issues)

