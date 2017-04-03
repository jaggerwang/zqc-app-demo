package com.zaiqiuchang;

import java.util.Arrays;
import java.util.List;

import android.support.annotation.Nullable;

import com.facebook.react.ReactPackage;

import com.reactnativenavigation.NavigationApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.xiaobu.amap.AMapLocationReactPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.theweflex.react.WeChatPackage;
import com.microsoft.codepush.react.CodePush;

public class MainApplication extends NavigationApplication {

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  @Override
  public String getJSBundleFile() {
      return CodePush.getJSBundleFile();
  }

  @Nullable
  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return Arrays.<ReactPackage>asList(
        new VectorIconsPackage(),
        new AMapLocationReactPackage(),
        new PickerPackage(),
        new ReactVideoPackage(),
        new WeChatPackage(),
        new CodePush("", MainApplication.this, BuildConfig.DEBUG)
    );
  }
}
