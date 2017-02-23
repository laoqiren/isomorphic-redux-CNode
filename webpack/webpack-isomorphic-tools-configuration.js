const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

module.exports = 
{
  webpack_assets_file_path: 'webpack/webpack-assets.json',
  webpack_stats_file_path: 'webpack/webpack-stats.json',
  assets:
  {
      images:
    {
      extensions: ['png', 'jpg', 'gif', 'ico', 'svg']
    },
    style_modules: {
      extensions: ['scss','css'],
      filter: function(module, regex, options, log) {
        if (options.development) {
          // in development mode there's webpack "style-loader",
          // so the module.name is not equal to module.name
          return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
        } else {
          // in production mode there's no webpack "style-loader",
          // so the module.name will be equal to the asset path
          return regex.test(module.name);
        }
      },
      path: function(module, options, log) {
        if (options.development) {
          // in development mode there's webpack "style-loader",
          // so the module.name is not equal to module.name
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
        } else {
          // in production mode there's no webpack "style-loader",
          // so the module.name will be equal to the asset path
          return module.name;
        }
      },
      parser: function(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
        } else {
          // in production mode there's Extract Text Loader which extracts CSS text away
          return module.source;
        }
      }
    }
  }
}