import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
// import FormHelperText from '@material-ui/core/FormHelperText';
import { RoomStore } from '../../stores/roomStore';
import classes from './index.module.css';
import { TrackModeSession, deviceManager } from 'pili-rtc-web';

interface SwitchPanelProp {
  // session?: TrackModeSession
  videoDeviceId?: string
  audioDeviceId?: string
  roomStore: RoomStore
  isMobile: Boolean
}

function SwitchPanel({ videoDeviceId, audioDeviceId, roomStore, isMobile }: SwitchPanelProp) {
  const [currentVideoDeviceId, setCurrentVideoDeviceId] = useState(videoDeviceId || '')
  const [currentAudioDeviceId, setCurrentAudioDeviceId] = useState(audioDeviceId || '')
  // const [videoDevices, setVideoDevices] = useState([])
  // const [audioDevices, setAudioDevices] = useState([])
  const audioDevices = (deviceManager.deviceInfo || []).filter(device => device.kind === "audioinput")
  const videoDevices = (deviceManager.deviceInfo || []).filter(device => device.kind === "videoinput")
  const handleVideoDeviceChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentVideoDeviceId(e.target.value)
    await roomStore.setVideoDeviceId(e.target.value)
    // await roomStore.unpublish()
    // await roomStore.publish(await roomStore.getSelectTracks())
  }
  const handleAudioDeviceChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentAudioDeviceId(e.target.value)
    await roomStore.setAudioDeviceId(e.target.value)
  }
  return (
    <div className={`${isMobile ? classes.switchPanelMobile : classes.switchPanel}`}>
      <FormControl className={[isMobile ? classes.formControlMobile : classes.formControl].join(' ')}>
        <InputLabel htmlFor="video-device">视频设备</InputLabel>
        <Select
          className={classes.select}
          value={currentVideoDeviceId}
          onChange={handleVideoDeviceChange}
          input={<Input name="video" id="video-device" />}
        >
          {
            videoDevices.map(device => {
              return (
                <MenuItem key={device.deviceId} value={device.deviceId}>
                  {device.label}
                </MenuItem>
              )
            })
          }
        </Select>
      </FormControl>

      <FormControl className={[isMobile ? classes.formControlMobile : classes.formControl].join(' ')}>
        <InputLabel htmlFor="audio-device">音频设备</InputLabel>
        <Select
          className={classes.select}
          value={currentAudioDeviceId}
          onChange={handleAudioDeviceChange}
          input={<Input name="audio" id="audio-device" />}
        >
          {
            audioDevices.map(device => {
              return (
                <MenuItem key={device.deviceId} value={device.deviceId}>
                  {device.label}
                </MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
    </div>
  )
};

export default SwitchPanel
