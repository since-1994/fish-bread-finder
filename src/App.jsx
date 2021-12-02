import React from 'react';
import AddItemButton from './components/AddItemButton/AddItemButton';
import AppHeader from './components/AppHeader/AppHeader';
import KakaoMap from './components/KakaoMap/KakaoMap';
import Layer from './components/Layer';
import InputGroup from './components/InputGroup';

const App = function () {
  return (
    <>
      <AppHeader />
      <KakaoMap />
      <AddItemButton />
      <Layer visible>
        <form>
          <h2>가게 공유</h2>
          <InputGroup>
            <label htmlFor="place-name">
              가게 이름 (필수)
              <input
                type="text"
                id="place-name"
                placeholder="ex) 구로디지털단지역 2번 출구"
              />
            </label>
          </InputGroup>
          <InputGroup>
            <label htmlFor>
              가게 형태
              <select>
                <option value="street">길거리</option>
                <option value="store">매장</option>
                <option value="Convenience">편의점</option>
              </select>
            </label>
          </InputGroup>
        </form>
      </Layer>
    </>
  );
};

export default App;
