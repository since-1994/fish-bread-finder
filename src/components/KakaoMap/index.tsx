/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Layer from "../Layer";
import markerImageSrc from "../../static/images/defaultMarker-3.png";
import { getDatabase, ref, child, get } from "firebase/database";

declare global {
  interface Window {
    kakao: any;
  }
}

interface kakaoMapProps {
  mode: Number;
}

interface KakaoMapPosition {
  lat: Number;
  lon: Number;
}

const KakaoMap: React.FC<kakaoMapProps> = function ({ mode }) {
  const map = useRef(undefined);
  // const map2 = useRef(undefined);
  const [list, setList] = useState<any[]>([]);
  const [willAddedPosition] = useState<KakaoMapPosition>({ lat: 0, lon: 0 });
  const navigate = useNavigate();

  async function getCurrentPosition(): Promise<KakaoMapPosition> {
    return new Promise<KakaoMapPosition>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {
            coords: { latitude: lat, longitude: lon },
          } = position;

          console.log(lat, lon);

          resolve({ lat, lon });
        },
        () => resolve({ lat: 37.57002838826, lon: 126.97962084516 })
      );
    });
  }

  useEffect(() => {
    const container = document.getElementById("map");

    (async () => {
      const { lat, lon } = await getCurrentPosition();
      console.log(lat, lon);
      const options = {
        center: new window.kakao.maps.LatLng(lat, lon),
        level: 4,
      };
      // eslint-disable-next-line no-new
      map.current = new window.kakao.maps.Map(container, options);

      const dbRef = ref(getDatabase());

      get(child(dbRef, `place/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const stores = Object.entries(snapshot.val()).map((item: any[]) => {
              console.log(item);
              return {
                position: item[1].position,
                placeName: item[1].placeName,
                uniqueId: item[0],
              };
            });

            setList(stores);
            stores.forEach(({ position, placeName, uniqueId }) => {
              console.log(uniqueId);

              const imageSrc = markerImageSrc;
              const imageSize = new window.kakao.maps.Size(50, 50);
              const imageOption = {
                offset: new window.kakao.maps.Point(25, 46.5),
              };

              const markerImage = new window.kakao.maps.MarkerImage(
                imageSrc,
                imageSize,
                imageOption
              );

              const markerPosition = new window.kakao.maps.LatLng(
                position.lat,
                position.lng
              );

              const marker2 = new window.kakao.maps.Marker({
                map: map.current,
                position: markerPosition,
                image: markerImage,
                title: placeName,
                clickable: true,
              });

              window.kakao.maps.event.addListener(marker2, "click", () => {
                console.log(uniqueId);
                navigate(`/place/${uniqueId}/`);
              });
            });
          } else {
            setList([]);
          }
        })
        .catch((error) => {
          // setError(error);
        })
        .finally(() => {
          // setLoading(false);
        });
    })();
  }, [mode]);

  return (
    <>
      <div id="map" style={{ width: "100vw", height: "100vh" }} />
      {mode === 1 && (
        <Layer visible>
          <div id="map2" style={{ width: "50%%", height: "50%" }} />
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
