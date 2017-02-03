# Zaiqiuchang app demo

Zaiqiuchang is a mobile app developed using React Native(RN for short), both iOS and Android are supported. For business reasons, this open source project is just the lite version of the business one. Full feature app can be downloaded at [在球场](https://www.zaiqiuchang.com) , and you can see the full power of RN.

### Screenshots

<img src="https://zqc.cdn.zaiqiuchang.com/screenshot/ios/screenshot-nearby-360p.jpg" />

* [功能演示视频](http://v.youku.com/v_show/id_XMjQ5MDQ0NzMwMA==.html)
* [Features show video](https://www.youtube.com/watch?v=Ni3a6cnu8h0)

### Tools

|Tool|Description|
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

**iOS**
```
> npm install
> react-native link
> react-native run-ios
```

**Android**
```
> npm install
> react-native link
> react-native run-android
```

### FAQ

**Fix android compile error: getUseDeveloperSupport should be public**

> It's a bug for react-native-navigation. If you encounter this, modify line `protected boolean getUseDeveloperSupport() {` to `public boolean getUseDeveloperSupport() {` in file "NavigationReactGateway.java".

### Other resources

* [视频课程 - React Native跨平台移动应用开发](http://study.163.com/course/courseMain.htm?courseId=1003433016)
* [技术文章 - React Native跨平台移动应用开发实战](https://jaggerwang.net/react-native-cross-platform-mobile-app-develop-intro/)
* [在球场官网](https://www.zaiqiuchang.com)
