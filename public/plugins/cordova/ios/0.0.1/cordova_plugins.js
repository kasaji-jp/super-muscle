cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-wkwebview-engine.ios-wkwebview-exec",
      "file": "plugins/cordova-plugin-wkwebview-engine/src/www/ios/ios-wkwebview-exec.js",
      "pluginId": "cordova-plugin-wkwebview-engine",
      "clobbers": [
        "cordova.exec"
      ]
    },
    {
      "id": "cordova-plugin-wkwebview-engine.ios-wkwebview",
      "file": "plugins/cordova-plugin-wkwebview-engine/src/www/ios/ios-wkwebview.js",
      "pluginId": "cordova-plugin-wkwebview-engine",
      "clobbers": [
        "window.WkWebView"
      ]
    },
    {
      "id": "cordova-plugin-device.device",
      "file": "plugins/cordova-plugin-device/www/device.js",
      "pluginId": "cordova-plugin-device",
      "clobbers": [
        "device"
      ]
    },
    {
      "id": "cordova-plugin-appinfo-sync.appinfosync",
      "file": "plugins/cordova-plugin-appinfo-sync/www/appinfosync.js",
      "pluginId": "cordova-plugin-appinfo-sync",
      "clobbers": [
        "cordova.appInfoSync"
      ]
    },
    {
      "id": "cordova-plugin-splashscreen.SplashScreen",
      "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
      "pluginId": "cordova-plugin-splashscreen",
      "clobbers": [
        "navigator.splashscreen"
      ]
    },
    {
      "id": "cordova-plugin-statusbar.statusbar",
      "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
      "pluginId": "cordova-plugin-statusbar",
      "clobbers": [
        "window.StatusBar"
      ]
    },
    {
      "id": "cordova-open-native-settings.Settings",
      "file": "plugins/cordova-open-native-settings/www/settings.js",
      "pluginId": "cordova-open-native-settings",
      "clobbers": [
        "cordova.plugins.settings"
      ]
    },
    {
      "id": "cordova-plugin-inappbrowser.inappbrowser",
      "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
      "pluginId": "cordova-plugin-inappbrowser",
      "clobbers": [
        "cordova.InAppBrowser.open",
        "window.open"
      ]
    },
    {
      "id": "cordova-plugin-browsertab.BrowserTab",
      "file": "plugins/cordova-plugin-browsertab/www/browsertab.js",
      "pluginId": "cordova-plugin-browsertab",
      "clobbers": [
        "cordova.plugins.browsertab"
      ]
    },
    {
      "id": "cordova-plugin-keyboard.keyboard",
      "file": "plugins/cordova-plugin-keyboard/www/keyboard.js",
      "pluginId": "cordova-plugin-keyboard",
      "clobbers": [
        "window.Keyboard"
      ]
    },
    {
      "id": "cordova-plugin-camera.Camera",
      "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "Camera"
      ]
    },
    {
      "id": "cordova-plugin-camera.CameraPopoverOptions",
      "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "CameraPopoverOptions"
      ]
    },
    {
      "id": "cordova-plugin-camera.camera",
      "file": "plugins/cordova-plugin-camera/www/Camera.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "navigator.camera"
      ]
    },
    {
      "id": "cordova-plugin-camera.CameraPopoverHandle",
      "file": "plugins/cordova-plugin-camera/www/ios/CameraPopoverHandle.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "CameraPopoverHandle"
      ]
    },
    {
      "id": "cordova-plugin-social-message.SocialMessage",
      "file": "plugins/cordova-plugin-social-message/www/socialmessage.js",
      "pluginId": "cordova-plugin-social-message",
      "clobbers": [
        "socialmessage"
      ]
    },
    {
      "id": "cordova-plugin-taptic-engine.TapticEngine",
      "file": "plugins/cordova-plugin-taptic-engine/www/TapticEngine.js",
      "pluginId": "cordova-plugin-taptic-engine",
      "clobbers": [
        "TapticEngine"
      ]
    },
    {
      "id": "cordova-plugin-keep-awake.KeepAwake",
      "file": "plugins/cordova-plugin-keep-awake/www/KeepAwake.js",
      "pluginId": "cordova-plugin-keep-awake",
      "clobbers": [
        "KeepAwake"
      ]
    },
    {
      "id": "cordova-plugin-crop.CropPlugin",
      "file": "plugins/cordova-plugin-crop/www/crop.js",
      "pluginId": "cordova-plugin-crop",
      "clobbers": [
        "plugins.crop"
      ]
    },
    {
      "id": "cordova-plugin-sso.Sso",
      "file": "plugins/cordova-plugin-sso/www/sso.js",
      "pluginId": "cordova-plugin-sso",
      "clobbers": [
        "sso"
      ]
    },
    {
      "id": "skwas-cordova-plugin-datetimepicker.DateTimePicker",
      "file": "plugins/skwas-cordova-plugin-datetimepicker/www/datetimepicker.js",
      "pluginId": "skwas-cordova-plugin-datetimepicker",
      "clobbers": [
        "cordova.plugins.DateTimePicker"
      ]
    },
    {
      "id": "skwas-cordova-plugin-datetimepicker.utils",
      "file": "plugins/skwas-cordova-plugin-datetimepicker/www/utils.js",
      "pluginId": "skwas-cordova-plugin-datetimepicker"
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-enable-multidex": "0.2.0",
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-wkwebview-engine": "1.1.5-dev",
    "cordova-plugin-wkwebview-inputfocusfix": "1.0.4",
    "cordova-plugin-device": "2.0.3",
    "cordova-plugin-appinfo-sync": "0.2.0",
    "cordova-plugin-splashscreen": "5.0.3",
    "cordova-plugin-statusbar": "2.4.4-dev",
    "cordova-open-native-settings": "1.5.2",
    "cordova-plugin-inappbrowser": "1.7.2",
    "cordova-plugin-compat": "1.2.0",
    "cordova-plugin-browsertab": "0.2.1",
    "cordova-plugin-keyboard": "1.2.0",
    "cordova-plugin-camera": "4.1.0",
    "cordova-plugin-social-message": "0.4.0",
    "cordova-plugin-localization": "0.0.1",
    "cordova-plugin-taptic-engine": "2.1.0",
    "cordova-plugin-add-swift-support": "2.0.2",
    "cordova-plugin-keep-awake": "0.0.1",
    "cordova-plugin-crop": "0.3.1",
    "cordova-plugin-sso": "0.2.8",
    "skwas-cordova-plugin-datetimepicker": "2.1.1"
  };
});