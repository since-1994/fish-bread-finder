/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from 'react';
import markerImageSrc from '../../static/images/defaultMarker-3.png';


declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapPosition{
  lat: Number;
  lon: Number;
}

const AddKakaoMap: React.FC = function () {
  const map = useRef<any>(undefined);
  // const map2 = useRef(undefined);
  const [willAddedPosition, setWillAddedPosition] = useState<KakaoMapPosition>({lat: 0, lon: 0});

  async function getCurrentPosition(): Promise<KakaoMapPosition> {
      return new Promise<KakaoMapPosition>(resolve => {
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  const {
                  coords: { latitude: lat, longitude: lon },
                  } = position;
      
                  console.log(lat, lon);
      
                  resolve({ lat, lon });
              },
              () => resolve({lat: 37.57002838826, lon: 126.97962084516})
          );
      }) 
  }

  async function resetPosition() {
    const {lat, lon} = await getCurrentPosition();
    console.log(lat, lon);
  }

  useEffect(() => {
    const container = document.getElementById('add-map');
    (async () => {
        const { lat, lon } = await getCurrentPosition();
        console.log('return 된 값', lat, lon);
        const options = {
          center: new window.kakao.maps.LatLng(lat, lon),
          level: 4,
        };
        map.current = new window.kakao.maps.Map(container, options);

        const imageSrc = markerImageSrc;
        const imageSize = new window.kakao.maps.Size(50, 50);
        const imageOption = {offset: new window.kakao.maps.Point(25, 46.5)}

        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
        const markerPosition = new window.kakao.maps.LatLng(lat, lon);

        const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: markerImage
        })

        marker.setMap(map.current);

        window.kakao.maps.event.addListener(map.current, 'center_changed', function() {
         const latLng = map.current.getCenter();
         marker.setPosition(latLng);
        //  setWillAddedPosition({
        //    lat: latLng.getLat(),
        //    lon: latLng.getLng()
        //  })
        });
    })()
  });

  return (
    <>
      <div id="add-map" style={{ width: '100vw', height: '100vh' }} />
    </>
  );
};

export default AddKakaoMap;
