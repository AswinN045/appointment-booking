const path = require('path');

module.exports = {
  entry: './src/plugin.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'appointment-booking-plugin.js',
    library: 'AppointmentBookingPlugin',
    libraryTarget: 'window',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/, // Ensure node_modules is excluded
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'production',
  devtool: false, // Disable source maps to avoid source-map-loader issues
};