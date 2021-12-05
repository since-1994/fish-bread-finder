/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Layer from '../Layer';


declare global {
  interface Window {
    kakao: any;
  }
}

interface kakaoMapProps{
  mode: Number
}

interface KakaoMapPosition{
  lat: Number;
  lon: Number;
}


const KakaoMap: React.FC<kakaoMapProps> = function ({ mode }) {
  const map = useRef(undefined);
  // const map2 = useRef(undefined);
  const [willAddedPosition] = useState<KakaoMapPosition>({lat: 0, lon: 0});

  function getCurrentPosition() {
    try{
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {
            coords: { latitude: lat, longitude: lon },
          } = position;
  
          console.log(lat, lon);
  
          return { lat, lon };
        },
        () => ({ lat: 37.57002838826, lon: 126.97962084516 }),
      );
    }catch(e) {
      console.log(e)
    }
    return { lat: 37.57002838826, lon: 126.97962084516 };
  }

  useEffect(() => {
    const container = document.getElementById('map');
    const { lat, lon } = getCurrentPosition();
    console.log(lat, lon);
    const options = {
      center: new window.kakao.maps.LatLng(lat, lon),
      level: 4,
    };
    // eslint-disable-next-line no-new
    map.current = new window.kakao.maps.Map(container, options);
  }, [mode]);

  return (
    <>
      <div id="map" style={{ width: '100vw', height: '100vh' }} />
      {mode === 1 && (
        <Layer visible>
            <div id="map2" style={{ width: '50%%', height: '50%' }} />
            <span>{`경도: ${willAddedPosition.lat} 위도: ${willAddedPosition.lon}`}</span>
            <button type="button">현제 위치 추가하기</button>
        </Layer>
      )}
    </>
  );
};

KakaoMap.propTypes = {
  mode: PropTypes.number.isRequired,
};

export default KakaoMap;
