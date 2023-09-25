export default class WinResponse {
  constructor(activeDevices) {
    this.activeDevices = activeDevices;
    this.isDeviceActive = activeDevices.length !== 0;
  }
}
