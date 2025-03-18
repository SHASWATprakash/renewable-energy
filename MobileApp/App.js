import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import GlobalProvider from './src/context/GlobalContext';

const App = () => {
  return (
    <GlobalProvider>
      <AppNavigator />
    </GlobalProvider>
  );
};

export default App;
