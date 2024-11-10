 import React, { useEffect, useRef } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import RootNavigation from './navigation/RootNavigation';
import store from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor} from './redux/store';
import { AppState } from 'react-native';
import { checkToken } from './api/user';

const App = () => {
  const appState = useRef(AppState.currentState);
  
  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      if(appState.current.match(/inactive|background/) && nextAppState === 'active'){
        console.log('you come back to the app')
        // we are coming from background to the foreground
        await checkToken()
      }

      appState.current = nextAppState;
    })

    checkToken();
    console.log('application has render')
  }, [])

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;