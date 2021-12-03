# QNRTCWeb v4.0.3

## 简介
QNRTCWeb 是七牛云推出的一款适用于 Web 平台的实时音视频 SDK，提供了包括音视频通话、静音、发布、订阅多种功能，提供灵活的接口，支持高度定制以及二次开发。

## 修复问题
- 修复页面切入后台单路转推中断的问题
- 修复获取远端用户发布 tracks 数据异常的问题
- 修复偶现蓝牙耳机导致无声音问题
- 修复特定设备 sdp 数据异常问题

## 优化
- 优化了部分手机浏览器的兼容性
- track ended 时自动取消发布
- 仅在播放 CameraTrack 时默认开启镜像模式

## 问题反馈
当你遇到任何问题时，可以通过在 GitHub 的 repo 提交 `issues` 来反馈问题，请尽可能的描述清楚遇到的问题，如果有错误信息也一同附带，并且在 ```Labels``` 中指明类型为 bug 或者其他。

[通过这里查看已有的 issues 和提交 bug](https://github.com/pili-engineering/QNRTC-Web/issues)