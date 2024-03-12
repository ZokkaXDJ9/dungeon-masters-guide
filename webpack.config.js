const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Your entry point
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output file
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/, // Match js and jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use babel-loader for JavaScript/JSX files
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Presets for JavaScript and React
          },
        },
      },
      {
        test: /\.css$/, // Match CSS files
        use: ['style-loader', 'css-loader'], // Use style-loader and css-loader for CSS files
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // HTML template to use
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these extensions
  },
  devServer: {
    static: path.join(__dirname, 'dist'), // Serve files from dist directory
    port: 3000, // Port to run the dev server
    open: true, // Open the browser
  },
};
