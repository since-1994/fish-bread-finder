import React, { useState, useEffect, useRef } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import { useParams, useNavigate } from "react-router-dom";
import markerImageSrc from "../../static/images/defaultMarker-3.png";
import styles from "./index.module.scss";

const Place: React.FC = function () {
  const [place, setPlace] = useState<any>(null);
  const params = useParams();
  const navigate = useNavigate();
  const map = useRef<any>(undefined);

  useEffect(() => {
    const container = document.getElementById("map");

    async function init() {
      const dbRef = ref(getDatabase());

      const snapshot = await get(child(dbRef, `places/${params.uniqueId}`));

      try {
        if (snapshot.exists()) {
          const place = snapshot.val();

          setPlace(place);

          console.log(place);

          const options = {
            center: new window.kakao.maps.LatLng(
              place.position.lat,
              place.position.lng
            ),
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
          const markerPosition = new window.kakao.maps.LatLng(
            place.position.lat,
            place.position.lng
          );

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
        } else {
          navigate("/");
        }
      } catch (e) {
        setPlace(null);
        navigate("/");
      }
    }

    init();
  }, [navigate, params.uniqueId]);

  return (
    <div className={styles["place"]}>
      <div id="map" style={{ width: "100vw", height: "30vh" }} />
      {place && (
        <div className={styles["place__wrapper"]}>
          <div className={styles["place__summary"]}>
            <h1>{place.placeName}</h1>
            <div className={styles["place__communication"]}>
              <a href="" onClick={(e) => e.preventDefault()}>
                <i className="fas fa-share-alt-square"></i>공유하기
              </a>
              <span className={styles["place__communication-split"]}>|</span>
              <a href="" onClick={(e) => e.preventDefault()}>
                <i className="fas fa-sack-dollar"></i>송금하기
              </a>
            </div>
          </div>

          <div className={styles["place__inner"]}>1</div>
        </div>
      )}
    </div>
  );
};

export default Place;
