import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';
import {name as appName} from './app.json';

declare global {
  interface Console {
    tron: any;
  }
}

let reactotron: any = {log: () => {}};

if (__DEV__) {
  reactotron = Reactotron?.setAsyncStorageHandler(AsyncStorage)
    .configure({
      name: appName,
    })
    .useReactNative({
      asyncStorage: false,
      editor: false,
      overlay: false,
    })
    .connect();

  Reactotron.clear?.();
  console.tron = Reactotron;
}

export default reactotron;
