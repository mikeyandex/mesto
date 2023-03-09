// webpack.config.js
const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключите плагин 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// подключите к проекту mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

module.exports = {
  entry: { main: './src/pages/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
        publicPath: ''
  },

  mode: 'development',

  devServer: {
    static: path.resolve(__dirname, 'dist'),
    open: true,
    compress: true,
    port: 8080
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: { importLoaders: 1 }
        }, 
        'postcss-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash][ext]',
        }
      },
      {
        test: /\.(woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash][ext]',
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ]
}
/*
module.exports = {
  entry: { main: './src/pages/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
        publicPath: ''
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    open: true,
    compress: true,
    port: 8080
  },
  rules: [
    // правила для обработки js, html и других файлов
  
    // добавьте ещё одно правило:
    {
      // применять это правило только к CSS-файлам
      test: /\.css$/,
      // при обработке этих файлов нужно использовать
      // MiniCssExtractPlugin.loader и css-loader
      use: [MiniCssExtractPlugin.loader, {
        loader: 'css-loader'
      }]
    }
  ], 
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // путь к файлу index.html
    }),
    new CleanWebpackPlugin(),
  new MiniCssExtractPlugin() // подключение плагина для объединения файлов
  ] // добавьте массив
  
}

// переписали точку выхода, используя утилиту path */