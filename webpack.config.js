const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx', // Входной файл
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Расширения для импорта
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Для TypeScript и JSX
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // Для CSS
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // HTML-шаблон
    }),
  ],
  devServer: {
    static: './dist',
    port: 3030, // Порт для локального сервера
    open: true,
  },
};
