# QNRTCWeb v1.2.1

## 简介
QNRTCWeb 是七牛云推出的一款适用于 Web 平台的实时音视频 SDK，提供了包括音视频通话、静音、发布、订阅多种功能，提供灵活的接口，支持高度定制以及二次开发。

## 功能

### 增加 republish 事件

```javasc
// 当发布者本身因为网络问题断线重连后重新发布成功时触发
// 一般用来更新发布者自己的合流配置（重新发布后需要重新调用一次合流 api）
myRTC.on("republish", () => {
    myRTC.setMergeStreamLayout(...)
})
```

## 缺陷

### 修复 Chrome 69 无法连麦的问题

## 问题反馈

当你遇到任何问题时，可以通过在 GitHub 的 repo 提交 `issues` 来反馈问题，请尽可能的描述清楚遇到的问题，如果有错误信息也一同附带，并且在 ```Labels``` 中指明类型为 bug 或者其他。

[通过这里查看已有的 issues 和提交 bug](https://github.com/pili-engineering/QNRTC-Web/issues)

