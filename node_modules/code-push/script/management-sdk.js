var os = require("os");
var Q = require("q");
var superagent = require("superagent");
var Promise = Q.Promise;
var packageJson = require("../package.json");
if (typeof window === "undefined") {
    fs = require("fs");
}
else {
    fs = {
        createReadStream: function (fileOrPath) {
            throw new Error("Tried to call a node fs function from the browser.");
        }
    };
}
// A template string tag function that URL encodes the substituted values
function urlEncode(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var result = "";
    for (var i = 0; i < strings.length; i++) {
        result += strings[i];
        if (i < values.length) {
            result += encodeURIComponent(values[i]);
        }
    }
    return result;
}
var AccountManager = (function () {
    function AccountManager(accessKey, customHeaders, serverUrl) {
        if (!accessKey)
            throw new Error("An access key must be specified.");
        this._accessKey = accessKey;
        this._customHeaders = customHeaders;
        this._serverUrl = serverUrl || AccountManager.SERVER_URL;
    }
    Object.defineProperty(AccountManager.prototype, "accessKey", {
        get: function () {
            return this._accessKey;
        },
        enumerable: true,
        configurable: true
    });
    AccountManager.prototype.isAuthenticated = function () {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var request = superagent.get(_this._serverUrl + (_a = ["/authenticated"], _a.raw = ["/authenticated"], urlEncode(_a)));
            _this.attachCredentials(request);
            request.end(function (err, res) {
                if (err && err.status !== 401) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                var status = res ? res.status : err.status;
                var authenticated = status === 200;
                resolve(authenticated);
            });
            var _a;
        });
    };
    AccountManager.prototype.addAccessKey = function (description) {
        if (!description) {
            throw new Error("A description must be specified when adding an access key.");
        }
        var hostname = os.hostname();
        var accessKeyRequest = { createdBy: hostname, description: description };
        return this.post((_a = ["/accessKeys/"], _a.raw = ["/accessKeys/"], urlEncode(_a)), JSON.stringify(accessKeyRequest), true)
            .then(function (response) { return response.body.accessKey; });
        var _a;
    };
    AccountManager.prototype.getAccessKey = function (accessKey) {
        return this.get((_a = ["/accessKeys/", ""], _a.raw = ["/accessKeys/", ""], urlEncode(_a, accessKey)))
            .then(function (res) { return res.body.accessKey; });
        var _a;
    };
    AccountManager.prototype.getAccessKeys = function () {
        return this.get((_a = ["/accessKeys"], _a.raw = ["/accessKeys"], urlEncode(_a)))
            .then(function (res) { return res.body.accessKeys; });
        var _a;
    };
    AccountManager.prototype.removeAccessKey = function (accessKey) {
        return this.del((_a = ["/accessKeys/", ""], _a.raw = ["/accessKeys/", ""], urlEncode(_a, accessKey)))
            .then(function () { return null; });
        var _a;
    };
    // Account
    AccountManager.prototype.getAccountInfo = function () {
        return this.get((_a = ["/account"], _a.raw = ["/account"], urlEncode(_a)))
            .then(function (res) { return res.body.account; });
        var _a;
    };
    // Apps
    AccountManager.prototype.getApps = function () {
        return this.get((_a = ["/apps"], _a.raw = ["/apps"], urlEncode(_a)))
            .then(function (res) { return res.body.apps; });
        var _a;
    };
    AccountManager.prototype.getApp = function (appName) {
        return this.get((_a = ["/apps/", ""], _a.raw = ["/apps/", ""], urlEncode(_a, appName)))
            .then(function (res) { return res.body.app; });
        var _a;
    };
    AccountManager.prototype.addApp = function (appName) {
        var app = { name: appName };
        return this.post((_a = ["/apps/"], _a.raw = ["/apps/"], urlEncode(_a)), JSON.stringify(app), false)
            .then(function () { return app; });
        var _a;
    };
    AccountManager.prototype.removeApp = function (appName) {
        return this.del((_a = ["/apps/", ""], _a.raw = ["/apps/", ""], urlEncode(_a, appName)))
            .then(function () { return null; });
        var _a;
    };
    AccountManager.prototype.renameApp = function (oldAppName, newAppName) {
        return this.patch((_a = ["/apps/", ""], _a.raw = ["/apps/", ""], urlEncode(_a, oldAppName)), JSON.stringify({ name: newAppName }))
            .then(function () { return null; });
        var _a;
    };
    AccountManager.prototype.transferApp = function (appName, email) {
        return this.post((_a = ["/apps/", "/transfer/", ""], _a.raw = ["/apps/", "/transfer/", ""], urlEncode(_a, appName, email)), null, false)
            .then(function () { return null; });
        var _a;
    };
    // Collaborators
    AccountManager.prototype.getCollaborators = function (appName) {
        return this.get((_a = ["/apps/", "/collaborators"], _a.raw = ["/apps/", "/collaborators"], urlEncode(_a, appName)))
            .then(function (res) { return res.body.collaborators; });
        var _a;
    };
    AccountManager.prototype.addCollaborator = function (appName, email) {
        return this.post((_a = ["/apps/", "/collaborators/", ""], _a.raw = ["/apps/", "/collaborators/", ""], urlEncode(_a, appName, email)), null, false)
            .then(function () { return null; });
        var _a;
    };
    AccountManager.prototype.removeCollaborator = function (appName, email) {
        return this.del((_a = ["/apps/", "/collaborators/", ""], _a.raw = ["/apps/", "/collaborators/", ""], urlEncode(_a, appName, email)))
            .then(function () { return null; });
        var _a;
    };
    // Deployments
    AccountManager.prototype.addDeployment = function (appName, deploymentName) {
        var deployment = { name: deploymentName };
        return this.post((_a = ["/apps/", "/deployments/"], _a.raw = ["/apps/", "/deployments/"], urlEncode(_a, appName)), JSON.stringify(deployment), true)
            .then(function (res) { return res.body.deployment; });
        var _a;
    };
    AccountManager.prototype.clearDeploymentHistory = function (appName, deploymentName) {
        return this.del((_a = ["/apps/", "/deployments/", "/history"], _a.raw = ["/apps/", "/deployments/", "/history"], urlEncode(_a, appName, deploymentName)))
            .then(function () { return null; });
        var _a;
    };
    AccountManager.prototype.getDeployments = function (appName) {
        return this.get((_a = ["/apps/", "/deployments/"], _a.raw = ["/apps/", "/deployments/"], urlEncode(_a, appName)))
            .then(function (res) { return res.body.deployments; });
        var _a;
    };
    AccountManager.prototype.getDeployment = function (appName, deploymentName) {
        return this.get((_a = ["/apps/", "/deployments/", ""], _a.raw = ["/apps/", "/deployments/", ""], urlEncode(_a, appName, deploymentName)))
            .then(function (res) { return res.body.deployment; });
        var _a;
    };
    AccountManager.prototype.renameDeployment = function (appName, oldDeploymentName, newDeploymentName) {
        return this.patch((_a = ["/apps/", "/deployments/", ""], _a.raw = ["/apps/", "/deployments/", ""], urlEncode(_a, appName, oldDeploymentName)), JSON.stringify({ name: newDeploymentName }))
            .then(function () { return null; });
        var _a;
    };
    AccountManager.prototype.removeDeployment = function (appName, deploymentName) {
        return this.del((_a = ["/apps/", "/deployments/", ""], _a.raw = ["/apps/", "/deployments/", ""], urlEncode(_a, appName, deploymentName)))
            .then(function () { return null; });
        var _a;
    };
    AccountManager.prototype.getDeploymentMetrics = function (appName, deploymentName) {
        return this.get((_a = ["/apps/", "/deployments/", "/metrics"], _a.raw = ["/apps/", "/deployments/", "/metrics"], urlEncode(_a, appName, deploymentName)))
            .then(function (res) { return res.body.metrics; });
        var _a;
    };
    AccountManager.prototype.getDeploymentHistory = function (appName, deploymentName) {
        return this.get((_a = ["/apps/", "/deployments/", "/history"], _a.raw = ["/apps/", "/deployments/", "/history"], urlEncode(_a, appName, deploymentName)))
            .then(function (res) { return res.body.history; });
        var _a;
    };
    AccountManager.prototype.release = function (appName, deploymentName, fileOrPath, targetBinaryVersion, updateMetadata, uploadProgressCallback) {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            updateMetadata.appVersion = targetBinaryVersion;
            var request = superagent.post(_this._serverUrl + (_a = ["/apps/", "/deployments/", "/release"], _a.raw = ["/apps/", "/deployments/", "/release"], urlEncode(_a, appName, deploymentName)));
            _this.attachCredentials(request);
            var file;
            if (typeof fileOrPath === "string") {
                file = fs.createReadStream(fileOrPath);
            }
            else {
                file = fileOrPath;
            }
            request.attach("package", file)
                .field("packageInfo", JSON.stringify(updateMetadata))
                .on("progress", function (event) {
                if (uploadProgressCallback && event && event.total > 0) {
                    var currentProgress = event.loaded / event.total * 100;
                    uploadProgressCallback(currentProgress);
                }
            })
                .end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                if (res.ok) {
                    resolve(null);
                }
                else {
                    try {
                        var body = JSON.parse(res.text);
                    }
                    catch (err) {
                    }
                    if (body) {
                        reject(body);
                    }
                    else {
                        reject({ message: res.text, statusCode: res.status });
                    }
                }
            });
            var _a;
        });
    };
    AccountManager.prototype.patchRelease = function (appName, deploymentName, label, updateMetadata) {
        updateMetadata.label = label;
        var requestBody = JSON.stringify({ packageInfo: updateMetadata });
        return this.patch((_a = ["/apps/", "/deployments/", "/release"], _a.raw = ["/apps/", "/deployments/", "/release"], urlEncode(_a, appName, deploymentName)), requestBody, false)
            .then(function () { return null; });
        var _a;
    };
    AccountManager.prototype.promote = function (appName, sourceDeploymentName, destinationDeploymentName, updateMetadata) {
        var requestBody = JSON.stringify({ packageInfo: updateMetadata });
        return this.post((_a = ["/apps/", "/deployments/", "/promote/", ""], _a.raw = ["/apps/", "/deployments/", "/promote/", ""], urlEncode(_a, appName, sourceDeploymentName, destinationDeploymentName)), requestBody, false)
            .then(function () { return null; });
        var _a;
    };
    AccountManager.prototype.rollback = function (appName, deploymentName, targetRelease) {
        return this.post((_a = ["/apps/", "/deployments/", "/rollback/", ""], _a.raw = ["/apps/", "/deployments/", "/rollback/", ""], urlEncode(_a, appName, deploymentName, targetRelease || "")), null, false)
            .then(function () { return null; });
        var _a;
    };
    AccountManager.prototype.get = function (endpoint, expectResponseBody) {
        if (expectResponseBody === void 0) { expectResponseBody = true; }
        return this.makeApiRequest("get", endpoint, null, expectResponseBody, null);
    };
    AccountManager.prototype.post = function (endpoint, requestBody, expectResponseBody, contentType) {
        if (contentType === void 0) { contentType = "application/json;charset=UTF-8"; }
        return this.makeApiRequest("post", endpoint, requestBody, expectResponseBody, contentType);
    };
    AccountManager.prototype.patch = function (endpoint, requestBody, expectResponseBody, contentType) {
        if (expectResponseBody === void 0) { expectResponseBody = false; }
        if (contentType === void 0) { contentType = "application/json;charset=UTF-8"; }
        return this.makeApiRequest("patch", endpoint, requestBody, expectResponseBody, contentType);
    };
    AccountManager.prototype.del = function (endpoint, expectResponseBody) {
        if (expectResponseBody === void 0) { expectResponseBody = false; }
        return this.makeApiRequest("del", endpoint, null, expectResponseBody, null);
    };
    AccountManager.prototype.makeApiRequest = function (method, endpoint, requestBody, expectResponseBody, contentType) {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var request = superagent[method](_this._serverUrl + endpoint);
            _this.attachCredentials(request);
            if (requestBody) {
                if (contentType) {
                    request = request.set("Content-Type", contentType);
                }
                request = request.send(requestBody);
            }
            request.end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                try {
                    var body = JSON.parse(res.text);
                }
                catch (err) {
                }
                if (res.ok) {
                    if (expectResponseBody && !body) {
                        reject({ message: "Could not parse response: " + res.text, statusCode: res.status });
                    }
                    else {
                        resolve({
                            headers: res.header,
                            body: body
                        });
                    }
                }
                else {
                    if (body) {
                        reject(body);
                    }
                    else {
                        reject({ message: res.text, statusCode: res.status });
                    }
                }
            });
        });
    };
    AccountManager.prototype.getErrorMessage = function (error, response) {
        return response && response.text ? response.text : error.message;
    };
    AccountManager.prototype.attachCredentials = function (request) {
        if (this._customHeaders) {
            for (var headerName in this._customHeaders) {
                request.set(headerName, this._customHeaders[headerName]);
            }
        }
        request.set("Accept", "application/vnd.code-push.v" + AccountManager.API_VERSION + "+json");
        request.set("Authorization", "Bearer " + this._accessKey);
        request.set("X-CodePush-SDK-Version", packageJson.version);
    };
    AccountManager.AppPermission = {
        OWNER: "Owner",
        COLLABORATOR: "Collaborator"
    };
    AccountManager.SERVER_URL = "https://codepush-management.azurewebsites.net";
    AccountManager.API_VERSION = 2;
    return AccountManager;
})();
module.exports = AccountManager;
