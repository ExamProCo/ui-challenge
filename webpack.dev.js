const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')

const file = {
  test: /\.(svg|png|jpe?g|gif)$/i,
  loader: 'file-loader',
  options: {
      name: '/[path][name].[ext]',
  },
}

const minicss = {
  test: /\.s[ac]ss$/i,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'sass-loader',
      options: {
        sassOptions: {
          includePaths: [
            path.resolve(__dirname, 'stylesheets')
          ]
        } // sassOptions
      } // options
    }
  ]
}

const namespace_application = {
  target: 'web',
  mode: 'development',
  entry: {
    'application' : path.resolve(__dirname, 'src','stylesheets', 'application.sass'),
  },
  output: {
    path    : path.resolve(__dirname, 'public','stylesheets'),
    filename: '[name]'
  },
  resolve: {
    extensions: ['scss'],
    modules: ['node_modules/']
  },
  node: { __dirname: false },
  plugins: [
    new MiniCssExtractPlugin({ file: '[name].css'}),
    new FileManagerPlugin({
      events: {
        onEnd: {
          delete: [
            path.resolve(__dirname, 'public','stylesheets','application')
          ]
        }
      }
    })

  ],
  module: { rules: [minicss,file] }
}

module.exports = [
  namespace_application
]