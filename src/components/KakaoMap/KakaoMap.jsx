/* eslint-disable no-undef */
import React, { useEffect } from 'react';

const KakaoMap = function () {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        const {
          coords: { latitude: lat, longitude: lon },
        } = position;
        console.log(lat, lon);
        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(lat, lon),
          // 지도의 레벨(확대, 축소 정도)
          level: 4,
        };
        // 지도 생성 및 객체 리턴
        // eslint-disable-next-line no-new
        new kakao.maps.Map(container, options);
      },
      () => {
        console.log('err');
      },
    );
  });

  return <div id="map" style={{ width: '100vw', height: '100vh' }} />;
};

export default KakaoMap;
