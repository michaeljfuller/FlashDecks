export default {
  "name": "FlashDecks",
  "slug": "FlashDecks",
  "scheme": "fdecks",
  "description": "An app for creating and sharing flash cards.",
  "platforms": [ "android", "web" ],
  "version": "1.0.0",
  "orientation": "default",
  "icon": "./assets/icon.png",
  "splash": {
    "image": "./assets/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#eeeeee"
  },
  "updates": {
    "fallbackToCacheTimeout": 0
  },
  "assetBundlePatterns": [
    "**/*"
  ],
  "android": {
    "package": "io.github.michaeljfuller.flashdecks",
    "versionCode": 1
  },
  extra: require("./scripts/getProcessedEnvVars")(".env"),
};
