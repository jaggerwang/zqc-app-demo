package com.reactnativenavigation.react;

import android.view.KeyEvent;
import android.view.View;
import android.widget.EditText;

import com.facebook.react.ReactInstanceManager;
import com.reactnativenavigation.NavigationApplication;

public class JsDevReloadHandler {

    private static boolean shouldRefreshOnRR = false;

    //TODO yuck.
    public static boolean onKeyUp(View currentFocus, int keyCode) {
        ReactInstanceManager reactInstanceManager = NavigationApplication
                .instance
                .getReactGateway()
                .getReactInstanceManager();

        if (reactInstanceManager != null &&
                reactInstanceManager.getDevSupportManager().getDevSupportEnabled()) {
            if (keyCode == KeyEvent.KEYCODE_MENU) {
                reactInstanceManager.showDevOptionsDialog();
                return true;
            }
            if (keyCode == KeyEvent.KEYCODE_R && !(currentFocus instanceof EditText)) {
                // Enable double-tap-R-to-reload
                if (shouldRefreshOnRR) {
                    reactInstanceManager.getDevSupportManager().handleReloadJS();
                    shouldRefreshOnRR = false;
                    return true;
                } else {
                    shouldRefreshOnRR = true;
                    NavigationApplication.instance.runOnMainThread(
                            new Runnable() {
                                @Override
                                public void run() {
                                    shouldRefreshOnRR = false;
                                }
                            },
                            500);
                }
            }
        }
        return false;
    }
}
