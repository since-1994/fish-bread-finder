import React from 'react';
import AddItemButton from './components/AddItemButton/AddItemButton';
import AppHeader from './components/AppHeader/AppHeader';
import KakaoMap from './components/KakaoMap/KakaoMap';

const App = function () {
  return (
    <>
      <AppHeader />
      <KakaoMap />
      <AddItemButton />
    </>
  );
};

export default App;
