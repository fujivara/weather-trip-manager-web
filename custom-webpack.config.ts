import { EnvironmentPlugin } from 'webpack';
import { config } from 'dotenv';

config();

module.exports = {
  plugins: [
    new EnvironmentPlugin([
      'WEATHER_API_KEY',
      'WEATHER_API_BASE_URL',
      'API_BASE_URL',
    ]),
  ],
};
