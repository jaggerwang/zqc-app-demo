# 在球场Demo

本应用可作为开发React Native应用的参考，其中包含了页面导航、定位、图片浏览和视频播放等功能。

## 第三方库

|库名|用途|
|-------|-----------|
|[react-native](https://github.com/facebook/react-native)|React Native|
|[react](https://github.com/facebook/react)|React|
|[redux](http://redux.js.org/)|应用状态管理|
|[redux-persist](https://github.com/rt2zz/redux-persist)|应用状态持久化|
|[react-navigation](https://github.com/react-community/react-navigation)|页面导航|
|[react-native-code-push](react-native-code-push)|代码热更新|
|[react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker)|访问相册和相机|
|[react-native-video](https://github.com/react-native-community/react-native-video)|视频播放|
|[react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)|开源矢量图标引用|

## 如何运行

首先参考官方文档 [Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) 安装相关开发工具。

### iOS

仅支持macOS平台，需要先安装Xcode。  

Clone代码到本地，然后执行下面的命令。
```
> cd react-native-demo
> npm i
> react-native run-ios
```

### Android

macOS和Windows平台均支持，需要先安装Android Studio，并确保在Android Studio里编译通过（主要是根据提示更新“buildToolsVersion”）。如果要使用模拟器来运行，在Android Studio里打开AVD Manager，创建一个模拟器并启动。如果要使用真实设备来运行，确保真实设备已通过数据线连接到电脑，并且设备已打开开发模式。  

Clone代码到本地，然后执行下面的命令。
```
> cd react-native-demo
> npm i
> react-native run-android
```

所有包含原生工程的包都已使用 `react-native link` 链接过，因此无需再次执行。

## 生成Release包

### iOS

在Xcode里打开项目下的ios工程，依次选择 Product => Archive，按照提示操作即可。

### Android

首先执行下面的命令生成密钥文件。提示输入密码时请统一输入“zaiqiuchang”，否则请同步修改“android/app/build.gradle”文件里的“storePassword”和“keyPassword”属性的值。

```
> cd android/app
> keytool -genkey -v -keystore release.keystore -alias release -keyalg RSA -keysize 2048 -validity 10000
```

然后执行下面的命令来打包。生成的签名APK文件路径为“android/app/build/outputs/apk/app-release.apk”。
```
> cd android
> ./gradlew assembleRelease
```
