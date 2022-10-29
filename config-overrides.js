const {configPaths} = require('react-app-rewire-alias')
const {aliasDangerous} = require('react-app-rewire-alias/lib/aliasDangerous')
const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const rewireCssModules = require('react-app-rewire-css-modules');

module.exports = function override (config, env) {
  aliasDangerous({
    ...configPaths('tsconfig.paths.json')
  })(config)
  // config = rewireReactHotLoader(config, env)
  config = rewireCssModules(config, env);
  return config
}
