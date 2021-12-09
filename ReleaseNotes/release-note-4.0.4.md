# QNRTCWeb v4.0.4

## 简介
QNRTCWeb 是七牛云推出的一款适用于 Web 平台的实时音视频 SDK，提供了包括音视频通话、静音、发布、订阅多种功能，提供灵活的接口，支持高度定制以及二次开发。

## 修复问题
- 修复 user-publish 事件 userID 异常的问题
- 修复 QNVideoConfig 类型不准确的问题
- 修复特定设备 sdp 数据异常问题
- 修复远端 track mute 后本地状态未更新的的问题

## 优化
- 信令新增备用域名
- 新增检测音频轨道是否活跃事件
- track 对象添加获取原生 mediaStreamTrack 的方法

## 问题反馈
当你遇到任何问题时，可以通过在 GitHub 的 repo 提交 `issues` 来反馈问题，请尽可能的描述清楚遇到的问题，如果有错误信息也一同附带，并且在 ```Labels``` 中指明类型为 bug 或者其他。

[通过这里查看已有的 issues 和提交 bug](https://github.com/pili-engineering/QNRTC-Web/issues)