module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'module:metro-react-native-babel-preset',
      'babel-preset-expo',
    ],
    plugins: [
      ["module:react-native-dotenv", {
        "moduleName": "react-native-dotenv", // So import matches @types/react-native-dotenv
        "allowUndefined": true,
      }],
    ],
    ignore: [
      "/node_modules/",
      "/amplify/"
    ],
  };
};
