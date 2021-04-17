module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:react-native-dotenv'],
    ignore: [
      "/node_modules/",
      "/amplify/"
    ],
  };
};
