# QNRTCWeb v2.3.1

## 简介
QNRTCWeb 是七牛云推出的一款适用于 Web 平台的实时音视频 SDK，提供了包括音视频通话、静音、发布、订阅多种功能，提供灵活的接口，支持高度定制以及二次开发。

## 缺陷修复
- 修复指定 `transportPolicy` 为 `forceTcp` 时 Firefox 发布失败的问题

## 功能
- Chrome 支持视频大小流
- `stretchMode` 支持到 Track 级别
- 合流中支持设置水印和背景图片

## 注意

为支持大小流数据显示， `Track` 对象的 `getStats()` 方法返回数据格式从 `TrackStatsReport` 对象变为列表格式 `TrackStatsReport[]`，需要注意此接口的修改适配。

## 问题反馈

当你遇到任何问题时，可以通过在 GitHub 的 repo 提交 `issues` 来反馈问题，请尽可能的描述清楚遇到的问题，如果有错误信息也一同附带，并且在 ```Labels``` 中指明类型为 bug 或者其他。

[通过这里查看已有的 issues 和提交 bug](https://github.com/pili-engineering/QNRTC-Web/issues)