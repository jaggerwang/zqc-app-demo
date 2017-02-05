# React Native AMap Location
高德安卓定位SDK的React Native版本. [AMap Android Location SDK](http://lbs.amap.com/api/android-location-sdk/).

在国内由于众所周知的原因，安卓机子在国内几乎没法使用wifi定位，导致LBS应用很难通过RN自带的geoloc实现。所以在国内还是用个SDK比较好。


## Example
```
import AMapLocation from 'react-native-amap-location';
...
componentDidMount() {
  this.listener = AMapLocation.addEventListener((data) => console.log('data', data));
  AMapLocation.startLocation({
    accuracy: 'HighAccuracy',
    killProcess: true,
    needDetail: true,
  });
}

componentWillUnmount() {
  AMapLocation.stopLocation();
  this.listener.remove();
}
...

/*
result:
{
  accuracy: 29
  adCode: "310114"
  address: "上海市嘉定区嘉三路靠近同济大学嘉定校区华楼"
  altitude: 0
  bearing: 0
  city: "上海市"
  cityCode: "021"
  country: "中国"
  district: "嘉定区"
  latitude: 31.285728
  locationDetail: "-1"
  locationType: 4
  longitude: 121.217404
  poiName: "同济大学嘉定校区华楼"
  provider: "lbs"
  province: "上海市"
  satellites: 0
  speed: 0
  street: "嘉松北路"
  streetNum: "6128号"
}
*/
```

## Install

### Step 1 - NPM install

```
npm install react-native-amap-location --save
```

### Step 2 - Update Gradle Settings

```
// file: android/settings.gradle
...

include ':reactamaplocation'
project(':reactamaplocation').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-amap-location')
```

### Step 3 - Update app Gradle Build

```
// file: android/app/build.gradle
...

dependencies {
    ...
    compile project(':reactamaplocation')
}
```

### Step 4 - Register React Package

```
import com.xiaobu.amap.AMapLocationReactPackage;
...
   /**
   * A list of packages used by the app. If the app uses additional views
   * or modules besides the default ones, add more packages here.
   */
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new AMapLocationReactPackage()); // <-- Register package here
    }
...
```

### Step 5 - Add service, api key and permissions
```
// file: android/srsettings.gradle
<!--用于进行网络定位-->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"></uses-permission>
<!--用于访问GPS定位-->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"></uses-permission>
<!--获取运营商信息，用于支持提供运营商信息相关的接口-->
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"></uses-permission>
<!--用于访问wifi网络信息，wifi信息会用于进行网络定位-->
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"></uses-permission>
<!--这个权限用于获取wifi的获取权限，wifi信息会用来进行网络定位-->
<uses-permission android:name="android.permission.CHANGE_WIFI_STATE"></uses-permission>
<!--用于访问网络，网络定位需要上网-->
<uses-permission android:name="android.permission.INTERNET"></uses-permission>
<!--用于读取手机当前的状态-->
<uses-permission android:name="android.permission.READ_PHONE_STATE"></uses-permission>
<!--写入扩展存储，向扩展卡写入数据，用于写入缓存定位数据-->
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"></uses-permission>
<uses-permission android:name="android.permission.INTERNET" />

...
 <application
      android:allowBackup="true"
      android:label="@string/app_name"
      android:icon="@mipmap/ic_launcher"
      android:theme="@style/AppTheme">
      <service android:name="com.amap.api.location.APSService"></service>
      <meta-data
         android:name="com.amap.api.v2.apikey"
         android:value="Your api key here"/>
...
```


### Usage
```
// 开始获取位置
startLocation(options)
```
```
// 停止获取位置
stopLocation()
```
```
// 监听位置变化
listener = addEventListener(Callback(result))
// 移除监听
listener.remove()
```

### Options
```
默认设置
{
  needDetail: false, // 显示详细信息
  needMars: false, // 是否需要火星坐标，默认将火星坐标转为地球坐标
  accuracy: 'HighAccuracy', // BatterySaving(低功耗定位模式), DeviceSensors(仅设备定位模式), HighAccuracy(高精度模式)
  needAddress: true, // 设置是否返回地址信息
  onceLocation: false, // 是否只定位一次
  wifiActiveScan: true, // 设置是否强制刷新WIFI，默认为强制刷新,模式为仅设备模式(Device_Sensors)时无效
  mockEnable: false, // 设置是否允许模拟位置,默认为false，不允许模拟位置,模式为低功耗模式(Battery_Saving)时无效
  interval: 2000, // 设置定位间隔,单位毫秒,默认为2000ms
  killProcess: false, // 设置退出时是否杀死service, 模式为仅设备模式(Device_Sensors)时无效
  httpTimeOut: 30000, // 设置联网超时时间(ms), 模式为仅设备模式(Device_Sensors)时无效
}
```
