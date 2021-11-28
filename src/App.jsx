import React from 'react';
import AppNavBar from './components/AppNavBar';
import AppHeader from './components/AppHeader';
import KakaoMap from './components/KakaoMap/KakaoMap';
import './assets/scss/styles.scss';

const App = function () {
  return (
    <>
      <AppHeader />
      <KakaoMap />
      <AppNavBar />
    </>
  );
};

export default App;
