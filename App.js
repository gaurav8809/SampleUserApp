/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {SafeAreaView} from 'react-native';
import RootNavigation from './App/Navigators/RootNavigation';
import AppReducer from './App/AppState/Reducers';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {PersistGate} from 'redux-persist/integration/react';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, AppReducer);
let store = createStore(persistedReducer);
let persistor = persistStore(store);

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{flex: 1}}>
          <RootNavigation />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
