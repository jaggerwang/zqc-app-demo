package com.xiaobu.amap;

import android.util.Log;
import java.util.HashMap;
import java.util.Map;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import com.amap.api.location.CoordinateConverter;
import com.amap.api.location.DPoint;
import com.amap.api.location.CoordinateConverter.CoordType;
import com.amap.api.location.AMapLocation;
import com.amap.api.location.AMapLocationClient;
import com.amap.api.location.AMapLocationClientOption;
import com.amap.api.location.AMapLocationClientOption.AMapLocationMode;
import com.amap.api.location.AMapLocationListener;

import javax.annotation.Nullable;


public class AMapLocationReactModule extends ReactContextBaseJavaModule implements AMapLocationListener{

    //声明AMapLocationClient类对象
    private final AMapLocationClient mLocationClient;

    //声明定位回调监听器
    private AMapLocationListener mLocationListener = this; // new AMapLocationListener();

    private final ReactApplicationContext mReactContext;


    private boolean needMars = false;
    private boolean needDetail = false;

    private void sendEvent(String eventName,
                            @Nullable WritableMap params) {
        if (mReactContext != null) {
            mReactContext
              .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
              .emit(eventName, params);
          }
    }


    public AMapLocationReactModule(ReactApplicationContext reactContext) {
        super(reactContext);
        //初始化定位
        this.mLocationClient = new AMapLocationClient(reactContext);
        //设置定位回调监听
        this.mLocationClient.setLocationListener(mLocationListener);
        mReactContext = reactContext;
    }

    @Override
    public String getName() {
        return "AMapLocation";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        // constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        // constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    // 开启位置监听
    @ReactMethod
    public void startLocation(@Nullable ReadableMap options) {
        this.mLocationClient.startLocation();
        AMapLocationClientOption mLocationOption = new AMapLocationClientOption();
        // 默认值
        needMars = false;
        needDetail = false;
        if (options != null) {
            if (options.hasKey("needMars")) {
                needMars = options.getBoolean("needMars");
            }
            if (options.hasKey("needDetail")) {
                needDetail = options.getBoolean("needDetail");
            }
            if (options.hasKey("accuracy")) {
                //设置定位模式为高精度模式，Battery_Saving为低功耗模式，Device_Sensors是仅设备模式
                switch(options.getString("accuracy")) {
                    case "BatterySaving":
                        mLocationOption.setLocationMode(AMapLocationMode.Battery_Saving);
                        break;
                    case "DeviceSensors":
                        mLocationOption.setLocationMode(AMapLocationMode.Device_Sensors);
                        break;
                    case "HighAccuracy":
                        mLocationOption.setLocationMode(AMapLocationMode.Hight_Accuracy);
                        break;
                    default:
                        break;
                }
            }
            if (options.hasKey("needAddress")) {
                //设置是否返回地址信息（默认返回地址信息）
                mLocationOption.setNeedAddress(options.getBoolean("needAddress"));
            }
            if (options.hasKey("onceLocation")) {
                //设置是否只定位一次,默认为false
                mLocationOption.setOnceLocation(options.getBoolean("onceLocation"));
            }
            if (options.hasKey("wifiActiveScan")) {
                //设置是否强制刷新WIFI，默认为强制刷新
                //模式为仅设备模式(Device_Sensors)时无效
                mLocationOption.setWifiActiveScan(options.getBoolean("wifiActiveScan"));
            }
            if (options.hasKey("mockEnable")) {
                //设置是否允许模拟位置,默认为false，不允许模拟位置
                //模式为低功耗模式(Battery_Saving)时无效
                mLocationOption.setMockEnable(options.getBoolean("mockEnable"));
            }
            if (options.hasKey("interval")) {
                //设置定位间隔,单位毫秒,默认为2000ms
                mLocationOption.setInterval(options.getInt("interval"));
            }
            if (options.hasKey("killProcess")) {
                //设置退出时是否杀死service
                //默认值:false, 不杀死
                //模式为仅设备模式(Device_Sensors)时无效
                mLocationOption.setKillProcess(options.getBoolean("killProcess"));
            }

            if (options.hasKey("httpTimeOut")) {
                //设置联网超时时间
                //默认值：30000毫秒
                //模式为仅设备模式(Device_Sensors)时无效
                mLocationOption.setHttpTimeOut(options.getInt("httpTimeOut"));
            }
        }

        //给定位客户端对象设置定位参数
        this.mLocationClient.setLocationOption(mLocationOption);
        //启动定位
        this.mLocationClient.startLocation();
    }

    // 停止位置监听
    @ReactMethod
    public void stopLocation() {
        this.mLocationClient.stopLocation();
    }

    // 坐标转换

    /*
    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (null != this.mLocationClient) {
            this.mLocationClient.onDestroy();
            this.mLocationClient = null;
        }
    }
    */


    // 获得定位结果
    @Override
    public void onLocationChanged(AMapLocation amapLocation) {
        if (amapLocation != null) {
            sendEvent("onLocationChangedAMAPLOCATION", amapLocationToObject(amapLocation));
        }
    }


    private WritableMap amapLocationToObject(AMapLocation amapLocation) {
        WritableMap map = Arguments.createMap();
        Integer errorCode = amapLocation.getErrorCode();
        if (errorCode > 0) {
            map.putInt("errorCode", errorCode);
            map.putString("errorInfo", amapLocation.getErrorInfo());
        } else {
            Double latitude = amapLocation.getLatitude();
            Double longitude =  amapLocation.getLongitude();
            if (!needMars) {

                try {
                    CoordinateConverter converter  = new CoordinateConverter(mReactContext);
                    //返回true代表当前位置在大陆、港澳地区，反之不在。
                    boolean isAMapDataAvailable = converter.isAMapDataAvailable(latitude,longitude);
                    if (isAMapDataAvailable) {
                        // 在中国境内，火星了
                        double[] deltas = delta(latitude, longitude);
                        latitude = latitude - deltas[0];
                        longitude = longitude - deltas[1];
                    }
                } catch (Exception ex) {
                    return null;
                }
            }

            map.putInt("locationType", amapLocation.getLocationType());
            map.putDouble("latitude", latitude);
            map.putDouble("longitude", longitude);


            if (needDetail) {
                // GPS Only
                map.putDouble("accuracy", amapLocation.getAccuracy());
                map.putInt("satellites", amapLocation.getSatellites());
                map.putDouble("altitude", amapLocation.getAltitude());
                map.putDouble("speed", amapLocation.getSpeed());
                map.putDouble("bearing", amapLocation.getBearing());

                map.putString("address", amapLocation.getAddress());
                map.putString("adCode", amapLocation.getAdCode());
                map.putString("country", amapLocation.getCountry());
                map.putString("province", amapLocation.getProvince());
                map.putString("poiName", amapLocation.getPoiName());
                map.putString("provider", amapLocation.getProvider());
                map.putString("locationDetail", amapLocation.getLocationDetail());
                map.putString("street", amapLocation.getStreet());
                map.putString("streetNum", amapLocation.getStreetNum());
                map.putString("city", amapLocation.getCity());
                map.putString("cityCode", amapLocation.getCityCode());
                map.putString("country", amapLocation.getCountry());
                map.putString("district", amapLocation.getDistrict());
                // map.putString("aoiName", amapLocation.getAOIName());
            }

        }
       return map;
    }

    // Utils
    public static double transformLat(double x, double y) {
        double ret =
            -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * Math.PI) + 40.0 * Math.sin(y / 3.0 * Math.PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * Math.PI) + 320 * Math.sin(y * Math.PI / 30.0)) * 2.0 / 3.0;
        return ret;
      }

      public static double transformLon(double x, double y) {
        double ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * Math.PI) + 40.0 * Math.sin(x / 3.0 * Math.PI)) * 2.0 / 3.0;
        ret +=
            (150.0 * Math.sin(x / 12.0 * Math.PI) + 300.0 * Math.sin(x / 30.0 * Math.PI)) * 2.0 / 3.0;
        return ret;
      }
      /**
       *
       * @param lat纬度
       * @param lng经度
       * @return delta[0] 是纬度差，delta[1]是经度差
       */
      public static double[] delta(double lat,double lng){
        double[] delta = new double[2];
        double a = 6378245.0;
        double ee = 0.00669342162296594323;
        double dLat = transformLat(lng-105.0, lat-35.0);
        double dLng = transformLon(lng-105.0, lat-35.0);
        double radLat = lat / 180.0 * Math.PI;
        double magic = Math.sin(radLat);
        magic = 1 - ee*magic*magic;
        double sqrtMagic = Math.sqrt(magic);
        delta[0] = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * Math.PI);
        delta[1] = (dLng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * Math.PI);
        return delta;
      }

}
