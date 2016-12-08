package com.zaiqiuchang;

import java.util.Arrays;
import java.util.List;

import android.support.annotation.Nullable;

import com.facebook.react.ReactPackage;

import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.xiaobu.amap.AMapLocationReactPackage;
import com.reactnativenavigation.NavigationApplication;

public class MainApplication extends NavigationApplication {

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  @Nullable
  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return Arrays.<ReactPackage>asList(
      new VectorIconsPackage(),
      new ImageResizerPackage(),
      new ImagePickerPackage(),
      new RNDeviceInfo(),
      new AMapLocationReactPackage()
    );
  }
}
