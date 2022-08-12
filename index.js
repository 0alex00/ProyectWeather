/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Home from './src/home/Home'
import HomeF from './src/home/HomeF'

AppRegistry.registerComponent(appName, () => Home);
