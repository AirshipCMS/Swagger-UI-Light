/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}
/******/
/******/
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "7040ba8068e06382e565"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	var _App = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// inferno module
	if (true) {
	    __webpack_require__(12);
	}
	
	// app components
	var createVNode = _inferno2.default.createVNode;
	
	
	_inferno2.default.render(createVNode(16, _App.App), document.getElementById('app'));
	
	if (true) {
	    module.hot.accept();
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(2);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*!
	 * inferno v1.0.0-beta42
	 * (c) 2016 Dominic Gannaway
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.Inferno = global.Inferno || {});
	})(undefined, function (exports) {
	    'use strict';
	
	    var NO_OP = '$NO_OP';
	    var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
	    var isBrowser = typeof window !== 'undefined' && window.document;
	
	    // this is MUCH faster than .constructor === Array and instanceof Array
	    // in Node 7 and the later versions of V8, slower in older versions though
	    var isArray = Array.isArray;
	    function isStatefulComponent(o) {
	        return !isUndefined(o.prototype) && !isUndefined(o.prototype.render);
	    }
	    function isStringOrNumber(obj) {
	        return isString(obj) || isNumber(obj);
	    }
	    function isNullOrUndef(obj) {
	        return isUndefined(obj) || isNull(obj);
	    }
	    function isInvalid(obj) {
	        return isNull(obj) || obj === false || isTrue(obj) || isUndefined(obj);
	    }
	    function isFunction(obj) {
	        return typeof obj === 'function';
	    }
	    function isAttrAnEvent(attr) {
	        return attr[0] === 'o' && attr[1] === 'n' && attr.length > 3;
	    }
	    function isString(obj) {
	        return typeof obj === 'string';
	    }
	    function isNumber(obj) {
	        return typeof obj === 'number';
	    }
	    function isNull(obj) {
	        return obj === null;
	    }
	    function isTrue(obj) {
	        return obj === true;
	    }
	    function isUndefined(obj) {
	        return obj === undefined;
	    }
	    function isObject(o) {
	        return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object';
	    }
	    function throwError(message) {
	        if (!message) {
	            message = ERROR_MSG;
	        }
	        throw new Error("Inferno Error: " + message);
	    }
	    function warning(condition, message) {
	        if (!condition) {
	            console.error(message);
	        }
	    }
	    var EMPTY_OBJ = {};
	
	    function applyKeyIfMissing(index, vNode) {
	        if (isNull(vNode.key)) {
	            vNode.key = "." + index;
	        }
	        return vNode;
	    }
	    function _normalizeVNodes(nodes, result, i) {
	        for (; i < nodes.length; i++) {
	            var n = nodes[i];
	            if (!isInvalid(n)) {
	                if (Array.isArray(n)) {
	                    _normalizeVNodes(n, result, 0);
	                } else {
	                    if (isStringOrNumber(n)) {
	                        n = createTextVNode(n);
	                    } else if (isVNode(n) && n.dom) {
	                        n = cloneVNode(n);
	                    }
	                    result.push(applyKeyIfMissing(i, n));
	                }
	            }
	        }
	    }
	    function normalizeVNodes(nodes) {
	        var newNodes;
	        // we assign $ which basically means we've flagged this array for future note
	        // if it comes back again, we need to clone it, as people are using it
	        // in an immutable way
	        // tslint:disable
	        if (nodes['$']) {
	            nodes = nodes.slice();
	        } else {
	            nodes['$'] = true;
	        }
	        // tslint:enable
	        for (var i = 0; i < nodes.length; i++) {
	            var n = nodes[i];
	            if (isInvalid(n) || Array.isArray(n)) {
	                var result = (newNodes || nodes).slice(0, i);
	                _normalizeVNodes(nodes, result, i);
	                return result;
	            } else if (isStringOrNumber(n)) {
	                if (!newNodes) {
	                    newNodes = nodes.slice(0, i);
	                }
	                newNodes.push(applyKeyIfMissing(i, createTextVNode(n)));
	            } else if (isVNode(n) && n.dom || isNull(n.key) && !(n.flags & 64 /* HasNonKeyedChildren */)) {
	                if (!newNodes) {
	                    newNodes = nodes.slice(0, i);
	                }
	                newNodes.push(applyKeyIfMissing(i, cloneVNode(n)));
	            } else if (newNodes) {
	                newNodes.push(applyKeyIfMissing(i, cloneVNode(n)));
	            }
	        }
	        return newNodes || nodes;
	    }
	    function normalizeChildren(children) {
	        if (isArray(children)) {
	            return normalizeVNodes(children);
	        } else if (isVNode(children) && children.dom) {
	            return cloneVNode(children);
	        }
	        return children;
	    }
	    function normalizeProps(vNode, props, children) {
	        if (!(vNode.flags & 28 /* Component */) && isNullOrUndef(children) && !isNullOrUndef(props.children)) {
	            vNode.children = props.children;
	        }
	        if (props.ref) {
	            vNode.ref = props.ref;
	        }
	        if (props.events) {
	            vNode.events = props.events;
	        }
	        if (!isNullOrUndef(props.key)) {
	            vNode.key = props.key;
	        }
	    }
	    function copyPropsTo(copyFrom, copyTo) {
	        for (var prop in copyFrom) {
	            if (isUndefined(copyTo[prop])) {
	                copyTo[prop] = copyFrom[prop];
	            }
	        }
	    }
	    function normalizeElement(type, vNode) {
	        if (type === 'svg') {
	            vNode.flags = 128 /* SvgElement */;
	        } else if (type === 'input') {
	            vNode.flags = 512 /* InputElement */;
	        } else if (type === 'select') {
	            vNode.flags = 2048 /* SelectElement */;
	        } else if (type === 'textarea') {
	            vNode.flags = 1024 /* TextareaElement */;
	        } else if (type === 'media') {
	            vNode.flags = 256 /* MediaElement */;
	        } else {
	            vNode.flags = 2 /* HtmlElement */;
	        }
	    }
	    function normalize(vNode) {
	        var props = vNode.props;
	        var type = vNode.type;
	        var children = vNode.children;
	        // convert a wrongly created type back to element
	        if (isString(type) && vNode.flags & 28 /* Component */) {
	            normalizeElement(type, vNode);
	            if (props.children) {
	                vNode.children = props.children;
	                children = props.children;
	            }
	        }
	        if (props) {
	            normalizeProps(vNode, props, children);
	        }
	        if (!isInvalid(children)) {
	            vNode.children = normalizeChildren(children);
	        }
	        if (props && !isInvalid(props.children)) {
	            props.children = normalizeChildren(props.children);
	        }
	    }
	
	    var options = {
	        recyclingEnabled: true,
	        findDOMNodeEnabled: false,
	        roots: null,
	        createVNode: null,
	        beforeRender: null,
	        afterRender: null,
	        afterMount: null,
	        afterUpdate: null,
	        beforeUnmount: null
	    };
	
	    function createVNode(flags, type, props, children, events, key, ref, noNormalise) {
	        if (flags & 16 /* ComponentUnknown */) {
	                flags = isStatefulComponent(type) ? 4 /* ComponentClass */ : 8 /* ComponentFunction */;
	            }
	        var vNode = {
	            children: isUndefined(children) ? null : children,
	            dom: null,
	            events: events || null,
	            flags: flags || 0,
	            key: key === undefined ? null : key,
	            props: props || null,
	            ref: ref || null,
	            type: type
	        };
	        if (!noNormalise) {
	            normalize(vNode);
	        }
	        if (options.createVNode) {
	            options.createVNode(vNode);
	        }
	        return vNode;
	    }
	    function cloneVNode(vNodeToClone, props) {
	        var _children = [],
	            len = arguments.length - 2;
	        while (len-- > 0) {
	            _children[len] = arguments[len + 2];
	        }var children = _children;
	        if (_children.length > 0 && !isNull(_children[0])) {
	            if (!props) {
	                props = {};
	            }
	            if (_children.length === 1) {
	                children = _children[0];
	            }
	            if (isUndefined(props.children)) {
	                props.children = children;
	            } else {
	                if (isArray(children)) {
	                    if (isArray(props.children)) {
	                        props.children = props.children.concat(children);
	                    } else {
	                        props.children = [props.children].concat(children);
	                    }
	                } else {
	                    if (isArray(props.children)) {
	                        props.children.push(children);
	                    } else {
	                        props.children = [props.children];
	                        props.children.push(children);
	                    }
	                }
	            }
	        }
	        children = null;
	        var flags = vNodeToClone.flags;
	        var events = vNodeToClone.events || props && props.events || null;
	        var newVNode;
	        if (isArray(vNodeToClone)) {
	            newVNode = vNodeToClone.map(function (vNode) {
	                return cloneVNode(vNode);
	            });
	        } else if (isNullOrUndef(props) && isNullOrUndef(children)) {
	            newVNode = Object.assign({}, vNodeToClone);
	        } else {
	            var key = !isNullOrUndef(vNodeToClone.key) ? vNodeToClone.key : props.key;
	            var ref = vNodeToClone.ref || props.ref;
	            if (flags & 28 /* Component */) {
	                    newVNode = createVNode(flags, vNodeToClone.type, Object.assign({}, vNodeToClone.props, props), null, events, key, ref, true);
	                } else if (flags & 3970 /* Element */) {
	                    children = props && props.children || vNodeToClone.children;
	                    newVNode = createVNode(flags, vNodeToClone.type, Object.assign({}, vNodeToClone.props, props), children, events, key, ref, !children);
	                }
	        }
	        if (flags & 28 /* Component */) {
	                var newProps = newVNode.props;
	                if (newProps) {
	                    var newChildren = newProps.children;
	                    // we need to also clone component children that are in props
	                    // as the children may also have been hoisted
	                    if (newChildren) {
	                        if (isArray(newChildren)) {
	                            for (var i = 0; i < newChildren.length; i++) {
	                                var child = newChildren[i];
	                                if (!isInvalid(child) && isVNode(child)) {
	                                    newProps.children[i] = cloneVNode(child);
	                                }
	                            }
	                        } else if (isVNode(newChildren)) {
	                            newProps.children = cloneVNode(newChildren);
	                        }
	                    }
	                }
	                newVNode.children = null;
	            }
	        newVNode.dom = null;
	        return newVNode;
	    }
	    function createVoidVNode() {
	        return createVNode(4096 /* Void */);
	    }
	    function createTextVNode(text) {
	        return createVNode(1 /* Text */, null, null, text);
	    }
	    function isVNode(o) {
	        return !!o.flags;
	    }
	
	    var Lifecycle = function Lifecycle() {
	        this.listeners = [];
	        this.fastUnmount = true;
	    };
	    Lifecycle.prototype.addListener = function addListener(callback) {
	        this.listeners.push(callback);
	    };
	    Lifecycle.prototype.trigger = function trigger() {
	        var this$1 = this;
	
	        for (var i = 0; i < this.listeners.length; i++) {
	            this$1.listeners[i]();
	        }
	    };
	
	    function constructDefaults(string, object, value) {
	        /* eslint no-return-assign: 0 */
	        string.split(',').forEach(function (i) {
	            return object[i] = value;
	        });
	    }
	    var xlinkNS = 'http://www.w3.org/1999/xlink';
	    var xmlNS = 'http://www.w3.org/XML/1998/namespace';
	    var svgNS = 'http://www.w3.org/2000/svg';
	    var strictProps = {};
	    var booleanProps = {};
	    var namespaces = {};
	    var isUnitlessNumber = {};
	    var skipProps = {};
	    var dehyphenProps = {
	        httpEquiv: 'http-equiv',
	        acceptCharset: 'accept-charset'
	    };
	    var probablyKebabProps = /^(accentH|arabicF|capH|font[FSVW]|glyph[NO]|horiz[AO]|panose1|renderingI|strikethrough[PT]|underline[PT]|v[AHIM]|vert[AO]|xH|alignmentB|baselineS|clip[PR]|color[IPR]|dominantB|enableB|fill[OR]|flood[COF]|imageR|letterS|lightingC|marker[EMS]|pointerE|shapeR|stop[CO]|stroke[DLMOW]|text[ADR]|unicodeB|wordS|writingM).*/;
	    function kebabize(str, smallLetter, largeLetter) {
	        return smallLetter + "-" + largeLetter.toLowerCase();
	    }
	    var delegatedProps = {};
	    constructDefaults('xlink:href,xlink:arcrole,xlink:actuate,xlink:role,xlink:titlef,xlink:type', namespaces, xlinkNS);
	    constructDefaults('xml:base,xml:lang,xml:space', namespaces, xmlNS);
	    constructDefaults('volume,defaultValue,defaultChecked', strictProps, true);
	    constructDefaults('children,ref,key,selected,checked,value,multiple', skipProps, true);
	    constructDefaults('onClick,onMouseDown,onMouseUp,onMouseMove,onSubmit,onDblClick,onKeyDown,onKeyUp,onKeyPress', delegatedProps, true);
	    constructDefaults('muted,scoped,loop,open,checked,default,capture,disabled,readOnly,required,autoplay,controls,seamless,reversed,allowfullscreen,novalidate', booleanProps, true);
	    constructDefaults('animationIterationCount,borderImageOutset,borderImageSlice,borderImageWidth,boxFlex,boxFlexGroup,boxOrdinalGroup,columnCount,flex,flexGrow,flexPositive,flexShrink,flexNegative,flexOrder,gridRow,gridColumn,fontWeight,lineClamp,lineHeight,opacity,order,orphans,tabSize,widows,zIndex,zoom,fillOpacity,floodOpacity,stopOpacity,strokeDasharray,strokeDashoffset,strokeMiterlimit,strokeOpacity,strokeWidth,', isUnitlessNumber, true);
	
	    var delegatedEvents = new Map();
	    function handleEvent(name, lastEvent, nextEvent, dom) {
	        var delegatedRoots = delegatedEvents.get(name);
	        if (nextEvent) {
	            if (!delegatedRoots) {
	                delegatedRoots = { items: new Map(), count: 0, docEvent: null };
	                var docEvent = attachEventToDocument(name, delegatedRoots);
	                delegatedRoots.docEvent = docEvent;
	                delegatedEvents.set(name, delegatedRoots);
	            }
	            if (!lastEvent) {
	                delegatedRoots.count++;
	            }
	            delegatedRoots.items.set(dom, nextEvent);
	        } else if (delegatedRoots) {
	            if (delegatedRoots.items.has(dom)) {
	                delegatedRoots.count--;
	                delegatedRoots.items.delete(dom);
	                if (delegatedRoots.count === 0) {
	                    document.removeEventListener(normalizeEventName(name), delegatedRoots.docEvent);
	                    delegatedEvents.delete(name);
	                }
	            }
	        }
	    }
	    function dispatchEvent(event, dom, items, count, eventData) {
	        var eventsToTrigger = items.get(dom);
	        if (eventsToTrigger) {
	            count--;
	            // linkEvent object
	            eventData.dom = dom;
	            if (eventsToTrigger.event) {
	                eventsToTrigger.event(eventsToTrigger.data, event);
	            } else {
	                eventsToTrigger(event);
	            }
	            if (eventData.stopPropagation) {
	                return;
	            }
	        }
	        var parentDom = dom.parentNode;
	        if (count > 0 && (parentDom || parentDom === document.body)) {
	            dispatchEvent(event, parentDom, items, count, eventData);
	        }
	    }
	    function normalizeEventName(name) {
	        return name.substr(2).toLowerCase();
	    }
	    function attachEventToDocument(name, delegatedRoots) {
	        var docEvent = function docEvent(event) {
	            var eventData = {
	                stopPropagation: false,
	                dom: document
	            };
	            // we have to do this as some browsers recycle the same Event between calls
	            // so we need to make the property configurable
	            Object.defineProperty(event, 'currentTarget', {
	                configurable: true,
	                get: function get() {
	                    return eventData.dom;
	                }
	            });
	            event.stopPropagation = function () {
	                eventData.stopPropagation = true;
	            };
	            var count = delegatedRoots.count;
	            if (count > 0) {
	                dispatchEvent(event, event.target, delegatedRoots.items, count, eventData);
	            }
	        };
	        document.addEventListener(normalizeEventName(name), docEvent);
	        return docEvent;
	    }
	
	    function isCheckedType(type) {
	        return type === 'checkbox' || type === 'radio';
	    }
	    function isControlled(props) {
	        var usesChecked = isCheckedType(props.type);
	        return usesChecked ? !isNullOrUndef(props.checked) : !isNullOrUndef(props.value);
	    }
	    function onTextInputChange(e) {
	        var vNode = this.vNode;
	        var events = vNode.events || EMPTY_OBJ;
	        var dom = vNode.dom;
	        if (events.onInput) {
	            var event = events.onInput;
	            if (event.event) {
	                event.event(event.data, e);
	            } else {
	                event(e);
	            }
	        } else if (events.oninput) {
	            events.oninput(e);
	        }
	        // the user may have updated the vNode from the above onInput events
	        // so we need to get it from the context of `this` again
	        applyValue(this.vNode, dom);
	    }
	    function wrappedOnChange(e) {
	        var vNode = this.vNode;
	        var events = vNode.events || EMPTY_OBJ;
	        var event = events.onChange;
	        if (event.event) {
	            event.event(event.data, e);
	        } else {
	            event(e);
	        }
	    }
	    function onCheckboxChange(e) {
	        var vNode = this.vNode;
	        var events = vNode.events || EMPTY_OBJ;
	        var dom = vNode.dom;
	        if (events.onClick) {
	            var event = events.onClick;
	            if (event.event) {
	                event.event(event.data, e);
	            } else {
	                event(e);
	            }
	        } else if (events.onclick) {
	            events.onclick(e);
	        }
	        // the user may have updated the vNode from the above onClick events
	        // so we need to get it from the context of `this` again
	        applyValue(this.vNode, dom);
	    }
	    function handleAssociatedRadioInputs(name) {
	        var inputs = document.querySelectorAll("input[type=\"radio\"][name=\"" + name + "\"]");
	        [].forEach.call(inputs, function (dom) {
	            var inputWrapper = wrappers.get(dom);
	            if (inputWrapper) {
	                var props = inputWrapper.vNode.props;
	                if (props) {
	                    dom.checked = inputWrapper.vNode.props.checked;
	                }
	            }
	        });
	    }
	    function processInput(vNode, dom) {
	        var props = vNode.props || EMPTY_OBJ;
	        applyValue(vNode, dom);
	        if (isControlled(props)) {
	            var inputWrapper = wrappers.get(dom);
	            if (!inputWrapper) {
	                inputWrapper = {
	                    vNode: vNode
	                };
	                if (isCheckedType(props.type)) {
	                    dom.onclick = onCheckboxChange.bind(inputWrapper);
	                    dom.onclick.wrapped = true;
	                } else {
	                    dom.oninput = onTextInputChange.bind(inputWrapper);
	                    dom.oninput.wrapped = true;
	                }
	                if (props.onChange) {
	                    dom.onchange = wrappedOnChange.bind(inputWrapper);
	                    dom.onchange.wrapped = true;
	                }
	                wrappers.set(dom, inputWrapper);
	            }
	            inputWrapper.vNode = vNode;
	        }
	    }
	    function applyValue(vNode, dom) {
	        var props = vNode.props || EMPTY_OBJ;
	        var type = props.type;
	        var value = props.value;
	        var checked = props.checked;
	        var multiple = props.multiple;
	        if (type && type !== dom.type) {
	            dom.type = type;
	        }
	        if (multiple && multiple !== dom.multiple) {
	            dom.multiple = multiple;
	        }
	        if (isCheckedType(type)) {
	            if (!isNullOrUndef(value)) {
	                dom.value = value;
	            }
	            dom.checked = checked;
	            if (type === 'radio' && props.name) {
	                handleAssociatedRadioInputs(props.name);
	            }
	        } else {
	            if (!isNullOrUndef(value) && dom.value !== value) {
	                dom.value = value;
	            } else if (!isNullOrUndef(checked)) {
	                dom.checked = checked;
	            }
	        }
	    }
	
	    function isControlled$1(props) {
	        return !isNullOrUndef(props.value);
	    }
	    function updateChildOption(vNode, value) {
	        var props = vNode.props || EMPTY_OBJ;
	        var dom = vNode.dom;
	        // we do this as multiple may have changed
	        dom.value = props.value;
	        if (isArray(value) && value.indexOf(props.value) !== -1 || props.value === value) {
	            dom.selected = true;
	        } else {
	            dom.selected = props.selected || false;
	        }
	    }
	    function onSelectChange(e) {
	        var vNode = this.vNode;
	        var events = vNode.events || EMPTY_OBJ;
	        var dom = vNode.dom;
	        if (events.onChange) {
	            var event = events.onChange;
	            if (event.event) {
	                event.event(event.data, e);
	            } else {
	                event(e);
	            }
	        } else if (events.onchange) {
	            events.onchange(e);
	        }
	        // the user may have updated the vNode from the above onChange events
	        // so we need to get it from the context of `this` again
	        applyValue$1(this.vNode, dom);
	    }
	    function processSelect(vNode, dom) {
	        var props = vNode.props || EMPTY_OBJ;
	        applyValue$1(vNode, dom);
	        if (isControlled$1(props)) {
	            var selectWrapper = wrappers.get(dom);
	            if (!selectWrapper) {
	                selectWrapper = {
	                    vNode: vNode
	                };
	                dom.onchange = onSelectChange.bind(selectWrapper);
	                dom.onchange.wrapped = true;
	                wrappers.set(dom, selectWrapper);
	            }
	            selectWrapper.vNode = vNode;
	        }
	    }
	    function applyValue$1(vNode, dom) {
	        var props = vNode.props || EMPTY_OBJ;
	        if (props.multiple !== dom.multiple) {
	            dom.multiple = props.multiple;
	        }
	        var children = vNode.children;
	        var value = props.value;
	        if (isArray(children)) {
	            for (var i = 0; i < children.length; i++) {
	                updateChildOption(children[i], value);
	            }
	        } else if (isVNode(children)) {
	            updateChildOption(children, value);
	        }
	    }
	
	    function isControlled$2(props) {
	        return !isNullOrUndef(props.value);
	    }
	    function onTextareaInputChange(e) {
	        var vNode = this.vNode;
	        var events = vNode.events || EMPTY_OBJ;
	        var dom = vNode.dom;
	        if (events.onInput) {
	            var event = events.onInput;
	            if (event.event) {
	                event.event(event.data, e);
	            } else {
	                event(e);
	            }
	        } else if (events.oninput) {
	            events.oninput(e);
	        }
	        // the user may have updated the vNode from the above onInput events
	        // so we need to get it from the context of `this` again
	        applyValue$2(this.vNode, dom);
	    }
	    function processTextarea(vNode, dom) {
	        var props = vNode.props || EMPTY_OBJ;
	        applyValue$2(vNode, dom);
	        var textareaWrapper = wrappers.get(dom);
	        if (isControlled$2(props)) {
	            if (!textareaWrapper) {
	                textareaWrapper = {
	                    vNode: vNode
	                };
	                dom.oninput = onTextareaInputChange.bind(textareaWrapper);
	                dom.oninput.wrapped = true;
	                wrappers.set(dom, textareaWrapper);
	            }
	            textareaWrapper.vNode = vNode;
	        }
	    }
	    function applyValue$2(vNode, dom) {
	        var props = vNode.props || EMPTY_OBJ;
	        var value = props.value;
	        if (dom.value !== value) {
	            if (!isNullOrUndef(value)) {
	                dom.value = value;
	            }
	        }
	    }
	
	    var wrappers = new Map();
	    function processElement(flags, vNode, dom) {
	        if (flags & 512 /* InputElement */) {
	                processInput(vNode, dom);
	            } else if (flags & 2048 /* SelectElement */) {
	                processSelect(vNode, dom);
	            } else if (flags & 1024 /* TextareaElement */) {
	                processTextarea(vNode, dom);
	            }
	    }
	
	    function unmount(vNode, parentDom, lifecycle, canRecycle, shallowUnmount, isRecycling) {
	        var flags = vNode.flags;
	        if (flags & 28 /* Component */) {
	                unmountComponent(vNode, parentDom, lifecycle, canRecycle, shallowUnmount, isRecycling);
	            } else if (flags & 3970 /* Element */) {
	                unmountElement(vNode, parentDom, lifecycle, canRecycle, shallowUnmount, isRecycling);
	            } else if (flags & (1 /* Text */ | 4096 /* Void */)) {
	            unmountVoidOrText(vNode, parentDom);
	        }
	    }
	    function unmountVoidOrText(vNode, parentDom) {
	        if (parentDom) {
	            removeChild(parentDom, vNode.dom);
	        }
	    }
	    function unmountComponent(vNode, parentDom, lifecycle, canRecycle, shallowUnmount, isRecycling) {
	        var instance = vNode.children;
	        var flags = vNode.flags;
	        var isStatefulComponent$$1 = flags & 4;
	        var ref = vNode.ref;
	        var dom = vNode.dom;
	        if (!isRecycling) {
	            if (isStatefulComponent$$1) {
	                instance._ignoreSetState = true;
	                options.beforeUnmount && options.beforeUnmount(vNode);
	                instance.componentWillUnmount && instance.componentWillUnmount();
	                if (ref && !isRecycling) {
	                    ref(null);
	                }
	                instance._unmounted = true;
	                options.findDOMNodeEnabled && componentToDOMNodeMap.delete(instance);
	            } else if (!isNullOrUndef(ref)) {
	                if (!isNullOrUndef(ref.onComponentWillUnmount)) {
	                    ref.onComponentWillUnmount(dom);
	                }
	            }
	            if (!shallowUnmount) {
	                if (isStatefulComponent$$1) {
	                    var subLifecycle = instance._lifecycle;
	                    if (!subLifecycle.fastUnmount) {
	                        unmount(instance._lastInput, null, subLifecycle, false, shallowUnmount, isRecycling);
	                    }
	                } else {
	                    if (!lifecycle.fastUnmount) {
	                        unmount(instance, null, lifecycle, false, shallowUnmount, isRecycling);
	                    }
	                }
	            }
	        }
	        if (parentDom) {
	            var lastInput = instance._lastInput;
	            if (isNullOrUndef(lastInput)) {
	                lastInput = instance;
	            }
	            removeChild(parentDom, dom);
	        }
	        if (options.recyclingEnabled && !isStatefulComponent$$1 && (parentDom || canRecycle)) {
	            poolComponent(vNode);
	        }
	    }
	    function unmountElement(vNode, parentDom, lifecycle, canRecycle, shallowUnmount, isRecycling) {
	        var dom = vNode.dom;
	        var ref = vNode.ref;
	        var events = vNode.events;
	        if (!shallowUnmount && !lifecycle.fastUnmount) {
	            if (ref && !isRecycling) {
	                unmountRef(ref);
	            }
	            var children = vNode.children;
	            if (!isNullOrUndef(children)) {
	                unmountChildren$1(children, lifecycle, shallowUnmount, isRecycling);
	            }
	        }
	        if (!isNull(events)) {
	            for (var name in events) {
	                // do not add a hasOwnProperty check here, it affects performance
	                patchEvent(name, events[name], null, dom, lifecycle);
	                events[name] = null;
	            }
	        }
	        if (parentDom) {
	            removeChild(parentDom, dom);
	        }
	        if (options.recyclingEnabled && (parentDom || canRecycle)) {
	            poolElement(vNode);
	        }
	    }
	    function unmountChildren$1(children, lifecycle, shallowUnmount, isRecycling) {
	        if (isArray(children)) {
	            for (var i = 0; i < children.length; i++) {
	                var child = children[i];
	                if (!isInvalid(child) && isObject(child)) {
	                    unmount(child, null, lifecycle, false, shallowUnmount, isRecycling);
	                }
	            }
	        } else if (isObject(children)) {
	            unmount(children, null, lifecycle, false, shallowUnmount, isRecycling);
	        }
	    }
	    function unmountRef(ref) {
	        if (isFunction(ref)) {
	            ref(null);
	        } else {
	            if (isInvalid(ref)) {
	                return;
	            }
	            if (process.env.NODE_ENV !== 'production') {
	                throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
	            }
	            throwError();
	        }
	    }
	
	    function patch(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
	        if (lastVNode !== nextVNode) {
	            var lastFlags = lastVNode.flags;
	            var nextFlags = nextVNode.flags;
	            if (nextFlags & 28 /* Component */) {
	                    if (lastFlags & 28 /* Component */) {
	                            patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, nextFlags & 4 /* ComponentClass */, isRecycling);
	                        } else {
	                        replaceVNode(parentDom, mountComponent(nextVNode, null, lifecycle, context, isSVG, nextFlags & 4 /* ComponentClass */), lastVNode, lifecycle, isRecycling);
	                    }
	                } else if (nextFlags & 3970 /* Element */) {
	                    if (lastFlags & 3970 /* Element */) {
	                            patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
	                        } else {
	                        replaceVNode(parentDom, mountElement(nextVNode, null, lifecycle, context, isSVG), lastVNode, lifecycle, isRecycling);
	                    }
	                } else if (nextFlags & 1 /* Text */) {
	                    if (lastFlags & 1 /* Text */) {
	                            patchText(lastVNode, nextVNode);
	                        } else {
	                        replaceVNode(parentDom, mountText(nextVNode, null), lastVNode, lifecycle, isRecycling);
	                    }
	                } else if (nextFlags & 4096 /* Void */) {
	                    if (lastFlags & 4096 /* Void */) {
	                            patchVoid(lastVNode, nextVNode);
	                        } else {
	                        replaceVNode(parentDom, mountVoid(nextVNode, null), lastVNode, lifecycle, isRecycling);
	                    }
	                } else {
	                // Error case: mount new one replacing old one
	                replaceLastChildAndUnmount(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
	            }
	        }
	    }
	    function unmountChildren(children, dom, lifecycle, isRecycling) {
	        if (isVNode(children)) {
	            unmount(children, dom, lifecycle, true, false, isRecycling);
	        } else if (isArray(children)) {
	            removeAllChildren(dom, children, lifecycle, false, isRecycling);
	        } else {
	            dom.textContent = '';
	        }
	    }
	    function patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
	        var nextTag = nextVNode.type;
	        var lastTag = lastVNode.type;
	        if (lastTag !== nextTag) {
	            replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
	        } else {
	            var dom = lastVNode.dom;
	            var lastProps = lastVNode.props;
	            var nextProps = nextVNode.props;
	            var lastChildren = lastVNode.children;
	            var nextChildren = nextVNode.children;
	            var lastFlags = lastVNode.flags;
	            var nextFlags = nextVNode.flags;
	            var lastRef = lastVNode.ref;
	            var nextRef = nextVNode.ref;
	            var lastEvents = lastVNode.events;
	            var nextEvents = nextVNode.events;
	            nextVNode.dom = dom;
	            if (isSVG || nextFlags & 128 /* SvgElement */) {
	                isSVG = true;
	            }
	            if (lastChildren !== nextChildren) {
	                patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
	            }
	            if (!(nextFlags & 2 /* HtmlElement */)) {
	                processElement(nextFlags, nextVNode, dom);
	            }
	            if (lastProps !== nextProps) {
	                patchProps(lastProps, nextProps, dom, lifecycle, context, isSVG);
	            }
	            if (lastEvents !== nextEvents) {
	                patchEvents(lastEvents, nextEvents, dom, lifecycle);
	            }
	            if (nextRef) {
	                if (lastRef !== nextRef || isRecycling) {
	                    mountRef(dom, nextRef, lifecycle);
	                }
	            }
	        }
	    }
	    function patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling) {
	        var patchArray = false;
	        var patchKeyed = false;
	        if (nextFlags & 64 /* HasNonKeyedChildren */) {
	                patchArray = true;
	            } else if (lastFlags & 32 /* HasKeyedChildren */ && nextFlags & 32 /* HasKeyedChildren */) {
	            patchKeyed = true;
	            patchArray = true;
	        } else if (isInvalid(nextChildren)) {
	            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
	        } else if (isInvalid(lastChildren)) {
	            if (isStringOrNumber(nextChildren)) {
	                setTextContent(dom, nextChildren);
	            } else {
	                if (isArray(nextChildren)) {
	                    mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
	                } else {
	                    mount(nextChildren, dom, lifecycle, context, isSVG);
	                }
	            }
	        } else if (isStringOrNumber(nextChildren)) {
	            if (isStringOrNumber(lastChildren)) {
	                updateTextContent(dom, nextChildren);
	            } else {
	                unmountChildren(lastChildren, dom, lifecycle, isRecycling);
	                setTextContent(dom, nextChildren);
	            }
	        } else if (isArray(nextChildren)) {
	            if (isArray(lastChildren)) {
	                patchArray = true;
	                if (isKeyed(lastChildren, nextChildren)) {
	                    patchKeyed = true;
	                }
	            } else {
	                unmountChildren(lastChildren, dom, lifecycle, isRecycling);
	                mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
	            }
	        } else if (isArray(lastChildren)) {
	            removeAllChildren(dom, lastChildren, lifecycle, false, isRecycling);
	            mount(nextChildren, dom, lifecycle, context, isSVG);
	        } else if (isVNode(nextChildren)) {
	            if (isVNode(lastChildren)) {
	                patch(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
	            } else {
	                unmountChildren(lastChildren, dom, lifecycle, isRecycling);
	                mount(nextChildren, dom, lifecycle, context, isSVG);
	            }
	        } else if (isVNode(lastChildren)) {} else {}
	        if (patchArray) {
	            if (patchKeyed) {
	                patchKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
	            } else {
	                patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
	            }
	        }
	    }
	    function patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isClass, isRecycling) {
	        var lastType = lastVNode.type;
	        var nextType = nextVNode.type;
	        var nextProps = nextVNode.props || EMPTY_OBJ;
	        var lastKey = lastVNode.key;
	        var nextKey = nextVNode.key;
	        var defaultProps = nextType.defaultProps;
	        if (!isUndefined(defaultProps)) {
	            copyPropsTo(defaultProps, nextProps);
	            nextVNode.props = nextProps;
	        }
	        if (lastType !== nextType) {
	            if (isClass) {
	                replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
	            } else {
	                var lastInput = lastVNode.children._lastInput || lastVNode.children;
	                var nextInput = createFunctionalComponentInput(nextVNode, nextType, nextProps, context);
	                patch(lastInput, nextInput, parentDom, lifecycle, context, isSVG, isRecycling);
	                var dom = nextVNode.dom = nextInput.dom;
	                nextVNode.children = nextInput;
	                mountFunctionalComponentCallbacks(nextVNode.ref, dom, lifecycle);
	                unmount(lastVNode, null, lifecycle, false, true, isRecycling);
	            }
	        } else {
	            if (isClass) {
	                if (lastKey !== nextKey) {
	                    replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
	                    return false;
	                }
	                var instance = lastVNode.children;
	                if (instance._unmounted) {
	                    if (isNull(parentDom)) {
	                        return true;
	                    }
	                    replaceChild(parentDom, mountComponent(nextVNode, null, lifecycle, context, isSVG, nextVNode.flags & 4 /* ComponentClass */), lastVNode.dom);
	                } else {
	                    var lastState = instance.state;
	                    var nextState = instance.state;
	                    var lastProps = instance.props;
	                    var childContext = instance.getChildContext();
	                    nextVNode.children = instance;
	                    instance._isSVG = isSVG;
	                    if (!isNullOrUndef(childContext)) {
	                        childContext = Object.assign({}, context, childContext);
	                    } else {
	                        childContext = context;
	                    }
	                    var lastInput$1 = instance._lastInput;
	                    var nextInput$1 = instance._updateComponent(lastState, nextState, lastProps, nextProps, context, false);
	                    var didUpdate = true;
	                    instance._childContext = childContext;
	                    if (isInvalid(nextInput$1)) {
	                        nextInput$1 = createVoidVNode();
	                    } else if (nextInput$1 === NO_OP) {
	                        nextInput$1 = lastInput$1;
	                        didUpdate = false;
	                    } else if (isStringOrNumber(nextInput$1)) {
	                        nextInput$1 = createTextVNode(nextInput$1);
	                    } else if (isArray(nextInput$1)) {
	                        if (process.env.NODE_ENV !== 'production') {
	                            throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
	                        }
	                        throwError();
	                    } else if (isObject(nextInput$1) && nextInput$1.dom) {
	                        nextInput$1 = cloneVNode(nextInput$1);
	                    }
	                    if (nextInput$1.flags & 28 /* Component */) {
	                            nextInput$1.parentVNode = nextVNode;
	                        } else if (lastInput$1.flags & 28 /* Component */) {
	                            lastInput$1.parentVNode = nextVNode;
	                        }
	                    instance._lastInput = nextInput$1;
	                    instance._vNode = nextVNode;
	                    if (didUpdate) {
	                        var fastUnmount = lifecycle.fastUnmount;
	                        var subLifecycle = instance._lifecycle;
	                        lifecycle.fastUnmount = subLifecycle.fastUnmount;
	                        patch(lastInput$1, nextInput$1, parentDom, lifecycle, childContext, isSVG, isRecycling);
	                        subLifecycle.fastUnmount = lifecycle.fastUnmount;
	                        lifecycle.fastUnmount = fastUnmount;
	                        instance.componentDidUpdate(lastProps, lastState);
	                        options.afterUpdate && options.afterUpdate(nextVNode);
	                        options.findDOMNodeEnabled && componentToDOMNodeMap.set(instance, nextInput$1.dom);
	                    }
	                    nextVNode.dom = nextInput$1.dom;
	                }
	            } else {
	                var shouldUpdate = true;
	                var lastProps$1 = lastVNode.props;
	                var nextHooks = nextVNode.ref;
	                var nextHooksDefined = !isNullOrUndef(nextHooks);
	                var lastInput$2 = lastVNode.children;
	                var nextInput$2 = lastInput$2;
	                nextVNode.dom = lastVNode.dom;
	                nextVNode.children = lastInput$2;
	                if (lastKey !== nextKey) {
	                    shouldUpdate = true;
	                } else {
	                    if (nextHooksDefined && !isNullOrUndef(nextHooks.onComponentShouldUpdate)) {
	                        shouldUpdate = nextHooks.onComponentShouldUpdate(lastProps$1, nextProps);
	                    }
	                }
	                if (shouldUpdate !== false) {
	                    if (nextHooksDefined && !isNullOrUndef(nextHooks.onComponentWillUpdate)) {
	                        nextHooks.onComponentWillUpdate(lastProps$1, nextProps);
	                    }
	                    nextInput$2 = nextType(nextProps, context);
	                    if (isInvalid(nextInput$2)) {
	                        nextInput$2 = createVoidVNode();
	                    } else if (isStringOrNumber(nextInput$2) && nextInput$2 !== NO_OP) {
	                        nextInput$2 = createTextVNode(nextInput$2);
	                    } else if (isArray(nextInput$2)) {
	                        if (process.env.NODE_ENV !== 'production') {
	                            throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
	                        }
	                        throwError();
	                    } else if (isObject(nextInput$2) && nextInput$2.dom) {
	                        nextInput$2 = cloneVNode(nextInput$2);
	                    }
	                    if (nextInput$2 !== NO_OP) {
	                        patch(lastInput$2, nextInput$2, parentDom, lifecycle, context, isSVG, isRecycling);
	                        nextVNode.children = nextInput$2;
	                        if (nextHooksDefined && !isNullOrUndef(nextHooks.onComponentDidUpdate)) {
	                            nextHooks.onComponentDidUpdate(lastProps$1, nextProps);
	                        }
	                        nextVNode.dom = nextInput$2.dom;
	                    }
	                }
	                if (nextInput$2.flags & 28 /* Component */) {
	                        nextInput$2.parentVNode = nextVNode;
	                    } else if (lastInput$2.flags & 28 /* Component */) {
	                        lastInput$2.parentVNode = nextVNode;
	                    }
	            }
	        }
	        return false;
	    }
	    function patchText(lastVNode, nextVNode) {
	        var nextText = nextVNode.children;
	        var dom = lastVNode.dom;
	        nextVNode.dom = dom;
	        if (lastVNode.children !== nextText) {
	            dom.nodeValue = nextText;
	        }
	    }
	    function patchVoid(lastVNode, nextVNode) {
	        nextVNode.dom = lastVNode.dom;
	    }
	    function patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling) {
	        var lastChildrenLength = lastChildren.length;
	        var nextChildrenLength = nextChildren.length;
	        var commonLength = lastChildrenLength > nextChildrenLength ? nextChildrenLength : lastChildrenLength;
	        var i = 0;
	        for (; i < commonLength; i++) {
	            var nextChild = nextChildren[i];
	            if (nextChild.dom) {
	                nextChild = nextChildren[i] = cloneVNode(nextChild);
	            }
	            patch(lastChildren[i], nextChild, dom, lifecycle, context, isSVG, isRecycling);
	        }
	        if (lastChildrenLength < nextChildrenLength) {
	            for (i = commonLength; i < nextChildrenLength; i++) {
	                var nextChild$1 = nextChildren[i];
	                if (nextChild$1.dom) {
	                    nextChild$1 = nextChildren[i] = cloneVNode(nextChild$1);
	                }
	                appendChild(dom, mount(nextChild$1, null, lifecycle, context, isSVG));
	            }
	        } else if (nextChildrenLength === 0) {
	            removeAllChildren(dom, lastChildren, lifecycle, false, isRecycling);
	        } else if (lastChildrenLength > nextChildrenLength) {
	            for (i = commonLength; i < lastChildrenLength; i++) {
	                unmount(lastChildren[i], dom, lifecycle, false, false, isRecycling);
	            }
	        }
	    }
	    function patchKeyedChildren(a, b, dom, lifecycle, context, isSVG, isRecycling) {
	        var aLength = a.length;
	        var bLength = b.length;
	        var aEnd = aLength - 1;
	        var bEnd = bLength - 1;
	        var aStart = 0;
	        var bStart = 0;
	        var i;
	        var j;
	        var aNode;
	        var bNode;
	        var nextNode;
	        var nextPos;
	        var node;
	        if (aLength === 0) {
	            if (bLength !== 0) {
	                mountArrayChildren(b, dom, lifecycle, context, isSVG);
	            }
	            return;
	        } else if (bLength === 0) {
	            removeAllChildren(dom, a, lifecycle, false, isRecycling);
	            return;
	        }
	        var aStartNode = a[aStart];
	        var bStartNode = b[bStart];
	        var aEndNode = a[aEnd];
	        var bEndNode = b[bEnd];
	        if (bStartNode.dom) {
	            b[bStart] = bStartNode = cloneVNode(bStartNode);
	        }
	        if (bEndNode.dom) {
	            b[bEnd] = bEndNode = cloneVNode(bEndNode);
	        }
	        // Step 1
	        /* eslint no-constant-condition: 0 */
	        outer: while (true) {
	            // Sync nodes with the same key at the beginning.
	            while (aStartNode.key === bStartNode.key) {
	                patch(aStartNode, bStartNode, dom, lifecycle, context, isSVG, isRecycling);
	                aStart++;
	                bStart++;
	                if (aStart > aEnd || bStart > bEnd) {
	                    break outer;
	                }
	                aStartNode = a[aStart];
	                bStartNode = b[bStart];
	                if (bStartNode.dom) {
	                    b[bStart] = bStartNode = cloneVNode(bStartNode);
	                }
	            }
	            // Sync nodes with the same key at the end.
	            while (aEndNode.key === bEndNode.key) {
	                patch(aEndNode, bEndNode, dom, lifecycle, context, isSVG, isRecycling);
	                aEnd--;
	                bEnd--;
	                if (aStart > aEnd || bStart > bEnd) {
	                    break outer;
	                }
	                aEndNode = a[aEnd];
	                bEndNode = b[bEnd];
	                if (bEndNode.dom) {
	                    b[bEnd] = bEndNode = cloneVNode(bEndNode);
	                }
	            }
	            // Move and sync nodes from right to left.
	            if (aEndNode.key === bStartNode.key) {
	                patch(aEndNode, bStartNode, dom, lifecycle, context, isSVG, isRecycling);
	                insertOrAppend(dom, bStartNode.dom, aStartNode.dom);
	                aEnd--;
	                bStart++;
	                aEndNode = a[aEnd];
	                bStartNode = b[bStart];
	                if (bStartNode.dom) {
	                    b[bStart] = bStartNode = cloneVNode(bStartNode);
	                }
	                continue;
	            }
	            // Move and sync nodes from left to right.
	            if (aStartNode.key === bEndNode.key) {
	                patch(aStartNode, bEndNode, dom, lifecycle, context, isSVG, isRecycling);
	                nextPos = bEnd + 1;
	                nextNode = nextPos < b.length ? b[nextPos].dom : null;
	                insertOrAppend(dom, bEndNode.dom, nextNode);
	                aStart++;
	                bEnd--;
	                aStartNode = a[aStart];
	                bEndNode = b[bEnd];
	                if (bEndNode.dom) {
	                    b[bEnd] = bEndNode = cloneVNode(bEndNode);
	                }
	                continue;
	            }
	            break;
	        }
	        if (aStart > aEnd) {
	            if (bStart <= bEnd) {
	                nextPos = bEnd + 1;
	                nextNode = nextPos < b.length ? b[nextPos].dom : null;
	                while (bStart <= bEnd) {
	                    node = b[bStart];
	                    if (node.dom) {
	                        b[bStart] = node = cloneVNode(node);
	                    }
	                    bStart++;
	                    insertOrAppend(dom, mount(node, null, lifecycle, context, isSVG), nextNode);
	                }
	            }
	        } else if (bStart > bEnd) {
	            while (aStart <= aEnd) {
	                unmount(a[aStart++], dom, lifecycle, false, false, isRecycling);
	            }
	        } else {
	            aLength = aEnd - aStart + 1;
	            bLength = bEnd - bStart + 1;
	            var aNullable = a;
	            var sources = new Array(bLength);
	            // Mark all nodes as inserted.
	            for (i = 0; i < bLength; i++) {
	                sources[i] = -1;
	            }
	            var moved = false;
	            var pos = 0;
	            var patched = 0;
	            if (bLength <= 4 || aLength * bLength <= 16) {
	                for (i = aStart; i <= aEnd; i++) {
	                    aNode = a[i];
	                    if (patched < bLength) {
	                        for (j = bStart; j <= bEnd; j++) {
	                            bNode = b[j];
	                            if (aNode.key === bNode.key) {
	                                sources[j - bStart] = i;
	                                if (pos > j) {
	                                    moved = true;
	                                } else {
	                                    pos = j;
	                                }
	                                if (bNode.dom) {
	                                    b[j] = bNode = cloneVNode(bNode);
	                                }
	                                patch(aNode, bNode, dom, lifecycle, context, isSVG, isRecycling);
	                                patched++;
	                                aNullable[i] = null;
	                                break;
	                            }
	                        }
	                    }
	                }
	            } else {
	                var keyIndex = new Map();
	                for (i = bStart; i <= bEnd; i++) {
	                    node = b[i];
	                    keyIndex.set(node.key, i);
	                }
	                for (i = aStart; i <= aEnd; i++) {
	                    aNode = a[i];
	                    if (patched < bLength) {
	                        j = keyIndex.get(aNode.key);
	                        if (!isUndefined(j)) {
	                            bNode = b[j];
	                            sources[j - bStart] = i;
	                            if (pos > j) {
	                                moved = true;
	                            } else {
	                                pos = j;
	                            }
	                            if (bNode.dom) {
	                                b[j] = bNode = cloneVNode(bNode);
	                            }
	                            patch(aNode, bNode, dom, lifecycle, context, isSVG, isRecycling);
	                            patched++;
	                            aNullable[i] = null;
	                        }
	                    }
	                }
	            }
	            if (aLength === a.length && patched === 0) {
	                removeAllChildren(dom, a, lifecycle, false, isRecycling);
	                while (bStart < bLength) {
	                    node = b[bStart];
	                    if (node.dom) {
	                        b[bStart] = node = cloneVNode(node);
	                    }
	                    bStart++;
	                    insertOrAppend(dom, mount(node, null, lifecycle, context, isSVG), null);
	                }
	            } else {
	                i = aLength - patched;
	                while (i > 0) {
	                    aNode = aNullable[aStart++];
	                    if (!isNull(aNode)) {
	                        unmount(aNode, dom, lifecycle, false, false, isRecycling);
	                        i--;
	                    }
	                }
	                if (moved) {
	                    var seq = lis_algorithm(sources);
	                    j = seq.length - 1;
	                    for (i = bLength - 1; i >= 0; i--) {
	                        if (sources[i] === -1) {
	                            pos = i + bStart;
	                            node = b[pos];
	                            if (node.dom) {
	                                b[pos] = node = cloneVNode(node);
	                            }
	                            nextPos = pos + 1;
	                            nextNode = nextPos < b.length ? b[nextPos].dom : null;
	                            insertOrAppend(dom, mount(node, dom, lifecycle, context, isSVG), nextNode);
	                        } else {
	                            if (j < 0 || i !== seq[j]) {
	                                pos = i + bStart;
	                                node = b[pos];
	                                nextPos = pos + 1;
	                                nextNode = nextPos < b.length ? b[nextPos].dom : null;
	                                insertOrAppend(dom, node.dom, nextNode);
	                            } else {
	                                j--;
	                            }
	                        }
	                    }
	                } else if (patched !== bLength) {
	                    for (i = bLength - 1; i >= 0; i--) {
	                        if (sources[i] === -1) {
	                            pos = i + bStart;
	                            node = b[pos];
	                            if (node.dom) {
	                                b[pos] = node = cloneVNode(node);
	                            }
	                            nextPos = pos + 1;
	                            nextNode = nextPos < b.length ? b[nextPos].dom : null;
	                            insertOrAppend(dom, mount(node, null, lifecycle, context, isSVG), nextNode);
	                        }
	                    }
	                }
	            }
	        }
	    }
	    // // https://en.wikipedia.org/wiki/Longest_increasing_subsequence
	    function lis_algorithm(a) {
	        var p = a.slice(0);
	        var result = [];
	        result.push(0);
	        var i;
	        var j;
	        var u;
	        var v;
	        var c;
	        for (i = 0; i < a.length; i++) {
	            if (a[i] === -1) {
	                continue;
	            }
	            j = result[result.length - 1];
	            if (a[j] < a[i]) {
	                p[i] = j;
	                result.push(i);
	                continue;
	            }
	            u = 0;
	            v = result.length - 1;
	            while (u < v) {
	                c = (u + v) / 2 | 0;
	                if (a[result[c]] < a[i]) {
	                    u = c + 1;
	                } else {
	                    v = c;
	                }
	            }
	            if (a[i] < a[result[u]]) {
	                if (u > 0) {
	                    p[i] = result[u - 1];
	                }
	                result[u] = i;
	            }
	        }
	        u = result.length;
	        v = result[u - 1];
	        while (u-- > 0) {
	            result[u] = v;
	            v = p[v];
	        }
	        return result;
	    }
	    function patchProp(prop, lastValue, nextValue, dom, isSVG, lifecycle) {
	        if (skipProps[prop]) {
	            return;
	        }
	        if (booleanProps[prop]) {
	            dom[prop] = nextValue ? true : false;
	        } else if (strictProps[prop]) {
	            var value = isNullOrUndef(nextValue) ? '' : nextValue;
	            if (dom[prop] !== value) {
	                dom[prop] = value;
	            }
	        } else if (lastValue !== nextValue) {
	            if (isAttrAnEvent(prop)) {
	                patchEvent(prop, lastValue, nextValue, dom, lifecycle);
	            } else if (isNullOrUndef(nextValue)) {
	                dom.removeAttribute(prop);
	            } else if (prop === 'className') {
	                if (isSVG) {
	                    dom.setAttribute('class', nextValue);
	                } else {
	                    dom.className = nextValue;
	                }
	            } else if (prop === 'style') {
	                patchStyle(lastValue, nextValue, dom);
	            } else if (prop === 'dangerouslySetInnerHTML') {
	                var lastHtml = lastValue && lastValue.__html;
	                var nextHtml = nextValue && nextValue.__html;
	                if (lastHtml !== nextHtml) {
	                    if (!isNullOrUndef(nextHtml)) {
	                        dom.innerHTML = nextHtml;
	                    }
	                }
	            } else if (prop !== 'childrenType' && prop !== 'ref' && prop !== 'key') {
	                var dehyphenProp;
	                if (dehyphenProps[prop]) {
	                    dehyphenProp = dehyphenProps[prop];
	                } else if (isSVG && prop.match(probablyKebabProps)) {
	                    dehyphenProp = prop.replace(/([a-z])([A-Z]|1)/g, kebabize);
	                    dehyphenProps[prop] = dehyphenProp;
	                } else {
	                    dehyphenProp = prop;
	                }
	                var ns = namespaces[prop];
	                if (ns) {
	                    dom.setAttributeNS(ns, dehyphenProp, nextValue);
	                } else {
	                    dom.setAttribute(dehyphenProp, nextValue);
	                }
	            }
	        }
	    }
	    function patchEvents(lastEvents, nextEvents, dom, lifecycle) {
	        lastEvents = lastEvents || EMPTY_OBJ;
	        nextEvents = nextEvents || EMPTY_OBJ;
	        if (nextEvents !== EMPTY_OBJ) {
	            for (var name in nextEvents) {
	                // do not add a hasOwnProperty check here, it affects performance
	                patchEvent(name, lastEvents[name], nextEvents[name], dom, lifecycle);
	            }
	        }
	        if (lastEvents !== EMPTY_OBJ) {
	            for (var name$1 in lastEvents) {
	                // do not add a hasOwnProperty check here, it affects performance
	                if (isNullOrUndef(nextEvents[name$1])) {
	                    patchEvent(name$1, lastEvents[name$1], null, dom, lifecycle);
	                }
	            }
	        }
	    }
	    function patchEvent(name, lastValue, nextValue, dom, lifecycle) {
	        if (lastValue !== nextValue) {
	            var nameLowerCase = name.toLowerCase();
	            var domEvent = dom[nameLowerCase];
	            // if the function is wrapped, that means it's been controlled by a wrapper
	            if (domEvent && domEvent.wrapped) {
	                return;
	            }
	            if (delegatedProps[name]) {
	                handleEvent(name, lastValue, nextValue, dom);
	            } else {
	                if (!isFunction(nextValue) && !isNullOrUndef(nextValue)) {
	                    if (process.env.NODE_ENV !== 'production') {
	                        throwError("an event on a VNode \"" + name + "\". was not a function. Did you try and apply an eventLink to an unsupported event?");
	                    }
	                    throwError();
	                }
	                dom[nameLowerCase] = nextValue;
	            }
	        }
	    }
	    function patchProps(lastProps, nextProps, dom, lifecycle, context, isSVG) {
	        lastProps = lastProps || EMPTY_OBJ;
	        nextProps = nextProps || EMPTY_OBJ;
	        if (nextProps !== EMPTY_OBJ) {
	            for (var prop in nextProps) {
	                // do not add a hasOwnProperty check here, it affects performance
	                var nextValue = nextProps[prop];
	                var lastValue = lastProps[prop];
	                if (isNullOrUndef(nextValue)) {
	                    removeProp(prop, nextValue, dom);
	                } else {
	                    patchProp(prop, lastValue, nextValue, dom, isSVG, lifecycle);
	                }
	            }
	        }
	        if (lastProps !== EMPTY_OBJ) {
	            for (var prop$1 in lastProps) {
	                // do not add a hasOwnProperty check here, it affects performance
	                if (isNullOrUndef(nextProps[prop$1])) {
	                    removeProp(prop$1, lastProps[prop$1], dom);
	                }
	            }
	        }
	    }
	    // We are assuming here that we come from patchProp routine
	    // -nextAttrValue cannot be null or undefined
	    function patchStyle(lastAttrValue, nextAttrValue, dom) {
	        if (isString(nextAttrValue)) {
	            dom.style.cssText = nextAttrValue;
	            return;
	        }
	        for (var style in nextAttrValue) {
	            // do not add a hasOwnProperty check here, it affects performance
	            var value = nextAttrValue[style];
	            if (isNumber(value) && !isUnitlessNumber[style]) {
	                dom.style[style] = value + 'px';
	            } else {
	                dom.style[style] = value;
	            }
	        }
	        if (!isNullOrUndef(lastAttrValue)) {
	            for (var style$1 in lastAttrValue) {
	                if (isNullOrUndef(nextAttrValue[style$1])) {
	                    dom.style[style$1] = '';
	                }
	            }
	        }
	    }
	    function removeProp(prop, lastValue, dom) {
	        if (prop === 'className') {
	            dom.removeAttribute('class');
	        } else if (prop === 'value') {
	            dom.value = '';
	        } else if (prop === 'style') {
	            dom.removeAttribute('style');
	        } else if (isAttrAnEvent(prop)) {
	            handleEvent(name, lastValue, null, dom);
	        } else {
	            dom.removeAttribute(prop);
	        }
	    }
	
	    var componentPools = new Map();
	    var elementPools = new Map();
	    function recycleElement(vNode, lifecycle, context, isSVG) {
	        var tag = vNode.type;
	        var key = vNode.key;
	        var pools = elementPools.get(tag);
	        if (!isUndefined(pools)) {
	            var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
	            if (!isUndefined(pool)) {
	                var recycledVNode = pool.pop();
	                if (!isUndefined(recycledVNode)) {
	                    patchElement(recycledVNode, vNode, null, lifecycle, context, isSVG, true);
	                    return vNode.dom;
	                }
	            }
	        }
	        return null;
	    }
	    function poolElement(vNode) {
	        var tag = vNode.type;
	        var key = vNode.key;
	        var pools = elementPools.get(tag);
	        if (isUndefined(pools)) {
	            pools = {
	                nonKeyed: [],
	                keyed: new Map()
	            };
	            elementPools.set(tag, pools);
	        }
	        if (isNull(key)) {
	            pools.nonKeyed.push(vNode);
	        } else {
	            var pool = pools.keyed.get(key);
	            if (isUndefined(pool)) {
	                pool = [];
	                pools.keyed.set(key, pool);
	            }
	            pool.push(vNode);
	        }
	    }
	    function recycleComponent(vNode, lifecycle, context, isSVG) {
	        var type = vNode.type;
	        var key = vNode.key;
	        var pools = componentPools.get(type);
	        if (!isUndefined(pools)) {
	            var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
	            if (!isUndefined(pool)) {
	                var recycledVNode = pool.pop();
	                if (!isUndefined(recycledVNode)) {
	                    var flags = vNode.flags;
	                    var failed = patchComponent(recycledVNode, vNode, null, lifecycle, context, isSVG, flags & 4 /* ComponentClass */, true);
	                    if (!failed) {
	                        return vNode.dom;
	                    }
	                }
	            }
	        }
	        return null;
	    }
	    function poolComponent(vNode) {
	        var type = vNode.type;
	        var key = vNode.key;
	        var hooks = vNode.ref;
	        var nonRecycleHooks = hooks && (hooks.onComponentWillMount || hooks.onComponentWillUnmount || hooks.onComponentDidMount || hooks.onComponentWillUpdate || hooks.onComponentDidUpdate);
	        if (nonRecycleHooks) {
	            return;
	        }
	        var pools = componentPools.get(type);
	        if (isUndefined(pools)) {
	            pools = {
	                nonKeyed: [],
	                keyed: new Map()
	            };
	            componentPools.set(type, pools);
	        }
	        if (isNull(key)) {
	            pools.nonKeyed.push(vNode);
	        } else {
	            var pool = pools.keyed.get(key);
	            if (isUndefined(pool)) {
	                pool = [];
	                pools.keyed.set(key, pool);
	            }
	            pool.push(vNode);
	        }
	    }
	
	    function mount(vNode, parentDom, lifecycle, context, isSVG) {
	        var flags = vNode.flags;
	        if (flags & 3970 /* Element */) {
	                return mountElement(vNode, parentDom, lifecycle, context, isSVG);
	            } else if (flags & 28 /* Component */) {
	                return mountComponent(vNode, parentDom, lifecycle, context, isSVG, flags & 4 /* ComponentClass */);
	            } else if (flags & 4096 /* Void */) {
	                return mountVoid(vNode, parentDom);
	            } else if (flags & 1 /* Text */) {
	                return mountText(vNode, parentDom);
	            } else {
	            if (process.env.NODE_ENV !== 'production') {
	                if ((typeof vNode === 'undefined' ? 'undefined' : _typeof(vNode)) === 'object') {
	                    throwError("mount() received an object that's not a valid VNode, you should stringify it first. Object: \"" + JSON.stringify(vNode) + "\".");
	                } else {
	                    throwError("mount() expects a valid VNode, instead it received an object with the type \"" + (typeof vNode === 'undefined' ? 'undefined' : _typeof(vNode)) + "\".");
	                }
	            }
	            throwError();
	        }
	    }
	    function mountText(vNode, parentDom) {
	        var dom = document.createTextNode(vNode.children);
	        vNode.dom = dom;
	        if (parentDom) {
	            appendChild(parentDom, dom);
	        }
	        return dom;
	    }
	    function mountVoid(vNode, parentDom) {
	        var dom = document.createTextNode('');
	        vNode.dom = dom;
	        if (parentDom) {
	            appendChild(parentDom, dom);
	        }
	        return dom;
	    }
	    function mountElement(vNode, parentDom, lifecycle, context, isSVG) {
	        if (options.recyclingEnabled) {
	            var dom$1 = recycleElement(vNode, lifecycle, context, isSVG);
	            if (!isNull(dom$1)) {
	                if (!isNull(parentDom)) {
	                    appendChild(parentDom, dom$1);
	                }
	                return dom$1;
	            }
	        }
	        var tag = vNode.type;
	        var flags = vNode.flags;
	        if (isSVG || flags & 128 /* SvgElement */) {
	            isSVG = true;
	        }
	        var dom = documentCreateElement(tag, isSVG);
	        var children = vNode.children;
	        var props = vNode.props;
	        var events = vNode.events;
	        var ref = vNode.ref;
	        vNode.dom = dom;
	        if (!isNull(children)) {
	            if (isStringOrNumber(children)) {
	                setTextContent(dom, children);
	            } else if (isArray(children)) {
	                mountArrayChildren(children, dom, lifecycle, context, isSVG);
	            } else if (isVNode(children)) {
	                mount(children, dom, lifecycle, context, isSVG);
	            }
	        }
	        if (!(flags & 2 /* HtmlElement */)) {
	            processElement(flags, vNode, dom);
	        }
	        if (!isNull(props)) {
	            for (var prop in props) {
	                // do not add a hasOwnProperty check here, it affects performance
	                patchProp(prop, null, props[prop], dom, isSVG, lifecycle);
	            }
	        }
	        if (!isNull(events)) {
	            for (var name in events) {
	                // do not add a hasOwnProperty check here, it affects performance
	                patchEvent(name, null, events[name], dom, lifecycle);
	            }
	        }
	        if (!isNull(ref)) {
	            mountRef(dom, ref, lifecycle);
	        }
	        if (!isNull(parentDom)) {
	            appendChild(parentDom, dom);
	        }
	        return dom;
	    }
	    function mountArrayChildren(children, dom, lifecycle, context, isSVG) {
	        for (var i = 0; i < children.length; i++) {
	            var child = children[i];
	            if (!isInvalid(child)) {
	                if (child.dom) {
	                    children[i] = child = cloneVNode(child);
	                }
	                mount(children[i], dom, lifecycle, context, isSVG);
	            }
	        }
	    }
	    function mountComponent(vNode, parentDom, lifecycle, context, isSVG, isClass) {
	        if (options.recyclingEnabled) {
	            var dom$1 = recycleComponent(vNode, lifecycle, context, isSVG);
	            if (!isNull(dom$1)) {
	                if (!isNull(parentDom)) {
	                    appendChild(parentDom, dom$1);
	                }
	                return dom$1;
	            }
	        }
	        var type = vNode.type;
	        var props = vNode.props || EMPTY_OBJ;
	        var defaultProps = type.defaultProps;
	        var ref = vNode.ref;
	        var dom;
	        if (!isUndefined(defaultProps)) {
	            copyPropsTo(defaultProps, props);
	            vNode.props = props;
	        }
	        if (isClass) {
	            var instance = createClassComponentInstance(vNode, type, props, context, isSVG);
	            // If instance does not have componentWillUnmount specified we can enable fastUnmount
	            lifecycle.fastUnmount = isUndefined(instance.componentWillUnmount);
	            var input = instance._lastInput;
	            // we store the fastUnmount value, but we set it back to true on the lifecycle
	            // we do this so we can determine if the component render has a fastUnmount or not
	            instance._vNode = vNode;
	            vNode.dom = dom = mount(input, null, lifecycle, instance._childContext, isSVG);
	            // we now create a lifecycle for this component and store the fastUnmount value
	            var subLifecycle = instance._lifecycle = new Lifecycle();
	            subLifecycle.fastUnmount = lifecycle.fastUnmount;
	            if (!isNull(parentDom)) {
	                appendChild(parentDom, dom);
	            }
	            mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
	            options.findDOMNodeEnabled && componentToDOMNodeMap.set(instance, dom);
	            vNode.children = instance;
	        } else {
	            var input$1 = createFunctionalComponentInput(vNode, type, props, context);
	            vNode.dom = dom = mount(input$1, null, lifecycle, context, isSVG);
	            vNode.children = input$1;
	            mountFunctionalComponentCallbacks(ref, dom, lifecycle);
	            if (!isNull(parentDom)) {
	                appendChild(parentDom, dom);
	            }
	        }
	        return dom;
	    }
	    function mountClassComponentCallbacks(vNode, ref, instance, lifecycle) {
	        if (ref) {
	            if (isFunction(ref)) {
	                ref(instance);
	            } else {
	                if (process.env.NODE_ENV !== 'production') {
	                    throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
	                }
	                throwError();
	            }
	        }
	        var cDM = instance.componentDidMount;
	        var afterMount = options.afterMount;
	        if (!isUndefined(cDM) || !isNull(afterMount)) {
	            lifecycle.addListener(function () {
	                afterMount && afterMount(vNode);
	                cDM && instance.componentDidMount();
	            });
	        }
	    }
	    function mountFunctionalComponentCallbacks(ref, dom, lifecycle) {
	        if (ref) {
	            if (!isNullOrUndef(ref.onComponentWillMount)) {
	                ref.onComponentWillMount();
	            }
	            if (!isNullOrUndef(ref.onComponentDidMount)) {
	                lifecycle.addListener(function () {
	                    return ref.onComponentDidMount(dom);
	                });
	            }
	            if (!isNullOrUndef(ref.onComponentWillUnmount)) {
	                lifecycle.fastUnmount = false;
	            }
	        }
	    }
	    function mountRef(dom, value, lifecycle) {
	        if (isFunction(value)) {
	            lifecycle.fastUnmount = false;
	            lifecycle.addListener(function () {
	                return value(dom);
	            });
	        } else {
	            if (isInvalid(value)) {
	                return;
	            }
	            if (process.env.NODE_ENV !== 'production') {
	                throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
	            }
	            throwError();
	        }
	    }
	
	    function createClassComponentInstance(vNode, Component, props, context, isSVG) {
	        if (isUndefined(context)) {
	            context = {};
	        }
	        var instance = new Component(props, context);
	        instance.context = context;
	        if (instance.props === EMPTY_OBJ) {
	            instance.props = props;
	        }
	        instance._patch = patch;
	        if (options.findDOMNodeEnabled) {
	            instance._componentToDOMNodeMap = componentToDOMNodeMap;
	        }
	        var childContext = instance.getChildContext();
	        if (!isNullOrUndef(childContext)) {
	            instance._childContext = Object.assign({}, context, childContext);
	        } else {
	            instance._childContext = context;
	        }
	        instance._unmounted = false;
	        instance._pendingSetState = true;
	        instance._isSVG = isSVG;
	        instance.componentWillMount();
	        options.beforeRender && options.beforeRender(instance);
	        var input = instance.render(props, instance.state, context);
	        options.afterRender && options.afterRender(instance);
	        if (isArray(input)) {
	            if (process.env.NODE_ENV !== 'production') {
	                throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
	            }
	            throwError();
	        } else if (isInvalid(input)) {
	            input = createVoidVNode();
	        } else if (isStringOrNumber(input)) {
	            input = createTextVNode(input);
	        } else {
	            if (input.dom) {
	                input = cloneVNode(input);
	            }
	            if (input.flags & 28 /* Component */) {
	                    // if we have an input that is also a component, we run into a tricky situation
	                    // where the root vNode needs to always have the correct DOM entry
	                    // so we break monomorphism on our input and supply it our vNode as parentVNode
	                    // we can optimise this in the future, but this gets us out of a lot of issues
	                    input.parentVNode = vNode;
	                }
	        }
	        instance._pendingSetState = false;
	        instance._lastInput = input;
	        return instance;
	    }
	    function replaceLastChildAndUnmount(lastInput, nextInput, parentDom, lifecycle, context, isSVG, isRecycling) {
	        replaceVNode(parentDom, mount(nextInput, null, lifecycle, context, isSVG), lastInput, lifecycle, isRecycling);
	    }
	    function replaceVNode(parentDom, dom, vNode, lifecycle, isRecycling) {
	        var shallowUnmount = false;
	        // we cannot cache nodeType here as vNode might be re-assigned below
	        if (vNode.flags & 28 /* Component */) {
	                // if we are accessing a stateful or stateless component, we want to access their last rendered input
	                // accessing their DOM node is not useful to us here
	                unmount(vNode, null, lifecycle, false, false, isRecycling);
	                vNode = vNode.children._lastInput || vNode.children;
	                shallowUnmount = true;
	            }
	        replaceChild(parentDom, dom, vNode.dom);
	        unmount(vNode, null, lifecycle, false, shallowUnmount, isRecycling);
	    }
	    function createFunctionalComponentInput(vNode, component, props, context) {
	        var input = component(props, context);
	        if (isArray(input)) {
	            if (process.env.NODE_ENV !== 'production') {
	                throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
	            }
	            throwError();
	        } else if (isInvalid(input)) {
	            input = createVoidVNode();
	        } else if (isStringOrNumber(input)) {
	            input = createTextVNode(input);
	        } else {
	            if (input.dom) {
	                input = cloneVNode(input);
	            }
	            if (input.flags & 28 /* Component */) {
	                    // if we have an input that is also a component, we run into a tricky situation
	                    // where the root vNode needs to always have the correct DOM entry
	                    // so we break monomorphism on our input and supply it our vNode as parentVNode
	                    // we can optimise this in the future, but this gets us out of a lot of issues
	                    input.parentVNode = vNode;
	                }
	        }
	        return input;
	    }
	    function setTextContent(dom, text) {
	        if (text !== '') {
	            dom.textContent = text;
	        } else {
	            dom.appendChild(document.createTextNode(''));
	        }
	    }
	    function updateTextContent(dom, text) {
	        dom.firstChild.nodeValue = text;
	    }
	    function appendChild(parentDom, dom) {
	        parentDom.appendChild(dom);
	    }
	    function insertOrAppend(parentDom, newNode, nextNode) {
	        if (isNullOrUndef(nextNode)) {
	            appendChild(parentDom, newNode);
	        } else {
	            parentDom.insertBefore(newNode, nextNode);
	        }
	    }
	    function documentCreateElement(tag, isSVG) {
	        if (isSVG === true) {
	            return document.createElementNS(svgNS, tag);
	        } else {
	            return document.createElement(tag);
	        }
	    }
	    function replaceWithNewNode(lastNode, nextNode, parentDom, lifecycle, context, isSVG, isRecycling) {
	        unmount(lastNode, null, lifecycle, false, false, isRecycling);
	        var dom = mount(nextNode, null, lifecycle, context, isSVG);
	        nextNode.dom = dom;
	        replaceChild(parentDom, dom, lastNode.dom);
	    }
	    function replaceChild(parentDom, nextDom, lastDom) {
	        if (!parentDom) {
	            parentDom = lastDom.parentNode;
	        }
	        parentDom.replaceChild(nextDom, lastDom);
	    }
	    function removeChild(parentDom, dom) {
	        parentDom.removeChild(dom);
	    }
	    function removeAllChildren(dom, children, lifecycle, shallowUnmount, isRecycling) {
	        dom.textContent = '';
	        if (!lifecycle.fastUnmount) {
	            removeChildren(null, children, lifecycle, shallowUnmount, isRecycling);
	        }
	    }
	    function removeChildren(dom, children, lifecycle, shallowUnmount, isRecycling) {
	        for (var i = 0; i < children.length; i++) {
	            var child = children[i];
	            if (!isInvalid(child)) {
	                unmount(child, dom, lifecycle, true, shallowUnmount, isRecycling);
	            }
	        }
	    }
	    function isKeyed(lastChildren, nextChildren) {
	        return nextChildren.length && !isNullOrUndef(nextChildren[0]) && !isNullOrUndef(nextChildren[0].key) && lastChildren.length && !isNullOrUndef(lastChildren[0]) && !isNullOrUndef(lastChildren[0].key);
	    }
	
	    function normalizeChildNodes(dom) {
	        var rawChildNodes = dom.childNodes;
	        var length = rawChildNodes.length;
	        var i = 0;
	        while (i < length) {
	            var rawChild = rawChildNodes[i];
	            if (rawChild.nodeType === 8) {
	                if (rawChild.data === '!') {
	                    var placeholder = document.createTextNode('');
	                    dom.replaceChild(placeholder, rawChild);
	                    i++;
	                } else {
	                    dom.removeChild(rawChild);
	                    length--;
	                }
	            } else {
	                i++;
	            }
	        }
	    }
	    function hydrateComponent(vNode, dom, lifecycle, context, isSVG, isClass) {
	        var type = vNode.type;
	        var props = vNode.props || EMPTY_OBJ;
	        var ref = vNode.ref;
	        vNode.dom = dom;
	        if (isClass) {
	            var _isSVG = dom.namespaceURI === svgNS;
	            var defaultProps = type.defaultProps;
	            if (!isUndefined(defaultProps)) {
	                copyPropsTo(defaultProps, props);
	                vNode.props = props;
	            }
	            var instance = createClassComponentInstance(vNode, type, props, context, _isSVG);
	            // If instance does not have componentWillUnmount specified we can enable fastUnmount
	            var fastUnmount = isUndefined(instance.componentWillUnmount);
	            var input = instance._lastInput;
	            // we store the fastUnmount value, but we set it back to true on the lifecycle
	            // we do this so we can determine if the component render has a fastUnmount or not
	            lifecycle.fastUnmount = true;
	            instance._vComponent = vNode;
	            instance._vNode = vNode;
	            hydrate(input, dom, lifecycle, instance._childContext, _isSVG);
	            var subLifecycle = instance._lifecycle = new Lifecycle();
	            subLifecycle.fastUnmount = lifecycle.fastUnmount;
	            // we then set the lifecycle fastUnmount value back to what it was before the mount
	            lifecycle.fastUnmount = fastUnmount;
	            mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
	            options.findDOMNodeEnabled && componentToDOMNodeMap.set(instance, dom);
	            vNode.children = instance;
	        } else {
	            var input$1 = createFunctionalComponentInput(vNode, type, props, context);
	            hydrate(input$1, dom, lifecycle, context, isSVG);
	            vNode.children = input$1;
	            vNode.dom = input$1.dom;
	            mountFunctionalComponentCallbacks(ref, dom, lifecycle);
	        }
	    }
	    function hydrateElement(vNode, dom, lifecycle, context, isSVG) {
	        var tag = vNode.type;
	        var children = vNode.children;
	        var props = vNode.props;
	        var events = vNode.events;
	        var flags = vNode.flags;
	        var ref = vNode.ref;
	        if (isSVG || flags & 128 /* SvgElement */) {
	            isSVG = true;
	        }
	        if (dom.nodeType !== 1 || dom.tagName.toLowerCase() !== tag) {
	            var newDom = mountElement(vNode, null, lifecycle, context, isSVG);
	            vNode.dom = newDom;
	            replaceChild(dom.parentNode, newDom, dom);
	        } else {
	            vNode.dom = dom;
	            if (children) {
	                hydrateChildren(children, dom, lifecycle, context, isSVG);
	            }
	            if (!(flags & 2 /* HtmlElement */)) {
	                processElement(flags, vNode, dom);
	            }
	            if (props) {
	                for (var prop in props) {
	                    patchProp(prop, null, props[prop], dom, isSVG, lifecycle);
	                }
	            }
	            if (events) {
	                for (var name in events) {
	                    patchEvent(name, null, events[name], dom, lifecycle);
	                }
	            }
	            if (ref) {
	                mountRef(dom, ref, lifecycle);
	            }
	        }
	    }
	    function hydrateChildren(children, dom, lifecycle, context, isSVG) {
	        normalizeChildNodes(dom);
	        var domNodes = Array.prototype.slice.call(dom.childNodes);
	        var childNodeIndex = 0;
	        if (isArray(children)) {
	            for (var i = 0; i < children.length; i++) {
	                var child = children[i];
	                if (isObject(child) && !isNull(child)) {
	                    hydrate(child, domNodes[childNodeIndex++], lifecycle, context, isSVG);
	                }
	            }
	        } else if (isObject(children)) {
	            hydrate(children, dom.firstChild, lifecycle, context, isSVG);
	        }
	    }
	    function hydrateText(vNode, dom) {
	        if (dom.nodeType === 3) {
	            var newDom = mountText(vNode, null);
	            vNode.dom = newDom;
	            replaceChild(dom.parentNode, newDom, dom);
	        } else {
	            vNode.dom = dom;
	        }
	    }
	    function hydrateVoid(vNode, dom) {
	        vNode.dom = dom;
	    }
	    function hydrate(vNode, dom, lifecycle, context, isSVG) {
	        if (process.env.NODE_ENV !== 'production') {
	            if (isInvalid(dom)) {
	                throwError("failed to hydrate. The server-side render doesn't match client side.");
	            }
	        }
	        var flags = vNode.flags;
	        if (flags & 28 /* Component */) {
	                return hydrateComponent(vNode, dom, lifecycle, context, isSVG, flags & 4 /* ComponentClass */);
	            } else if (flags & 3970 /* Element */) {
	                return hydrateElement(vNode, dom, lifecycle, context, isSVG);
	            } else if (flags & 1 /* Text */) {
	                return hydrateText(vNode, dom);
	            } else if (flags & 4096 /* Void */) {
	                return hydrateVoid(vNode, dom);
	            } else {
	            if (process.env.NODE_ENV !== 'production') {
	                throwError("hydrate() expects a valid VNode, instead it received an object with the type \"" + (typeof vNode === 'undefined' ? 'undefined' : _typeof(vNode)) + "\".");
	            }
	            throwError();
	        }
	    }
	    function hydrateRoot(input, parentDom, lifecycle) {
	        if (parentDom && parentDom.nodeType === 1 && parentDom.firstChild) {
	            hydrate(input, parentDom.firstChild, lifecycle, {}, false);
	            return true;
	        }
	        return false;
	    }
	
	    // rather than use a Map, like we did before, we can use an array here
	    // given there shouldn't be THAT many roots on the page, the difference
	    // in performance is huge: https://esbench.com/bench/5802a691330ab09900a1a2da
	    var roots = [];
	    var componentToDOMNodeMap = new Map();
	    options.roots = roots;
	    function findDOMNode(ref) {
	        if (!options.findDOMNodeEnabled) {
	            if (process.env.NODE_ENV !== 'production') {
	                throwError('findDOMNode() has been disabled, use enableFindDOMNode() enabled findDOMNode(). Warning this can significantly impact performance!');
	            }
	            throwError();
	        }
	        var dom = ref && ref.nodeType ? ref : null;
	        return componentToDOMNodeMap.get(ref) || dom;
	    }
	    function getRoot(dom) {
	        for (var i = 0; i < roots.length; i++) {
	            var root = roots[i];
	            if (root.dom === dom) {
	                return root;
	            }
	        }
	        return null;
	    }
	
	    function setRoot(dom, input, lifecycle) {
	        var root = {
	            dom: dom,
	            input: input,
	            lifecycle: lifecycle
	        };
	        roots.push(root);
	        return root;
	    }
	    function removeRoot(root) {
	        for (var i = 0; i < roots.length; i++) {
	            if (roots[i] === root) {
	                roots.splice(i, 1);
	                return;
	            }
	        }
	    }
	    var documentBody = isBrowser ? document.body : null;
	    function render(input, parentDom) {
	        if (documentBody === parentDom) {
	            if (process.env.NODE_ENV !== 'production') {
	                throwError('you cannot render() to the "document.body". Use an empty element as a container instead.');
	            }
	            throwError();
	        }
	        if (input === NO_OP) {
	            return;
	        }
	        var root = getRoot(parentDom);
	        if (isNull(root)) {
	            var lifecycle = new Lifecycle();
	            if (!isInvalid(input)) {
	                if (input.dom) {
	                    input = cloneVNode(input);
	                }
	                if (!hydrateRoot(input, parentDom, lifecycle)) {
	                    mount(input, parentDom, lifecycle, {}, false);
	                }
	                root = setRoot(parentDom, input, lifecycle);
	                lifecycle.trigger();
	            }
	        } else {
	            var lifecycle$1 = root.lifecycle;
	            lifecycle$1.listeners = [];
	            if (isNullOrUndef(input)) {
	                unmount(root.input, parentDom, lifecycle$1, false, false, false);
	                removeRoot(root);
	            } else {
	                if (input.dom) {
	                    input = cloneVNode(input);
	                }
	                patch(root.input, input, parentDom, lifecycle$1, {}, false, false);
	            }
	            lifecycle$1.trigger();
	            root.input = input;
	        }
	        if (root) {
	            var rootInput = root.input;
	            if (rootInput && rootInput.flags & 28 /* Component */) {
	                return rootInput.children;
	            }
	        }
	    }
	    function createRenderer(_parentDom) {
	        var parentDom = _parentDom || null;
	        return function renderer(lastInput, nextInput) {
	            if (!parentDom) {
	                parentDom = lastInput;
	            }
	            render(nextInput, parentDom);
	        };
	    }
	
	    function linkEvent(data, event) {
	        return { data: data, event: event };
	    }
	
	    if (isBrowser) {
	        window.process = window.process || {};
	        window.process.env = window.process.env || {
	            NODE_ENV: 'development'
	        };
	    }
	
	    if (process.env.NODE_ENV !== 'production') {
	        Object.freeze(EMPTY_OBJ);
	        var testFunc = function testFn() {};
	        warning((testFunc.name || testFunc.toString()).indexOf('testFn') !== -1, 'It looks like you\'re using a minified copy of the development build ' + 'of Inferno. When deploying Inferno apps to production, make sure to use ' + 'the production build which skips development warnings and is faster. ' + 'See http://infernojs.org for more details.');
	    }
	
	    // we duplicate it so it plays nicely with different module loading systems
	    var index = {
	        linkEvent: linkEvent,
	        // core shapes
	        createVNode: createVNode,
	
	        // cloning
	        cloneVNode: cloneVNode,
	
	        // used to shared common items between Inferno libs
	        NO_OP: NO_OP,
	        EMPTY_OBJ: EMPTY_OBJ,
	
	        // DOM
	        render: render,
	        findDOMNode: findDOMNode,
	        createRenderer: createRenderer,
	        options: options
	    };
	
	    exports['default'] = index;
	    exports.linkEvent = linkEvent;
	    exports.createVNode = createVNode;
	    exports.cloneVNode = cloneVNode;
	    exports.NO_OP = NO_OP;
	    exports.EMPTY_OBJ = EMPTY_OBJ;
	    exports.render = render;
	    exports.findDOMNode = findDOMNode;
	    exports.createRenderer = createRenderer;
	    exports.options = options;
	
	    Object.defineProperty(exports, '__esModule', { value: true });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout() {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	})();
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.App = App;
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	var _Explorer = __webpack_require__(5);
	
	var _Explorer2 = _interopRequireDefault(_Explorer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createVNode = _inferno2.default.createVNode;
	function App() {
	  return createVNode(2, 'div', null, [createVNode(2, 'h1', null, 'Swagger UI'), createVNode(16, _Explorer2.default)]);
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	var _infernoComponent = __webpack_require__(6);
	
	var _infernoComponent2 = _interopRequireDefault(_infernoComponent);
	
	var _ExploreByTags = __webpack_require__(8);
	
	var _ExploreByTags2 = _interopRequireDefault(_ExploreByTags);
	
	var _ExplorePaths = __webpack_require__(9);
	
	var _ExplorePaths2 = _interopRequireDefault(_ExplorePaths);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Swagger API json structure
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * definitions : {
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   [name] : {
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     properties: {
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *       [prop]: {
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *         ? type: string | integer | boolean,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *           -or-
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *         ? $ref: "#/definitions/DefinitionID"
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *       },...
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     },
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     required : [ required fields ]
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   },...
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * }
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * info : {
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   description
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   title
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   version
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * }
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * paths : {
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   [path] : {
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     [method] : {
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *       ? consumes : [ mime types ],
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *       ? parameters : [
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *         {
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *           ? default
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *           in
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *           name
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *           required
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *           ? type: string | integer | boolean
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *           -or-
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *           ? schema : {
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *             $ref
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *           }
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *         }, ...]
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *       produces : [ mime types ],
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *       responses : {
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *         default: {
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *           description
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *         }
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *       },
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *       tags : [ tags ]
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     }
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   }
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * }
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * swagger
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * tags : [{description, name},...]
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * if there are tags
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   split paths up by tags
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * else
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   single section
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var createVNode = _inferno2.default.createVNode;
	
	var Explorer = function (_Component) {
	  _inherits(Explorer, _Component);
	
	  function Explorer() {
	    _classCallCheck(this, Explorer);
	
	    var _this = _possibleConstructorReturn(this, (Explorer.__proto__ || Object.getPrototypeOf(Explorer)).call(this));
	
	    _this.state = {
	      definitions: {},
	      info: {
	        description: null,
	        title: null,
	        version: null
	      },
	      paths: {},
	      swagger: null,
	      tags: [],
	      errors: null
	    };
	
	    _this.fetchApi("/mock-data/multiple-tags.json");
	    return _this;
	  }
	
	  _createClass(Explorer, [{
	    key: 'fetchApi',
	    value: function fetchApi(url) {
	      var _this2 = this;
	
	      var req = new Request(url, { method: "GET" });
	      fetch(req).then(function (res) {
	        return res.json();
	      }).then(function (res) {
	        _this2.setState(res);
	      }).catch(function (err) {
	        var errors = err instanceof SyntaxError ? "Server found a broken" : err.toString();
	        _this2.setState({ errors: errors });
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return createVNode(2, 'div', null, [createVNode(2, 'p', {
	        'className': 'error'
	      }, this.state.errors), this.state.tags.length > 0 ? createVNode(16, _ExploreByTags2.default, _extends({}, this.state)) : createVNode(16, _ExplorePaths2.default, _extends({}, this.state))]);
	    }
	  }]);
	
	  return Explorer;
	}(_infernoComponent2.default);
	
	exports.default = Explorer;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(7);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*!
	 * inferno-component v1.0.0-beta42
	 * (c) 2016 Dominic Gannaway
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(__webpack_require__(2)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : (global.Inferno = global.Inferno || {}, global.Inferno.Component = factory(global.Inferno));
	})(undefined, function (inferno) {
	    'use strict';
	
	    var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
	    var isBrowser = typeof window !== 'undefined' && window.document;
	
	    // this is MUCH faster than .constructor === Array and instanceof Array
	    // in Node 7 and the later versions of V8, slower in older versions though
	    var isArray = Array.isArray;
	
	    function isStringOrNumber(obj) {
	        return isString(obj) || isNumber(obj);
	    }
	    function isNullOrUndef(obj) {
	        return isUndefined(obj) || isNull(obj);
	    }
	    function isInvalid(obj) {
	        return isNull(obj) || obj === false || isTrue(obj) || isUndefined(obj);
	    }
	    function isFunction(obj) {
	        return typeof obj === 'function';
	    }
	
	    function isString(obj) {
	        return typeof obj === 'string';
	    }
	    function isNumber(obj) {
	        return typeof obj === 'number';
	    }
	    function isNull(obj) {
	        return obj === null;
	    }
	    function isTrue(obj) {
	        return obj === true;
	    }
	    function isUndefined(obj) {
	        return obj === undefined;
	    }
	
	    function throwError(message) {
	        if (!message) {
	            message = ERROR_MSG;
	        }
	        throw new Error("Inferno Error: " + message);
	    }
	
	    var Lifecycle = function Lifecycle() {
	        this.listeners = [];
	        this.fastUnmount = true;
	    };
	    Lifecycle.prototype.addListener = function addListener(callback) {
	        this.listeners.push(callback);
	    };
	    Lifecycle.prototype.trigger = function trigger() {
	        var this$1 = this;
	
	        for (var i = 0; i < this.listeners.length; i++) {
	            this$1.listeners[i]();
	        }
	    };
	
	    var noOp = ERROR_MSG;
	    if (process.env.NODE_ENV !== 'production') {
	        noOp = 'Inferno Error: Can only update a mounted or mounting component. This usually means you called setState() or forceUpdate() on an unmounted component. This is a no-op.';
	    }
	    var componentCallbackQueue = new Map();
	    // when a components root VNode is also a component, we can run into issues
	    // this will recursively look for vNode.parentNode if the VNode is a component
	    function updateParentComponentVNodes(vNode, dom) {
	        if (vNode.flags & 28 /* Component */) {
	                var parentVNode = vNode.parentVNode;
	                if (parentVNode) {
	                    parentVNode.dom = dom;
	                    updateParentComponentVNodes(parentVNode, dom);
	                }
	            }
	    }
	    // this is in shapes too, but we don't want to import from shapes as it will pull in a duplicate of createVNode
	    function createVoidVNode() {
	        return inferno.createVNode(4096 /* Void */);
	    }
	    function createTextVNode(text) {
	        return inferno.createVNode(1 /* Text */, null, null, text);
	    }
	    function addToQueue(component, force, callback) {
	        // TODO this function needs to be revised and improved on
	        var queue = componentCallbackQueue.get(component);
	        if (!queue) {
	            queue = [];
	            componentCallbackQueue.set(component, queue);
	            Promise.resolve().then(function () {
	                applyState(component, force, function () {
	                    for (var i = 0; i < queue.length; i++) {
	                        queue[i]();
	                    }
	                });
	                componentCallbackQueue.delete(component);
	                component._processingSetState = false;
	            });
	        }
	        if (callback) {
	            queue.push(callback);
	        }
	    }
	    function queueStateChanges(component, newState, callback) {
	        if (isFunction(newState)) {
	            newState = newState(component.state);
	        }
	        for (var stateKey in newState) {
	            component._pendingState[stateKey] = newState[stateKey];
	        }
	        if (!component._pendingSetState && isBrowser) {
	            if (component._processingSetState || callback) {
	                addToQueue(component, false, callback);
	            } else {
	                component._pendingSetState = true;
	                component._processingSetState = true;
	                applyState(component, false, callback);
	                component._processingSetState = false;
	            }
	        } else {
	            component.state = Object.assign({}, component.state, component._pendingState);
	            component._pendingState = {};
	        }
	    }
	    function applyState(component, force, callback) {
	        if ((!component._deferSetState || force) && !component._blockRender && !component._unmounted) {
	            component._pendingSetState = false;
	            var pendingState = component._pendingState;
	            var prevState = component.state;
	            var nextState = Object.assign({}, prevState, pendingState);
	            var props = component.props;
	            var context = component.context;
	            component._pendingState = {};
	            var nextInput = component._updateComponent(prevState, nextState, props, props, context, force);
	            var didUpdate = true;
	            if (isInvalid(nextInput)) {
	                nextInput = createVoidVNode();
	            } else if (nextInput === inferno.NO_OP) {
	                nextInput = component._lastInput;
	                didUpdate = false;
	            } else if (isStringOrNumber(nextInput)) {
	                nextInput = createTextVNode(nextInput);
	            } else if (isArray(nextInput)) {
	                if (process.env.NODE_ENV !== 'production') {
	                    throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
	                }
	                throwError();
	            }
	            var lastInput = component._lastInput;
	            var vNode = component._vNode;
	            var parentDom = lastInput.dom && lastInput.dom.parentNode || (lastInput.dom = vNode.dom);
	            component._lastInput = nextInput;
	            if (didUpdate) {
	                var subLifecycle = component._lifecycle;
	                if (!subLifecycle) {
	                    subLifecycle = new Lifecycle();
	                } else {
	                    subLifecycle.listeners = [];
	                }
	                component._lifecycle = subLifecycle;
	                var childContext = component.getChildContext();
	                if (!isNullOrUndef(childContext)) {
	                    childContext = Object.assign({}, context, component._childContext, childContext);
	                } else {
	                    childContext = Object.assign({}, context, component._childContext);
	                }
	                component._patch(lastInput, nextInput, parentDom, subLifecycle, childContext, component._isSVG, false);
	                subLifecycle.trigger();
	                component.componentDidUpdate(props, prevState);
	                inferno.options.afterUpdate && inferno.options.afterUpdate(vNode);
	            }
	            var dom = vNode.dom = nextInput.dom;
	            var componentToDOMNodeMap = component._componentToDOMNodeMap;
	            componentToDOMNodeMap && componentToDOMNodeMap.set(component, nextInput.dom);
	            updateParentComponentVNodes(vNode, dom);
	            if (!isNullOrUndef(callback)) {
	                callback();
	            }
	        }
	    }
	    var Component$1 = function Component(props, context) {
	        this.state = {};
	        this.refs = {};
	        this._processingSetState = false;
	        this._blockRender = false;
	        this._ignoreSetState = false;
	        this._blockSetState = false;
	        this._deferSetState = false;
	        this._pendingSetState = false;
	        this._pendingState = {};
	        this._lastInput = null;
	        this._vNode = null;
	        this._unmounted = true;
	        this._devToolsStatus = null;
	        this._devToolsId = null;
	        this._lifecycle = null;
	        this._childContext = null;
	        this._patch = null;
	        this._isSVG = false;
	        this._componentToDOMNodeMap = null;
	        /** @type {object} */
	        this.props = props || inferno.EMPTY_OBJ;
	        /** @type {object} */
	        this.context = context || {};
	    };
	    Component$1.prototype.render = function render(nextProps, nextState, nextContext) {};
	    Component$1.prototype.forceUpdate = function forceUpdate(callback) {
	        if (this._unmounted) {
	            return;
	        }
	        isBrowser && applyState(this, true, callback);
	    };
	    Component$1.prototype.setState = function setState(newState, callback) {
	        if (this._unmounted) {
	            return;
	        }
	        if (!this._blockSetState) {
	            if (!this._ignoreSetState) {
	                queueStateChanges(this, newState, callback);
	            }
	        } else {
	            if (process.env.NODE_ENV !== 'production') {
	                throwError('cannot update state via setState() in componentWillUpdate().');
	            }
	            throwError();
	        }
	    };
	    Component$1.prototype.componentWillMount = function componentWillMount() {};
	    Component$1.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState, prevContext) {};
	    Component$1.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState, context) {
	        return true;
	    };
	    Component$1.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps, context) {};
	    Component$1.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState, nextContext) {};
	    Component$1.prototype.getChildContext = function getChildContext() {};
	    Component$1.prototype._updateComponent = function _updateComponent(prevState, nextState, prevProps, nextProps, context, force) {
	        if (this._unmounted === true) {
	            if (process.env.NODE_ENV !== 'production') {
	                throwError(noOp);
	            }
	            throwError();
	        }
	        if (prevProps !== nextProps || nextProps === inferno.EMPTY_OBJ || prevState !== nextState || force) {
	            if (prevProps !== nextProps || nextProps === inferno.EMPTY_OBJ) {
	                this._blockRender = true;
	                this.componentWillReceiveProps(nextProps, context);
	                this._blockRender = false;
	                if (this._pendingSetState) {
	                    nextState = Object.assign({}, nextState, this._pendingState);
	                    this._pendingSetState = false;
	                    this._pendingState = {};
	                }
	            }
	            var shouldUpdate = this.shouldComponentUpdate(nextProps, nextState, context);
	            if (shouldUpdate !== false || force) {
	                this._blockSetState = true;
	                this.componentWillUpdate(nextProps, nextState, context);
	                this._blockSetState = false;
	                this.props = nextProps;
	                var state = this.state = nextState;
	                this.context = context;
	                inferno.options.beforeRender && inferno.options.beforeRender(this);
	                var render = this.render(nextProps, state, context);
	                inferno.options.afterRender && inferno.options.afterRender(this);
	                return render;
	            }
	        }
	        return inferno.NO_OP;
	    };
	
	    return Component$1;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = ExploreByTags;
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	var _ExplorePaths = __webpack_require__(9);
	
	var _ExplorePaths2 = _interopRequireDefault(_ExplorePaths);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var createVNode = _inferno2.default.createVNode;
	function ExploreByTags(_ref) {
	  var tags = _ref.tags,
	      definitions = _ref.definitions,
	      paths = _ref.paths;
	
	  return createVNode(2, 'div', null, tags.map(function (tag) {
	    return createVNode(2, 'section', null, [createVNode(2, 'h2', null, [tag.description, ' ', createVNode(2, 'small', null, ['[', tag.name, ']'])]), createVNode(16, _ExplorePaths2.default, {
	      'definitions': definitions,
	      'paths': Object.keys(paths).filter(function (path) {
	        return Object.keys(paths[path]).some(function (method) {
	          return paths[path][method].tags.indexOf(tag.name) >= 0;
	        });
	      }).reduce(function (pathsDict, taggedPath) {
	        return Object.assign(pathsDict, _defineProperty({}, taggedPath, paths[taggedPath]));
	      }, {})
	    })]);
	  }));
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = ExplorePaths;
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	var _Path = __webpack_require__(10);
	
	var _Path2 = _interopRequireDefault(_Path);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createVNode = _inferno2.default.createVNode;
	function ExplorePaths(_ref) {
	  var paths = _ref.paths,
	      definitions = _ref.definitions;
	
	  return createVNode(2, 'ul', null, Object.keys(paths).map(function (path) {
	    return createVNode(16, _Path2.default, {
	      'pathName': path,
	      'path': paths[path],
	      'definitions': definitions
	    });
	  }));
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	var _infernoComponent = __webpack_require__(6);
	
	var _infernoComponent2 = _interopRequireDefault(_infernoComponent);
	
	var _PathDetail = __webpack_require__(11);
	
	var _PathDetail2 = _interopRequireDefault(_PathDetail);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var createVNode = _inferno2.default.createVNode;
	
	var Path = function (_Component) {
	  _inherits(Path, _Component);
	
	  function Path() {
	    _classCallCheck(this, Path);
	
	    var _this = _possibleConstructorReturn(this, (Path.__proto__ || Object.getPrototypeOf(Path)).call(this));
	
	    _this.state = {
	      expanded: false
	    };
	
	    _this.visibleClass = "path-detail-container path-detail-container-visible";
	    _this.invisibleClass = "path-detail-container path-detail-container-invisible";
	    return _this;
	  }
	
	  _createClass(Path, [{
	    key: 'getPathDetailContainerClass',
	    value: function getPathDetailContainerClass() {
	      return this.state.expanded ? this.visibleClass : this.invisibleClass;
	    }
	  }, {
	    key: 'togglePathDetail',
	    value: function togglePathDetail() {
	      this.setState({ expanded: !this.state.expanded });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return createVNode(2, 'li', null, [createVNode(2, 'h4', null, this.props.pathName), createVNode(16, _PathDetail2.default, {
	        'className': this.getPathDetailContainerClass(),
	        'path': this.props.path,
	        'definitions': this.props.definitions
	      })], {
	        'onClick': this.togglePathDetail.bind(this)
	      });
	    }
	  }]);
	
	  return Path;
	}(_infernoComponent2.default);
	
	exports.default = Path;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = PathDetail;
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createVNode = _inferno2.default.createVNode; /*
	                                                  *
	                                                            {"put":{"consumes":["application/json"],"parameters":[{"in":"body","name":"CartModel","required":false,"schema":{"$ref":"#/definitions/CartModel"}}],"produces":["application/json"],"responses":{"default":{"description":""}},"tags":["api"]}}
	                                                 
	                                                           {"get":{"parameters":[{"default":1,"in":"query","name":"page","required":false,"type":"integer"},{"default":50,"in":"query","maximum":1000,"name":"limit","required":false,"type":"integer"},{"default":0,"in":"query","minimum":0,"name":"offset","required":false,"type":"integer"},{"default":"id","in":"query","name":"sort","required":false,"type":"string"},{"default":"asc","in":"query","name":"order","required":false,"type":"string"}],"produces":["application/json"],"responses":{"default":{"description":""}},"tags":["api"]}}
	                                                 
	                                                 */
	
	function PathDetail(_ref) {
	  var className = _ref.className,
	      path = _ref.path,
	      definitions = _ref.definitions;
	
	  return createVNode(2, 'div', {
	    'className': className
	  }, 'detail');
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(13);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*!
	 * inferno-devtools v1.0.0-beta42
	 * (c) 2016 Dominic Gannaway
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(__webpack_require__(2), __webpack_require__(7)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.Inferno, global.Inferno.Component);
	})(undefined, function (inferno, Component) {
	    'use strict';
	
	    Component = 'default' in Component ? Component['default'] : Component;
	
	    // this is MUCH faster than .constructor === Array and instanceof Array
	    // in Node 7 and the later versions of V8, slower in older versions though
	    var isArray = Array.isArray;
	    function isStatefulComponent(o) {
	        return !isUndefined(o.prototype) && !isUndefined(o.prototype.render);
	    }
	    function isStringOrNumber(obj) {
	        return isString(obj) || isNumber(obj);
	    }
	
	    function isInvalid(obj) {
	        return isNull(obj) || obj === false || isTrue(obj) || isUndefined(obj);
	    }
	
	    function isString(obj) {
	        return typeof obj === 'string';
	    }
	    function isNumber(obj) {
	        return typeof obj === 'number';
	    }
	    function isNull(obj) {
	        return obj === null;
	    }
	    function isTrue(obj) {
	        return obj === true;
	    }
	    function isUndefined(obj) {
	        return obj === undefined;
	    }
	    function isObject(o) {
	        return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object';
	    }
	
	    function findVNodeFromDom(vNode, dom) {
	        if (!vNode) {
	            var roots = inferno.options.roots;
	            for (var i = 0; i < roots.length; i++) {
	                var root = roots[i];
	                var result = findVNodeFromDom(root.input, dom);
	                if (result) {
	                    return result;
	                }
	            }
	        } else {
	            if (vNode.dom === dom) {
	                return vNode;
	            }
	            var flags = vNode.flags;
	            var children = vNode.children;
	            if (flags & 28 /* Component */) {
	                    children = children._lastInput || children;
	                }
	            if (children) {
	                if (isArray(children)) {
	                    for (var i$1 = 0; i$1 < children.length; i$1++) {
	                        var child = children[i$1];
	                        if (child) {
	                            var result$1 = findVNodeFromDom(child, dom);
	                            if (result$1) {
	                                return result$1;
	                            }
	                        }
	                    }
	                } else if (isObject(children)) {
	                    var result$2 = findVNodeFromDom(children, dom);
	                    if (result$2) {
	                        return result$2;
	                    }
	                }
	            }
	        }
	    }
	    var instanceMap = new Map();
	    function getKeyForVNode(vNode) {
	        var flags = vNode.flags;
	        if (flags & 4 /* ComponentClass */) {
	                return vNode.children;
	            } else {
	            return vNode.dom;
	        }
	    }
	    function getInstanceFromVNode(vNode) {
	        var key = getKeyForVNode(vNode);
	        return instanceMap.get(key);
	    }
	    function createInstanceFromVNode(vNode, instance) {
	        var key = getKeyForVNode(vNode);
	        instanceMap.set(key, instance);
	    }
	    function deleteInstanceForVNode(vNode) {
	        var key = getKeyForVNode(vNode);
	        instanceMap.delete(key);
	    }
	    /**
	     * Create a bridge for exposing Inferno's component tree to React DevTools.
	     *
	     * It creates implementations of the interfaces that ReactDOM passes to
	     * devtools to enable it to query the component tree and hook into component
	     * updates.
	     *
	     * See https://github.com/facebook/react/blob/59ff7749eda0cd858d5ee568315bcba1be75a1ca/src/renderers/dom/ReactDOM.js
	     * for how ReactDOM exports its internals for use by the devtools and
	     * the `attachRenderer()` function in
	     * https://github.com/facebook/react-devtools/blob/e31ec5825342eda570acfc9bcb43a44258fceb28/backend/attachRenderer.js
	     * for how the devtools consumes the resulting objects.
	     */
	    function createDevToolsBridge() {
	        var ComponentTree = {
	            getNodeFromInstance: function getNodeFromInstance(instance) {
	                return instance.node;
	            },
	            getClosestInstanceFromNode: function getClosestInstanceFromNode(dom) {
	                var vNode = findVNodeFromDom(null, dom);
	                return vNode ? updateReactComponent(vNode, null) : null;
	            }
	        };
	        // Map of root ID (the ID is unimportant) to component instance.
	        var roots = {};
	        findRoots(roots);
	        var Mount = {
	            _instancesByReactRootID: roots,
	            _renderNewRootComponent: function _renderNewRootComponent(instance) {}
	        };
	        var Reconciler = {
	            mountComponent: function mountComponent(instance) {},
	            performUpdateIfNecessary: function performUpdateIfNecessary(instance) {},
	            receiveComponent: function receiveComponent(instance) {},
	            unmountComponent: function unmountComponent(instance) {}
	        };
	        /** Notify devtools that a new component instance has been mounted into the DOM. */
	        var componentAdded = function componentAdded(vNode) {
	            var instance = updateReactComponent(vNode, null);
	            if (isRootVNode(vNode)) {
	                instance._rootID = nextRootKey(roots);
	                roots[instance._rootID] = instance;
	                Mount._renderNewRootComponent(instance);
	            }
	            visitNonCompositeChildren(instance, function (childInst) {
	                if (childInst) {
	                    childInst._inDevTools = true;
	                    Reconciler.mountComponent(childInst);
	                }
	            });
	            Reconciler.mountComponent(instance);
	        };
	        /** Notify devtools that a component has been updated with new props/state. */
	        var componentUpdated = function componentUpdated(vNode) {
	            var prevRenderedChildren = [];
	            visitNonCompositeChildren(getInstanceFromVNode(vNode), function (childInst) {
	                prevRenderedChildren.push(childInst);
	            });
	            // Notify devtools about updates to this component and any non-composite
	            // children
	            var instance = updateReactComponent(vNode, null);
	            Reconciler.receiveComponent(instance);
	            visitNonCompositeChildren(instance, function (childInst) {
	                if (!childInst._inDevTools) {
	                    // New DOM child component
	                    childInst._inDevTools = true;
	                    Reconciler.mountComponent(childInst);
	                } else {
	                    // Updated DOM child component
	                    Reconciler.receiveComponent(childInst);
	                }
	            });
	            // For any non-composite children that were removed by the latest render,
	            // remove the corresponding ReactDOMComponent-like instances and notify
	            // the devtools
	            prevRenderedChildren.forEach(function (childInst) {
	                if (!document.body.contains(childInst.node)) {
	                    deleteInstanceForVNode(childInst.vNode);
	                    Reconciler.unmountComponent(childInst);
	                }
	            });
	        };
	        /** Notify devtools that a component has been unmounted from the DOM. */
	        var componentRemoved = function componentRemoved(vNode) {
	            var instance = updateReactComponent(vNode, null);
	            visitNonCompositeChildren(function (childInst) {
	                deleteInstanceForVNode(childInst.vNode);
	                Reconciler.unmountComponent(childInst);
	            });
	            Reconciler.unmountComponent(instance);
	            deleteInstanceForVNode(vNode);
	            if (instance._rootID) {
	                delete roots[instance._rootID];
	            }
	        };
	        return {
	            componentAdded: componentAdded,
	            componentUpdated: componentUpdated,
	            componentRemoved: componentRemoved,
	            ComponentTree: ComponentTree,
	            Mount: Mount,
	            Reconciler: Reconciler
	        };
	    }
	    function isRootVNode(vNode) {
	        for (var i = 0; i < inferno.options.roots.length; i++) {
	            var root = inferno.options.roots[i];
	            if (root.input === vNode) {
	                return true;
	            }
	        }
	    }
	    /**
	     * Update (and create if necessary) the ReactDOMComponent|ReactCompositeComponent-like
	     * instance for a given Inferno component instance or DOM Node.
	     */
	    function updateReactComponent(vNode, parentDom) {
	        if (!vNode) {
	            return null;
	        }
	        var flags = vNode.flags;
	        var newInstance;
	        if (flags & 28 /* Component */) {
	                newInstance = createReactCompositeComponent(vNode, parentDom);
	            } else {
	            newInstance = createReactDOMComponent(vNode, parentDom);
	        }
	        var oldInstance = getInstanceFromVNode(vNode);
	        if (oldInstance) {
	            Object.assign(oldInstance, newInstance);
	            return oldInstance;
	        }
	        createInstanceFromVNode(vNode, newInstance);
	        return newInstance;
	    }
	    function normalizeChildren(children, dom) {
	        if (isArray(children)) {
	            return children.filter(function (child) {
	                return !isInvalid(child);
	            }).map(function (child) {
	                return updateReactComponent(child, dom);
	            });
	        } else {
	            return !isInvalid(children) ? [updateReactComponent(children, dom)] : [];
	        }
	    }
	    /**
	     * Create a ReactDOMComponent-compatible object for a given DOM node rendered
	     * by Inferno.
	     *
	     * This implements the subset of the ReactDOMComponent interface that
	     * React DevTools requires in order to display DOM nodes in the inspector with
	     * the correct type and properties.
	     */
	    function createReactDOMComponent(vNode, parentDom) {
	        var flags = vNode.flags;
	        if (flags & 4096 /* Void */) {
	                return null;
	            }
	        var type = vNode.type;
	        var children = vNode.children;
	        var props = vNode.props;
	        var dom = vNode.dom;
	        var isText = flags & 1 /* Text */ || isStringOrNumber(vNode);
	        return {
	            _currentElement: isText ? children || vNode : {
	                type: type,
	                props: props
	            },
	            _renderedChildren: !isText && normalizeChildren(children, dom),
	            _stringText: isText ? children || vNode : null,
	            _inDevTools: false,
	            node: dom || parentDom,
	            vNode: vNode
	        };
	    }
	    function normalizeKey(key) {
	        if (key && key[0] === '.') {
	            return null;
	        }
	    }
	    /**
	     * Return a ReactCompositeComponent-compatible object for a given Inferno
	     * component instance.
	     *
	     * This implements the subset of the ReactCompositeComponent interface that
	     * the DevTools requires in order to walk the component tree and inspect the
	     * component's properties.
	     *
	     * See https://github.com/facebook/react-devtools/blob/e31ec5825342eda570acfc9bcb43a44258fceb28/backend/getData.js
	     */
	    function createReactCompositeComponent(vNode, parentDom) {
	        var type = vNode.type;
	        var instance = vNode.children;
	        var lastInput = instance._lastInput || instance;
	        var dom = vNode.dom;
	        return {
	            getName: function getName() {
	                return typeName(type);
	            },
	            _currentElement: {
	                type: type,
	                key: normalizeKey(vNode.key),
	                ref: null,
	                props: vNode.props
	            },
	            props: instance.props,
	            state: instance.state,
	            forceUpdate: instance.forceUpdate.bind(instance),
	            setState: instance.setState.bind(instance),
	            node: dom,
	            _instance: instance,
	            _renderedComponent: updateReactComponent(lastInput, dom),
	            vNode: vNode
	        };
	    }
	    function nextRootKey(roots) {
	        return '.' + Object.keys(roots).length;
	    }
	    /**
	     * Visit all child instances of a ReactCompositeComponent-like object that are
	     * not composite components (ie. they represent DOM elements or text)
	     */
	    function visitNonCompositeChildren(component, visitor) {
	        if (component._renderedComponent) {
	            if (!component._renderedComponent._component) {
	                visitor(component._renderedComponent);
	                visitNonCompositeChildren(component._renderedComponent, visitor);
	            }
	        } else if (component._renderedChildren) {
	            component._renderedChildren.forEach(function (child) {
	                if (child) {
	                    visitor(child);
	                    if (!child._component) {
	                        visitNonCompositeChildren(child, visitor);
	                    }
	                }
	            });
	        }
	    }
	    /**
	     * Return the name of a component created by a `ReactElement`-like object.
	     */
	    function typeName(type) {
	        if (typeof type === 'function') {
	            return type.displayName || type.name;
	        }
	        return type;
	    }
	    /**
	     * Find all root component instances rendered by Inferno in `node`'s children
	     * and add them to the `roots` map.
	     */
	    function findRoots(roots) {
	        inferno.options.roots.forEach(function (root) {
	            roots[nextRootKey(roots)] = updateReactComponent(root.input, null);
	        });
	    }
	
	    var functionalComponentWrappers = new Map();
	    function wrapFunctionalComponent(vNode) {
	        var originalRender = vNode.type;
	        var name = vNode.type.name || 'Function (anonymous)';
	        var wrappers = functionalComponentWrappers;
	        if (!wrappers.has(originalRender)) {
	            var wrapper = function (Component$$1) {
	                function wrapper() {
	                    Component$$1.apply(this, arguments);
	                }
	
	                if (Component$$1) wrapper.__proto__ = Component$$1;
	                wrapper.prototype = Object.create(Component$$1 && Component$$1.prototype);
	                wrapper.prototype.constructor = wrapper;
	
	                wrapper.prototype.render = function render(props, state, context) {
	                    return originalRender(props, context);
	                };
	
	                return wrapper;
	            }(Component);
	            // Expose the original component name. React Dev Tools will use
	            // this property if it exists or fall back to Function.name
	            // otherwise.
	            /* tslint:disable */
	            wrapper['displayName'] = name;
	            /* tslint:enable */
	            wrappers.set(originalRender, wrapper);
	        }
	        vNode.type = wrappers.get(originalRender);
	        vNode.ref = null;
	        vNode.flags = 4 /* ComponentClass */;
	    }
	    // Credit: this based on on the great work done with Preact and its devtools
	    // https://github.com/developit/preact/blob/master/devtools/devtools.js
	    function initDevTools() {
	        /* tslint:disable */
	        if (typeof window['__REACT_DEVTOOLS_GLOBAL_HOOK__'] === 'undefined') {
	            /* tslint:enable */
	            // React DevTools are not installed
	            return;
	        }
	        var nextVNode = inferno.options.createVNode;
	        inferno.options.createVNode = function (vNode) {
	            var flags = vNode.flags;
	            if (flags & 28 /* Component */ && !isStatefulComponent(vNode.type)) {
	                wrapFunctionalComponent(vNode);
	            }
	            if (nextVNode) {
	                return nextVNode(vNode);
	            }
	        };
	        // Notify devtools when preact components are mounted, updated or unmounted
	        var bridge = createDevToolsBridge();
	        var nextAfterMount = inferno.options.afterMount;
	        inferno.options.afterMount = function (vNode) {
	            bridge.componentAdded(vNode);
	            if (nextAfterMount) {
	                nextAfterMount(vNode);
	            }
	        };
	        var nextAfterUpdate = inferno.options.afterUpdate;
	        inferno.options.afterUpdate = function (vNode) {
	            bridge.componentUpdated(vNode);
	            if (nextAfterUpdate) {
	                nextAfterUpdate(vNode);
	            }
	        };
	        var nextBeforeUnmount = inferno.options.beforeUnmount;
	        inferno.options.beforeUnmount = function (vNode) {
	            bridge.componentRemoved(vNode);
	            if (nextBeforeUnmount) {
	                nextBeforeUnmount(vNode);
	            }
	        };
	        // Notify devtools about this instance of "React"
	        /* tslint:disable */
	        window['__REACT_DEVTOOLS_GLOBAL_HOOK__'].inject(bridge);
	        /* tslint:enable */
	        return function () {
	            inferno.options.afterMount = nextAfterMount;
	            inferno.options.afterUpdate = nextAfterUpdate;
	            inferno.options.beforeUnmount = nextBeforeUnmount;
	        };
	    }
	
	    initDevTools();
	});

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map