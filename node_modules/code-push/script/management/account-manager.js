var base64 = require("base-64");
var Q = require("q");
var crypto = require("crypto");
var tryJSON = require("try-json");
var Promise = Q.Promise;
var request = require("superagent");
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
var Permissions;
(function (Permissions) {
    Permissions.Owner = "Owner";
    Permissions.Collaborator = "Collaborator";
})(Permissions = exports.Permissions || (exports.Permissions = {}));
var AccountManager = (function () {
    function AccountManager(serverUrl, userAgent) {
        this._saveAuthedAgent = false;
        this.serverUrl = "http://localhost:3000";
        // If window is not defined, it means we are in the node environment and not a browser.
        this._saveAuthedAgent = (typeof window === "undefined");
        this._userAgent = userAgent;
        this.serverUrl = serverUrl;
    }
    Object.defineProperty(AccountManager.prototype, "accountId", {
        get: function () {
            return this.account.id;
        },
        enumerable: true,
        configurable: true
    });
    AccountManager.prototype.loginWithAccessToken = function (accessToken) {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var loginInfo = AccountManager.getLoginInfo(accessToken);
            var req = request.post(_this.serverUrl + "/auth/login/accessToken");
            _this.attachCredentials(req, request);
            req = req.type("form");
            if (loginInfo && loginInfo.providerName && loginInfo.providerUniqueId) {
                // Login the old way.
                req = req.send({ identity: JSON.stringify({ providerName: loginInfo.providerName, providerUniqueId: loginInfo.providerUniqueId }) })
                    .send({ token: loginInfo.accessKeyName });
            }
            else {
                // Note: We can't send an empty identity string, or PassportAuth will short circuit and fail.
                req = req.send({ identity: "accessKey" })
                    .send({ token: accessToken });
            }
            req.end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                if (_this._saveAuthedAgent) {
                    _this._authedAgent = request.agent();
                    _this._authedAgent.saveCookies(res);
                }
                if (res.ok) {
                    resolve(null);
                }
                else {
                    var body = tryJSON(res.text);
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
    AccountManager.prototype.logout = function () {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var req = request.post(_this.serverUrl + "/auth/logout");
            _this.attachCredentials(req, request);
            req.end(function (err, res) {
                if (err && err.status !== 401) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                _this._authedAgent = null;
                if (res.ok) {
                    resolve(null);
                }
                else {
                    var body = tryJSON(res.text);
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
    AccountManager.prototype.isAuthenticated = function () {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var requester = _this._authedAgent ? _this._authedAgent : request;
            var req = requester.get(_this.serverUrl + "/authenticated");
            _this.attachCredentials(req, requester);
            req.end(function (err, res) {
                if (err && err.status !== 401) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                var status = res ? res.status : err.status;
                var authenticated = status === 200;
                if (authenticated && _this._saveAuthedAgent) {
                    _this._authedAgent = request.agent();
                    _this._authedAgent.saveCookies(res);
                }
                resolve(authenticated);
            });
        });
    };
    AccountManager.prototype.addAccessKey = function (machine, description) {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            return _this.generateAccessKey().then(function (newAccessKey) {
                var accessKey = { id: null, name: newAccessKey, createdTime: new Date().getTime(), createdBy: machine, description: description };
                var requester = _this._authedAgent ? _this._authedAgent : request;
                var req = requester.post(_this.serverUrl + "/accessKeys/");
                _this.attachCredentials(req, requester);
                req.set("Content-Type", "application/json;charset=UTF-8")
                    .send(JSON.stringify(accessKey))
                    .end(function (err, res) {
                    if (err) {
                        reject({ message: _this.getErrorMessage(err, res) });
                        return;
                    }
                    if (res.ok) {
                        var location = res.header["location"];
                        if (location && location.lastIndexOf("/") !== -1) {
                            accessKey.id = location.substr(location.lastIndexOf("/") + 1);
                            resolve(accessKey);
                        }
                        else {
                            resolve(null);
                        }
                    }
                    else {
                        var body = tryJSON(res.text);
                        if (body) {
                            reject(body);
                        }
                        else {
                            reject({ message: res.text, statusCode: res.status });
                        }
                    }
                });
            });
        });
    };
    AccountManager.prototype.getAccessKey = function (accessKeyId) {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var requester = _this._authedAgent ? _this._authedAgent : request;
            var req = requester.get(_this.serverUrl + "/accessKeys/" + accessKeyId);
            _this.attachCredentials(req, requester);
            req.end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                var body = tryJSON(res.text);
                if (res.ok) {
                    if (body) {
                        resolve(body.accessKey);
                    }
                    else {
                        reject({ message: "Could not parse response: " + res.text, statusCode: res.status });
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
    AccountManager.prototype.getAccessKeys = function () {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var requester = _this._authedAgent ? _this._authedAgent : request;
            var req = requester.get(_this.serverUrl + "/accessKeys");
            _this.attachCredentials(req, requester);
            req.end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                var body = tryJSON(res.text);
                if (res.ok) {
                    if (body) {
                        resolve(body.accessKeys);
                    }
                    else {
                        reject({ message: "Could not parse response: " + res.text, statusCode: res.status });
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
    AccountManager.prototype.removeAccessKey = function (accessKeyId) {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var requester = _this._authedAgent ? _this._authedAgent : request;
            var req = requester.del(_this.serverUrl + "/accessKeys/" + accessKeyId);
            _this.attachCredentials(req, requester);
            req.end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                if (res.ok) {
                    resolve(null);
                }
                else {
                    var body = tryJSON(res.text);
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
    // Account
    AccountManager.prototype.getAccountInfo = function () {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var requester = (_this._authedAgent ? _this._authedAgent : request);
            var req = requester.get(_this.serverUrl + "/account");
            _this.attachCredentials(req, requester);
            req.end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                var body = tryJSON(res.text);
                if (res.ok) {
                    if (body) {
                        _this.account = body.account;
                        resolve(_this.account);
                    }
                    else {
                        reject({ message: "Could not parse response: " + res.text, statusCode: res.status });
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
    AccountManager.prototype.updateAccountInfo = function (accountInfoToChange) {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var requester = (_this._authedAgent ? _this._authedAgent : request);
            var req = requester.put(_this.serverUrl + "/account");
            _this.attachCredentials(req, requester);
            req.set("Content-Type", "application/json;charset=UTF-8")
                .send(JSON.stringify(accountInfoToChange))
                .end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                if (res.ok) {
                    resolve(null);
                }
                else {
                    var body = tryJSON(res.text);
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
    // Apps
    AccountManager.prototype.getApps = function () {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var requester = (_this._authedAgent ? _this._authedAgent : request);
            var req = requester.get(_this.serverUrl + "/apps");
            _this.attachCredentials(req, requester);
            req.end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                var body = tryJSON(res.text);
                if (res.ok) {
                    if (body) {
                        resolve(body.apps);
                    }
                    else {
                        reject({ message: "Could not parse response: " + res.text, statusCode: res.status });
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
    AccountManager.prototype.getApp = function (appId) {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var requester = (_this._authedAgent ? _this._authedAgent : request);
            var req = requester.get(_this.serverUrl + "/apps/" + appId);
            _this.attachCredentials(req, requester);
            req.end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                var body = tryJSON(res.text);
                if (res.ok) {
                    if (body) {
                        resolve(body.app);
                    }
                    else {
                        reject({ message: "Could not parse response: " + res.text, statusCode: res.status });
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
    AccountManager.prototype.addApp = function (appName) {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var app = { name: appName };
            var requester = (_this._authedAgent ? _this._authedAgent : request);
            var req = requester.post(_this.serverUrl + "/apps/");
            _this.attachCredentials(req, requester);
            req.set("Content-Type", "application/json;charset=UTF-8")
                .send(JSON.stringify(app))
                .end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                if (res.ok) {
                    var location = res.header["location"];
                    if (location && location.lastIndexOf("/") !== -1) {
                        app.id = location.substr(location.lastIndexOf("/") + 1);
                        resolve(app);
                    }
                    else {
                        resolve(null);
                    }
                }
                else {
                    var body = tryJSON(res.text);
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
    AccountManager.prototype.removeApp = function (app) {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var id = (typeof app === "string") ? app : app.id;
            var requester = (_this._authedAgent ? _this._authedAgent : request);
            var req = requester.del(_this.serverUrl + "/apps/" + id);
            _this.attachCredentials(req, requester);
            req.end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                if (res.ok) {
                    resolve(null);
                }
                else {
                    var body = tryJSON(res.text);
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
    AccountManager.prototype.updateApp = function (infoToChange) {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var requester = (_this._authedAgent ? _this._authedAgent : request);
            var req = requester.put(_this.serverUrl + "/apps/" + infoToChange.id);
            _this.attachCredentials(req, requester);
            req.set("Content-Type", "application/json;charset=UTF-8")
                .send(JSON.stringify(infoToChange))
                .end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                if (res.ok) {
                    resolve(null);
                }
                else {
                    var body = tryJSON(res.text);
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
    AccountManager.prototype.transferApp = function (appId, email) {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var requester = (_this._authedAgent ? _this._authedAgent : request);
            var req = requester.post(_this.serverUrl + "/apps/" + appId + "/transfer/" + email);
            _this.attachCredentials(req, requester);
            req.end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                if (res.ok) {
                    resolve(null);
                }
                else {
                    var body = tryJSON(res.text);
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
    // Collaborators
    AccountManager.prototype.getCollaboratorsList = function (appId) {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var requester = (_this._authedAgent ? _this._authedAgent : request);
            var req = requester.get(_this.serverUrl + "/apps/" + appId + "/collaborators");
            _this.attachCredentials(req, requester);
            req.end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                var body = tryJSON(res.text);
                if (res.ok) {
                    if (body) {
                        resolve(body.collaborators);
                    }
                    else {
                        reject({ message: "Could not parse response: " + res.text, statusCode: res.status });
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
    AccountManager.prototype.addCollaborator = function (appId, email) {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var requester = (_this._authedAgent ? _this._authedAgent : request);
            var req = requester.post(_this.serverUrl + "/apps/" + appId + "/collaborators/" + email);
            _this.attachCredentials(req, requester);
            req.end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                if (res.ok) {
                    resolve(null);
                }
                else {
                    var body = tryJSON(res.text);
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
    AccountManager.prototype.removeCollaborator = function (app, email) {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var id = (typeof app === "string") ? app : app.id;
            var requester = (_this._authedAgent ? _this._authedAgent : request);
            var req = requester.del(_this.serverUrl + "/apps/" + id + "/collaborators/" + email);
            _this.attachCredentials(req, requester);
            req.end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                if (res.ok) {
                    resolve(null);
                }
                else {
                    var body = tryJSON(res.text);
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
    // Deployments
    AccountManager.prototype.addDeployment = function (appId, name) {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var deployment = { name: name };
            var requester = (_this._authedAgent ? _this._authedAgent : request);
            var req = requester.post(_this.serverUrl + "/apps/" + appId + "/deployments/");
            ;
            _this.attachCredentials(req, requester);
            req.set("Content-Type", "application/json;charset=UTF-8")
                .send(JSON.stringify(deployment))
                .end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                if (res.ok) {
                    var location = res.header["location"];
                    if (location && location.lastIndexOf("/") !== -1) {
                        deployment.id = location.substr(location.lastIndexOf("/") + 1);
                        resolve(deployment);
                    }
                    else {
                        resolve(null);
                    }
                }
                else {
                    var body = tryJSON(res.text);
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
    AccountManager.prototype.getDeployments = function (appId) {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var requester = (_this._authedAgent ? _this._authedAgent : request);
            var req = requester.get(_this.serverUrl + "/apps/" + appId + "/deployments");
            _this.attachCredentials(req, requester);
            req.end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                var body = tryJSON(res.text);
                if (res.ok) {
                    if (body) {
                        resolve(body.deployments);
                    }
                    else {
                        reject({ message: "Could not parse response: " + res.text, statusCode: res.status });
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
    AccountManager.prototype.getDeployment = function (appId, deploymentId) {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var requester = (_this._authedAgent ? _this._authedAgent : request);
            var req = requester.get(_this.serverUrl + "/apps/" + appId + "/deployments/" + deploymentId);
            _this.attachCredentials(req, requester);
            req.end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                var body = tryJSON(res.text);
                if (res.ok) {
                    if (body) {
                        resolve(body.deployment);
                    }
                    else {
                        reject({ message: "Could not parse response: " + res.text, statusCode: res.status });
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
    AccountManager.prototype.getDeploymentMetrics = function (appId, deploymentId) {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var requester = (_this._authedAgent ? _this._authedAgent : request);
            var req = requester.get(_this.serverUrl + "/apps/" + appId + "/deployments/" + deploymentId + "/metrics");
            _this.attachCredentials(req, requester);
            req.end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                var body = tryJSON(res.text);
                if (res.ok) {
                    if (body) {
                        resolve(body.metrics);
                    }
                    else {
                        reject({ message: "Could not parse response: " + res.text, statusCode: res.status });
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
    AccountManager.prototype.updateDeployment = function (appId, infoToChange) {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var requester = (_this._authedAgent ? _this._authedAgent : request);
            var req = requester.put(_this.serverUrl + "/apps/" + appId + "/deployments/" + infoToChange.id);
            _this.attachCredentials(req, requester);
            req.set("Content-Type", "application/json;charset=UTF-8")
                .send(JSON.stringify(infoToChange))
                .end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                if (res.ok) {
                    resolve(null);
                }
                else {
                    var body = tryJSON(res.text);
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
    AccountManager.prototype.removeDeployment = function (appId, deployment) {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var id = (typeof deployment === "string") ? deployment : deployment.id;
            var requester = (_this._authedAgent ? _this._authedAgent : request);
            var req = requester.del(_this.serverUrl + "/apps/" + appId + "/deployments/" + id);
            _this.attachCredentials(req, requester);
            req.end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                if (res.ok) {
                    resolve(null);
                }
                else {
                    var body = tryJSON(res.text);
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
    AccountManager.prototype.getDeploymentKeys = function (appId, deploymentId) {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var requester = (_this._authedAgent ? _this._authedAgent : request);
            var req = requester.get(_this.serverUrl + "/apps/" + appId + "/deployments/" + deploymentId + "/deploymentKeys");
            _this.attachCredentials(req, requester);
            req.end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                var body = tryJSON(res.text);
                if (res.ok) {
                    if (body) {
                        resolve(body.deploymentKeys);
                    }
                    else {
                        reject({ message: "Could not parse response: " + res.text, statusCode: res.status });
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
    AccountManager.prototype.addPackage = function (appId, deploymentId, fileOrPath, description, label, appVersion, isMandatory, uploadProgressCallback) {
        var _this = this;
        if (isMandatory === void 0) { isMandatory = false; }
        return Promise(function (resolve, reject, notify) {
            var packageInfo = _this.generatePackageInfo(description, label, appVersion, isMandatory);
            var requester = (_this._authedAgent ? _this._authedAgent : request);
            var req = requester.put(_this.serverUrl + "/apps/" + appId + "/deployments/" + deploymentId + "/package");
            _this.attachCredentials(req, requester);
            var file;
            if (typeof fileOrPath === "string") {
                file = fs.createReadStream(fileOrPath);
            }
            else {
                file = fileOrPath;
            }
            req.attach("package", file)
                .field("packageInfo", JSON.stringify(packageInfo))
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
                    var body = tryJSON(res.text);
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
    AccountManager.prototype.promotePackage = function (appId, sourceDeploymentId, destDeploymentId) {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var requester = (_this._authedAgent ? _this._authedAgent : request);
            var req = requester.post(_this.serverUrl + "/apps/" + appId + "/deployments/" + sourceDeploymentId + "/promote/" + destDeploymentId);
            _this.attachCredentials(req, requester);
            req.end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                if (res.ok) {
                    resolve(null);
                }
                else {
                    var body = tryJSON(res.text);
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
    AccountManager.prototype.rollbackPackage = function (appId, deploymentId, targetRelease) {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var requester = (_this._authedAgent ? _this._authedAgent : request);
            var req = requester.post(_this.serverUrl + "/apps/" + appId + "/deployments/" + deploymentId + "/rollback/" + (targetRelease || ""));
            _this.attachCredentials(req, requester);
            req.end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                if (res.ok) {
                    resolve(null);
                }
                else {
                    var body = tryJSON(res.text);
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
    AccountManager.prototype.getPackage = function (appId, deploymentId) {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var requester = (_this._authedAgent ? _this._authedAgent : request);
            var req = requester.get(_this.serverUrl + "/apps/" + appId + "/deployments/" + deploymentId + "/package");
            _this.attachCredentials(req, requester);
            req.end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                var body = tryJSON(res.text);
                if (res.ok) {
                    if (body) {
                        resolve(body.package);
                    }
                    else {
                        reject({ message: "Could not parse response: " + res.text, statusCode: res.status });
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
    AccountManager.prototype.getPackageHistory = function (appId, deploymentId) {
        var _this = this;
        return Promise(function (resolve, reject, notify) {
            var requester = (_this._authedAgent ? _this._authedAgent : request);
            var req = requester.get(_this.serverUrl + "/apps/" + appId + "/deployments/" + deploymentId + "/packageHistory");
            _this.attachCredentials(req, requester);
            req.end(function (err, res) {
                if (err) {
                    reject({ message: _this.getErrorMessage(err, res) });
                    return;
                }
                var body = tryJSON(res.text);
                if (res.ok) {
                    if (body) {
                        resolve(body.packageHistory);
                    }
                    else {
                        reject({ message: "Could not parse response: " + res.text, statusCode: res.status });
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
    AccountManager.getLoginInfo = function (accessKey) {
        try {
            var decoded = base64.decode(accessKey);
            return tryJSON(decoded);
        }
        catch (ex) {
            return null;
        }
    };
    AccountManager.prototype.getErrorMessage = function (error, response) {
        return response && response.text ? response.text : error.message;
    };
    AccountManager.prototype.generatePackageInfo = function (description, label, appVersion, isMandatory) {
        return {
            description: description,
            label: label,
            appVersion: appVersion,
            isMandatory: isMandatory
        };
    };
    AccountManager.prototype.attachCredentials = function (request, requester) {
        if (this._saveAuthedAgent) {
            if (requester && requester.attachCookies) {
                requester.attachCookies(request);
            }
        }
        else {
            request.withCredentials();
        }
        if (this._userAgent) {
            request.set("User-Agent", this._userAgent);
        }
    };
    AccountManager.prototype.generateAccessKey = function () {
        var _this = this;
        return this.getAccountInfo().then(function () {
            var accessKey = crypto.randomBytes(21)
                .toString("base64")
                .replace(/\+/g, "_") // URL-friendly characters
                .replace(/\//g, "-")
                .concat(_this.accountId);
            return accessKey;
        });
    };
    return AccountManager;
})();
exports.AccountManager = AccountManager;
