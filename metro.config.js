// const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// const config = {
//   resolver: {
//     unstable_enablePackageExports: false,
//   },
// };

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);
const { getDefaultConfig } = require('@expo/metro-config');
const config = getDefaultConfig(__dirname);

config.resolver.unstable_enablePackageExports = false;

module.exports = config;
