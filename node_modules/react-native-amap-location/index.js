import {NativeModules, DeviceEventEmitter} from 'react-native';

const AMapLocation = NativeModules.AMapLocation;
const onLocationChanged = 'onLocationChangedAMAPLOCATION';


export default class ALocation {

  static startLocation(options) {
    AMapLocation.startLocation(options);
  }

  static stopLocation() {
    AMapLocation.stopLocation();
  }

  static addEventListener(handler) {

    const listener = DeviceEventEmitter.addListener(
        onLocationChanged,
        handler,
    );
    return listener;
  }
}
