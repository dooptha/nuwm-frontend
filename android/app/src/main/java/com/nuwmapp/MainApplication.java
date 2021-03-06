package com.nuwmapp;

import android.app.Application;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.kevinresol.react_native_default_preference.RNDefaultPreferencePackage;
import com.rollbar.RollbarReactNativePackage;
import com.rollbar.RollbarReactNative;
import com.zmxv.RNSound.RNSoundPackage;
import com.masteratul.exceptionhandler.ReactNativeExceptionHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.BV.LinearGradient.LinearGradientPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactcommunity.rnlocalize.RNLocalizePackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.reanimated.ReanimatedPackage;

import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      packages.add(new RNLocalizePackage());
      packages.add(new RNGestureHandlerPackage());
      packages.add(new RNScreensPackage());
      packages.add(new AsyncStoragePackage());
      packages.add(new RNCWebViewPackage());
      packages.add(new LinearGradientPackage());
      packages.add(new RNDeviceInfo());
      packages.add(new RNSoundPackage());
      packages.add(new RollbarReactNativePackage());
      packages.add(new ReanimatedPackage());
      packages.add(new ReactNativeExceptionHandlerPackage());
      packages.add(new RNDefaultPreferencePackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    RollbarReactNative.init(this, "1fb60ff4e452430f9b79b7634025450a", "production");
  }
}
