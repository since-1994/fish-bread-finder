import React from 'react';
import AddItemButton from './components/AddItemButton/AddItemButton';
import AppHeader from './components/AppHeader/AppHeader';
import KakaoMap from './components/KakaoMap/KakaoMap';
import Layer from './components/Layer';

const App = function () {
  return (
    <>
      <AppHeader />
      <KakaoMap />
      <AddItemButton />
      <Layer visible>
        <p>Layer Example</p>
      </Layer>
    </>
  );
};

export default App;
