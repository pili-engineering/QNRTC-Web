# QNRTCWeb v2.1.0

## 简介
QNRTCWeb 是七牛云推出的一款适用于 Web 平台的实时音视频 SDK，提供了包括音视频通话、静音、发布、订阅多种功能，提供灵活的接口，支持高度定制以及二次开发。

## 缺陷修复
- 修复 Safari12 和 Chrome71 以上可能出现的音频数据回调失效
- 修复弱网时可能会出现的重连失败
- 修复流状态回调在重连后没有立刻恢复的问题

## 优化
- 现在可以在加入房间的中途安全离开房间
- 优化多路采集时的耗时

## 新功能
- 截帧功能
- 自定义用户数据字段
- 自定义 Track

关于新功能的细节，可以参考文档站中的 [ReleaseNote](https://doc.qnsdk.com/rtn/web/blog/2019/01/25/v2.1.0-release)

## 问题反馈

当你遇到任何问题时，可以通过在 GitHub 的 repo 提交 `issues` 来反馈问题，请尽可能的描述清楚遇到的问题，如果有错误信息也一同附带，并且在 ```Labels``` 中指明类型为 bug 或者其他。

[通过这里查看已有的 issues 和提交 bug](https://github.com/pili-engineering/QNRTC-Web/issues)

