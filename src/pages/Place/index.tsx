import React, { useState, useEffect, useRef } from "react";
import {
  getDatabase,
  ref,
  child,
  get,
  push,
  query,
  equalTo,
  orderByChild,
} from "firebase/database";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import firebaseApp from "../../firebase/index";
import markerImageSrc from "../../static/images/defaultMarker-3.png";
import styles from "./index.module.scss";
import Grade from "../../components/Grade";

const Place: React.FC = function () {
  const [place, setPlace] = useState<any>(null);
  const params = useParams();
  const navigate = useNavigate();
  const map = useRef<any>(undefined);
  const inputRef = useRef<any>(null);
  const [grade, setGrade] = useState(1);
  const [review, setReview] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewList, setReviewList] = useState<any>([]);

  useEffect(() => {
    if (inputRef.current) {
      // inputRef.current.focus();
    }
  });

  useEffect(() => {
    const dbRef = ref(getDatabase());

    get(child(dbRef, `reviews/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setReviewList(
            Object.entries(snapshot.val())
              .map((item) => {
                return {
                  uniqueId: item[0],
                  ...Object.assign({}, item[1]),
                };
              })
              .filter((review) => review.uniqueId === params.uniqueId)
          );
        } else {
        }
      })
      .catch((error) => {})
      .finally(() => {});
  });

  useEffect(() => {
    const container = document.getElementById("map");

    async function init() {
      const dbRef = ref(getDatabase());

      const snapshot = await get(child(dbRef, `places/${params.uniqueId}`));

      try {
        if (snapshot.exists()) {
          const place = snapshot.val();

          setPlace(place);

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

  const onChangeGrade = (num: any) => {
    setGrade(num);
  };

  const onChangeReview = (e: any) => {
    setReview(e.target.value);
  };

  const onSumbit = async (e: any) => {
    e.preventDefault();

    try {
      const weeks = ["일", "월", "화", "수", "목", "금", "토"];

      if (!review.length) {
        alert("리뷰를 필수 입력하세요.");
        return;
      }

      setReviewLoading(true);

      const date = new Date();

      await push(ref(firebaseApp.db, "reviews/"), {
        review,
        grade,
        date: `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${
          weeks[date.getDay()]
        }`,
        uniqueId: params.uniqueId,
      });
    } catch (e) {
    } finally {
      setTimeout(() => {
        setReviewLoading(false);
      }, 2000);
    }
  };

  return (
    <div className={styles["place"]}>
      <div id="map" style={{ height: "30vh" }} />
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

          <div className={styles["place__inner"]}>
            <div className={styles["place__title"]}>
              <h2>가게 정보</h2>
            </div>

            <div className={styles["place__info"]}>
              <div className={styles["place__info-item"]}>
                <div className={styles["place__info-name"]}>출몰 시기</div>
                <ul className={styles["place__info-days"]}>
                  {place.days.includes("MONDAY") && <li key="월">월</li>}
                  {place.days.includes("TUESDAY") && <li key="화">화</li>}
                  {place.days.includes("WEDNESDAY") && <li key="수">수</li>}
                  {place.days.includes("THURSDAY") && <li key="목">목</li>}
                  {place.days.includes("FRIDAY") && <li key="금">금</li>}
                  {place.days.includes("SATURDAY") && <li key="토">토</li>}
                  {place.days.includes("SUNDAY") && <li key="일">일</li>}
                </ul>
              </div>
              <div className={styles["place__info-item"]}>
                <div className={styles["place__info-name"]}>결제방식</div>
                <ul className={styles["place__info-payments"]}>
                  <li
                    className={
                      place.payments.includes("CASH")
                        ? styles["place__info-payments--active"]
                        : ""
                    }
                  >
                    현금
                  </li>
                  <li
                    className={
                      place.payments.includes("ACCOUNT_TRANSFER")
                        ? styles["place__info-payments--active"]
                        : ""
                    }
                  >
                    계좌이체
                  </li>
                  <li
                    className={
                      place.payments.includes("CARD")
                        ? styles["place__info-payments--active"]
                        : ""
                    }
                  >
                    카드
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles["place__title"]}>
              <h2>가게 사진</h2>
              <button className={styles["place__btn"]}>사진제보</button>
            </div>

            {place.thumbnailUrl ? (
              <div className={styles["place__picture"]}>
                <img src={place.thumbnailUrl} alt="" />
              </div>
            ) : null}

            <div className={styles["place__title"]}>
              <h2>리뷰</h2>
            </div>

            <form className={styles["place__review"]} onSubmit={onSumbit}>
              {reviewLoading ? (
                <Loading visible={true} />
              ) : (
                <>
                  <input type="text" ref={inputRef} onChange={onChangeReview} />
                  <div className={styles["place__review-controls"]}>
                    <Grade
                      num={grade}
                      onClick={onChangeGrade}
                      fontSize="26px"
                    />
                    <button type="submit" className={styles["place__btn"]}>
                      작성하기
                    </button>
                  </div>
                </>
              )}
            </form>

            <ul className={styles["place__review-lists"]}>
              {reviewList.map((review: any) => (
                <li>
                  <Grade num={2} onClick={() => {}} fontSize="16px" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Place;
