import React, { useRef, useEffect, useState } from "react";
import Layer from "../../components/Layer";
import AddPlace from "../../components/AddPlace";
import markerImageSrc from "../../static/images/defaultMarker-3.png";
import styles from "./index.module.scss";
// import AddKakaoMap from '../../components/AddKakaoMap'

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapPosition {
  lat: Number;
  lon: Number;
}

const Add: React.FC = () => {
  const map = useRef<any>(undefined);
  const willAddedPosition = useRef({ lat: 0, lon: 0 });
  const [position, setPosition] = useState<any>({
    lat: 0,
    lon: 0,
  });
  const [layerVisible, setLayerVisible] = useState(false);

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

  async function resetPosition() {
    //   const {lat, lon} = await getCurrentPosition();
    const resetPosition = new window.kakao.maps.LatLng(
      37.57002838826,
      126.97962084516
    );
    map.current.setCenter(resetPosition);
  }

  function handleAddButonClick(e: React.MouseEvent): void {
    const latLng = map.current.getCenter();
    const lat = latLng.getLat();
    const lng = latLng.getLng();

    willAddedPosition.current = { lat, lon: lng };

    setLayerVisible(true);
    console.log(`한경 ! 이 위치 정보를 가져다 써!-> lat:${lat}, lon:${lng}`);

    setPosition({
      lat,
      lng,
    });
  }

  useEffect(() => {
    const container = document.getElementById("add-map");
    (async () => {
      const { lat, lon } = await getCurrentPosition();
      console.log("return 된 값", lat, lon);
      const options = {
        center: new window.kakao.maps.LatLng(lat, lon),
        level: 4,
      };
      map.current = new window.kakao.maps.Map(container, options);

      const imageSrc = markerImageSrc;
      const imageSize = new window.kakao.maps.Size(50, 50);
      const imageOption = { offset: new window.kakao.maps.Point(25, 46.5) };

      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );
      const markerPosition = new window.kakao.maps.LatLng(lat, lon);

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      marker.setMap(map.current);

      window.kakao.maps.event.addListener(
        map.current,
        "center_changed",
        function () {
          const latLng = map.current.getCenter();
          marker.setPosition(latLng);
          //  setWillAddedPosition({
          //    lat: latLng.getLat(),
          //    lon: latLng.getLng()
          //  })
        }
      );
    })();
  });

  return (
    <div>
      <div id="add-map" style={{ width: "100vw", height: "100vh" }} />
      <button className={styles["reset-button"]} onClick={resetPosition}>
        <i className="far fa-crosshairs"></i>
      </button>
      <button
        type="button"
        onClick={handleAddButonClick}
        className={styles["add-button"]}
      >
        이 곳에 추가할래요!
      </button>
      <Layer visible={layerVisible}>
        <AddPlace position={position} />
      </Layer>
    </div>
  );
};

export default Add;
