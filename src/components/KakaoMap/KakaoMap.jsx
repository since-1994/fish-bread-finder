/* eslint-disable no-undef */
import React, { useEffect } from 'react';

const KakaoMap = function () {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {
          coords: { latitude: lat, longitude: lon },
        } = position;
        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(lat, lon),
          // 지도의 레벨(확대, 축소 정도)
          level: 4,
        };
        // 지도 생성 및 객체 리턴
        // eslint-disable-next-line no-new
        const map = new kakao.maps.Map(container, options);
        console.log(map);

        const marker = new kakao.maps.Marker({
          // 지도 중심좌표에 마커를 생성합니다
          position: map.getCenter(),
        });
        // 지도에 마커를 표시합니다
        marker.setMap(map);
        console.log(marker);

        kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
          // 클릭한 위도, 경도 정보를 가져옵니다
          const latlng = mouseEvent.latLng;

          // 마커 위치를 클릭한 위치로 옮깁니다
          marker.setPosition(latlng);
        });
      },
      () => {
        console.log('err');
      },
    );
  });

  return <div id="map" style={{ width: '100vw', height: '100vh' }} />;
};

export default KakaoMap;
