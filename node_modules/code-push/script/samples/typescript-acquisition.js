var Acquisition = require("./acquisition-native-stub");
var MyApp = (function () {
    function MyApp() {
        this._acquisition = new Acquisition.NativeImplementation({ appVersion: "1.0.0", clientUniqueId: "203ff986-f335-4e94-8e79-ee404231218d", deploymentKey: "fa3s34a5s6d7f8we9a9r", serverUrl: MyApp.ServerUrl });
    }
    MyApp.prototype.onAppStartup = function () {
        var _this = this;
        this.registerLifecycleEvents();
        this.getLatestApp();
        window.setInterval(function () { return _this.getLatestApp(); }, MyApp.AppUpdateTimeoutMs);
    };
    MyApp.prototype.registerLifecycleEvents = function () {
        this._acquisition.beforeApply(function (error, newPackageInfo) {
            if (newPackageInfo.label.charAt(0) > "1") {
            }
        });
        this._acquisition.afterApply(function (error, oldPackageInfo) {
            if (oldPackageInfo.label.charAt(0) < "1") {
                // Display dialog to user about changes
                return Q.Promise(function (resolve) {
                    resolve();
                });
            }
        });
    };
    MyApp.prototype.getLatestApp = function () {
        var _this = this;
        this._acquisition.queryUpdate(function (error, remotePackage) { return _this.downloadAndApplyPackage(remotePackage); });
    };
    MyApp.prototype.downloadAndApplyPackage = function (remotePackage) {
        var _this = this;
        if (remotePackage) {
            this._acquisition.download(remotePackage, function (error, localPackage) { return _this.applyPackage(localPackage); });
        }
    };
    MyApp.prototype.applyPackage = function (localPackage) {
        if (localPackage) {
            this._acquisition.apply(localPackage);
        }
    };
    MyApp.AppStoreScriptVersion = "1.5";
    MyApp.AppUpdateTimeoutMs = 30 * 60 * 1000;
    MyApp.ServerUrl = "http://localhost:7127/";
    return MyApp;
})();
