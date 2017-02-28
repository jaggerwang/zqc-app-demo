# Zaiqiuchang app demo

[Zaiqiuchang(在球场)](https://www.zaiqiuchang.com) is a mobile app developed using react native, both iOS and Android are supported. This open source project is just the lite version of the app. You can install the full version to see the power of react native.

### Screenshots

<img src="https://zqc.cdn.zaiqiuchang.com/screenshot/ios/screenshot-nearby.jpg?x-oss-process=style/w-360" width="240" />

* [功能演示视频](http://v.youku.com/v_show/id_XMjQ5MDQ0NzMwMA==.html)
* [Features show video](https://www.youtube.com/watch?v=Ni3a6cnu8h0)

### Packages

|Package|Description|
|-------|-----------|
|[react-native](https://github.com/facebook/react-native)|Bridge to native.|
|[react](https://github.com/facebook/react)|Build ui component.|
|[redux](http://redux.js.org/)|Manage ui state.|
|[react-native-navigation](https://github.com/wix/react-native-navigation)|Screen navigation.|
|[react-native-code-push](react-native-code-push)|Online upgrade app without submitting to app store.|
|[react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker)|Pick image and video from album, or taken from camera.|
|[react-native-video](https://github.com/react-native-community/react-native-video)|Play video.|
|[react-native-orientation](https://github.com/yamill/react-native-orientation)|Orientation support.|
|[react-native-amap-location](https://github.com/xiaobuu/react-native-amap-location)|Locate on Android.|
|[react-native-wechat](https://github.com/weflex/react-native-wechat)|Share to WeChat.|
|[react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)|Display icon.|

### How to run

First you sholud make sure [React Native](http://facebook.github.io/react-native/releases/0.40/docs/getting-started.html) is already installed.

```
> git clone git@github.com:jaggerwang/zqc-app-demo.git && cd zqc-app-demo
> npm install
> react-native run-ios # or run-android
```

As we already did `react-native link` for native code, so there is no need to do this again.

> Notice! After installed dependent packages, you should fix some known issues manually, otherwise you will encounter compile errors. Do as section [Known issues](#known-issues).

### Generating Android APK

Please follow the official doc [Generating Signed APK](https://facebook.github.io/react-native/docs/signed-apk-android.html).

### Known issues

**react-native-navigation**

Open file 'node_modules/react-native-navigation/android/app/src/main/java/com/reactnativenavigation/react/NavigationReactGateway.java', find line `protected boolean getUseDeveloperSupport() {` and modify it to `public boolean getUseDeveloperSupport() {`.

**react-native-wechat**

Open file 'node_modules/react-native-wechat/ios/RCTWeChat.m', remove or comment line `#import <RCTImage/RCTImageUtils.h>`.

### Other resources

* [视频课程 - React Native跨平台移动应用开发](http://study.163.com/course/courseMain.htm?courseId=1003433016)
* [技术文章 - React Native跨平台移动应用开发实战](https://jaggerwang.net/react-native-cross-platform-mobile-app-develop-intro/)
* [在球场官网](https://www.zaiqiuchang.com)
