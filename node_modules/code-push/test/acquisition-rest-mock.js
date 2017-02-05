/// <reference path="../definitions/harness.d.ts" />
var querystring = require("querystring");
var acquisitionSdk = require("../script/acquisition-sdk");
exports.validDeploymentKey = "asdfasdfawerqw";
exports.latestPackage = {
    downloadURL: "http://www.windowsazure.com/blobs/awperoiuqpweru",
    description: "Angry flappy birds",
    appVersion: "1.5.0",
    label: "2.4.0",
    isMandatory: false,
    isAvailable: true,
    updateAppVersion: false,
    packageHash: "hash240",
    packageSize: 1024
};
exports.serverUrl = "http://myurl.com";
var reportStatusDeployUrl = exports.serverUrl + "/reportStatus/deploy";
var reportStatusDownloadUrl = exports.serverUrl + "/reportStatus/download";
var updateCheckUrl = exports.serverUrl + "/updateCheck?";
var HttpRequester = (function () {
    function HttpRequester() {
    }
    HttpRequester.prototype.request = function (verb, url, requestBodyOrCallback, callback) {
        if (!callback && typeof requestBodyOrCallback === "function") {
            callback = requestBodyOrCallback;
        }
        if (verb === 0 /* GET */ && url.indexOf(updateCheckUrl) === 0) {
            var params = querystring.parse(url.substring(updateCheckUrl.length));
            Server.onUpdateCheck(params, callback);
        }
        else if (verb === 2 /* POST */ && url === reportStatusDeployUrl) {
            Server.onReportStatus(callback);
        }
        else if (verb === 2 /* POST */ && url === reportStatusDownloadUrl) {
            Server.onReportStatus(callback);
        }
        else {
            throw new Error("Unexpected call");
        }
    };
    return HttpRequester;
})();
exports.HttpRequester = HttpRequester;
var CustomResponseHttpRequester = (function () {
    function CustomResponseHttpRequester(response) {
        this.response = response;
    }
    CustomResponseHttpRequester.prototype.request = function (verb, url, requestBodyOrCallback, callback) {
        if (typeof requestBodyOrCallback !== "function") {
            throw new Error("Unexpected request body");
        }
        callback = requestBodyOrCallback;
        callback(null, this.response);
    };
    return CustomResponseHttpRequester;
})();
exports.CustomResponseHttpRequester = CustomResponseHttpRequester;
var Server = (function () {
    function Server() {
    }
    Server.onAcquire = function (params, callback) {
        if (params.deploymentKey !== exports.validDeploymentKey) {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({ updateInfo: { isAvailable: false } })
            });
        }
        else {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({ updateInfo: exports.latestPackage })
            });
        }
    };
    Server.onUpdateCheck = function (params, callback) {
        var updateRequest = {
            deploymentKey: params.deploymentKey,
            appVersion: params.appVersion,
            packageHash: params.packageHash,
            isCompanion: !!(params.isCompanion),
            label: params.label
        };
        if (!updateRequest.deploymentKey || !updateRequest.appVersion) {
            callback(null, { statusCode: 400 });
        }
        else {
            var updateInfo = { isAvailable: false };
            if (updateRequest.deploymentKey === exports.validDeploymentKey) {
                if (updateRequest.isCompanion || updateRequest.appVersion === exports.latestPackage.appVersion) {
                    if (updateRequest.packageHash !== exports.latestPackage.packageHash) {
                        updateInfo = exports.latestPackage;
                    }
                }
                else if (updateRequest.appVersion < exports.latestPackage.appVersion) {
                    updateInfo = { updateAppVersion: true, appVersion: exports.latestPackage.appVersion };
                }
            }
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({ updateInfo: updateInfo })
            });
        }
    };
    Server.onReportStatus = function (callback) {
        callback(null, { statusCode: 200 });
    };
    return Server;
})();
