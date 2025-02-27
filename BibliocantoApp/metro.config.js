const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);
  defaultConfig.resolver.sourceExts.push('cjs'); // Corrige erro do Reanimated
  return defaultConfig;
})();
