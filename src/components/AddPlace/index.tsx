import React, { useState } from "react";
import { ref, push } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import firebaseApp from "../../firebase/index";

import styles from "./index.module.scss";

interface KakaoMapPosition {
  position: {
    lat: Number;
    lon: Number;
  };
}

const AddPlace: React.FC<KakaoMapPosition> = function ({ position }) {
  const [placeName, setPlaceName] = useState<any>("");
  const [payments, setPayments] = useState<any>([]);
  const [days, setDays] = useState<any>([]);
  const [everyDay, setEveryDay] = useState<any>(false);

  const [menuTypes, setMenuTypes] = useState<any>([]);
  const [menuTypesId, setMenuTypesId] = useState<any>(0);
  const [thumbnailUrl, setThumbnailUrl] = useState<any>("");

  const onChangePlaceNmae = (e: any) => {
    setPlaceName(e.target.value);
  };

  // @TODO onChangePayment, onChangeDay 공통화
  const onChangePayment = (type: any) => {
    let newPayments: any;

    if (payments.includes(type)) {
      newPayments = payments.filter((payment: any) => payment !== type);
    } else {
      newPayments = [...payments, type];
    }
    setPayments(newPayments);
  };

  const onChangeDay = (type: any) => {
    let newDays: any;

    if (days.includes(type)) {
      newDays = days.filter((day: any) => day !== type);
    } else {
      newDays = [...days, type];
    }

    setEveryDay(newDays.length === 7);

    setDays(newDays);
  };

  const onChangeEveryDay = () => {
    setEveryDay(!everyDay);

    setDays(
      !everyDay
        ? [
            "MONDAY",
            "TUESDAY",
            "WEDNESDAY",
            "THURSDAY",
            "FRIDAY",
            "SATURDAY",
            "SUNDAY",
          ]
        : []
    );
  };

  const onAddMenu = () => {
    const lastMenu = menuTypes[menuTypes.length - 1];

    if (lastMenu) {
      const { menu_name, price_desc } = lastMenu;

      if (menu_name === "" || price_desc === "") {
        alert("붕어빵 종류를 마저 입력해주세요.");
        return;
      }
    }

    setMenuTypes([
      ...menuTypes,
      {
        id: menuTypesId,
        menu_name: "",
        price_desc: "",
      },
    ]);
    setMenuTypesId(menuTypesId + 1);
  };

  const onChangeMenuType = (index: any, type: any, e: any) => {
    const newMenuTypes = menuTypes;

    newMenuTypes[index][type] = e.target.value;

    setMenuTypes([...newMenuTypes]);
  };

  const onRemoveMenu = (id: any) => {
    const newMenuTypes = menuTypes.filter((menu: any) => menu.id !== id);

    setMenuTypes(newMenuTypes);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (!placeName.length) {
      alert("장소 이름을 작성하세요.");
      return;
    }

    if (!payments.length) {
      alert("결제 수단을 선택해주세요.");
      return;
    }

    if (!days.length) {
      alert("만날 수 있는 시점을 선택해주세요.");
      return;
    }

    if (!menuTypes.length) {
      alert("붕어빵 메뉴를 입력해주세요.");
      return;
    } else {
      for (const menu of menuTypes) {
        if (menu.menu_name === "" || menu.price_desc === "") {
          alert("입력되지 않은 붕어빵 종류가 있습니다.");
          return;
        }
      }
    }

    push(ref(firebaseApp.db, "places/"), {
      placeName,
      payments,
      days,
      menuTypes,
      position,
      thumbnailUrl,
    });
  };

  // @TODO 순서가 지금 조금 잘못됨. 이미지 받아서 미리보기만 보여주고 [추가하기]를 한 경우에만 실제 업로드 해야함
  const onUpload = async (e: any) => {
    const file = e.target.files[0];

    const storage = getStorage();
    const imageRef = storageRef(
      storage,
      `images/${file.name}-${new Date().getTime()}`
    );

    const metadata = {
      contentType: file.type,
    };

    const snapshot = await uploadBytesResumable(imageRef, file, metadata);
    const downloadUrl = await getDownloadURL(snapshot.ref);

    setThumbnailUrl(downloadUrl);
  };

  return (
    <form onSubmit={(e) => onSubmit(e)} className={styles["add-place"]}>
      <h2 className={styles["add-place__title"]}>새로운 장소 추가</h2>
      <div className={styles["add-place__input-group"]}>
        <p className={styles["add-place__description"]}>
          장소 사진을 추가해주세요. (선택)
        </p>
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            className={styles["add-place__thumbnail"]}
            alt="미리보기"
          />
        ) : (
          <div className={styles["add-place__preview"]}>
            <label htmlFor="upload">+</label>
            <input type="file" id="upload" onChange={onUpload} />
          </div>
        )}
      </div>
      <div className={styles["add-place__input-group"]}>
        <p className={styles["add-place__description"]}>
          장소 이름이나 별명을 적어 주세요.
        </p>
        <input
          type="text"
          className={styles["add-place__input"]}
          onChange={onChangePlaceNmae}
        />
      </div>
      <div className={styles["add-place__input-group"]}>
        <p className={styles["add-place__description"]}>
          어떻게 결제할 수 있나요?
        </p>
        <ul className={styles["add-place__select"]}>
          <li
            onClick={() => onChangePayment("CARD")}
            className={`${styles["add-place__select-item"]} ${
              payments.includes("CARD")
                ? styles["add-place__select--active"]
                : ""
            }`}
          >
            카드
          </li>
          <li
            onClick={() => onChangePayment("CASH")}
            className={`${styles["add-place__select-item"]} ${
              payments.includes("CASH")
                ? styles["add-place__select--active"]
                : ""
            }`}
          >
            현금
          </li>
          <li
            onClick={() => onChangePayment("ACCOUNT_TRANSFER")}
            className={`${styles["add-place__select-item"]} ${
              payments.includes("ACCOUNT_TRANSFER")
                ? styles["add-place__select--active"]
                : ""
            }`}
          >
            계좌이체
          </li>
        </ul>
      </div>
      <div className={styles["add-place__input-group"]}>
        <p className={styles["add-place__description"]}>언제 만날 수 있나요?</p>
        <ul className={styles["add-place__select"]}>
          <li
            onClick={() => onChangeEveryDay()}
            className={`${styles["add-place__select-item"]} ${
              everyDay ? styles["add-place__select--active"] : ""
            }`}
          >
            매일
          </li>
          <li
            onClick={() => onChangeDay("MONDAY")}
            className={`${styles["add-place__select-item"]} ${
              days.includes("MONDAY") || everyDay
                ? styles["add-place__select--active"]
                : ""
            }`}
          >
            월
          </li>
          <li
            onClick={() => onChangeDay("TUESDAY")}
            className={`${styles["add-place__select-item"]} ${
              days.includes("TUESDAY") || everyDay
                ? styles["add-place__select--active"]
                : ""
            }`}
          >
            화
          </li>
          <li
            onClick={() => onChangeDay("WEDNESDAY")}
            className={`${styles["add-place__select-item"]} ${
              days.includes("WEDNESDAY") || everyDay
                ? styles["add-place__select--active"]
                : ""
            }`}
          >
            수
          </li>
          <li
            onClick={() => onChangeDay("THURSDAY")}
            className={`${styles["add-place__select-item"]} ${
              days.includes("THURSDAY") || everyDay
                ? styles["add-place__select--active"]
                : ""
            }`}
          >
            목
          </li>
          <li
            onClick={() => onChangeDay("FRIDAY")}
            className={`${styles["add-place__select-item"]} ${
              days.includes("FRIDAY") || everyDay
                ? styles["add-place__select--active"]
                : ""
            }`}
          >
            금
          </li>
          <li
            onClick={() => onChangeDay("SATURDAY")}
            className={`${styles["add-place__select-item"]} ${
              days.includes("SATURDAY") || everyDay
                ? styles["add-place__select--active"]
                : ""
            }`}
          >
            토
          </li>
          <li
            onClick={() => onChangeDay("SUNDAY")}
            className={`${styles["add-place__select-item"]} ${
              days.includes("SUNDAY") || everyDay
                ? styles["add-place__select--active"]
                : ""
            }`}
          >
            일
          </li>
        </ul>
      </div>
      <div className={styles["add-place__input-group"]}>
        <p className={styles["add-place__description"]}>
          어떤 종류의 붕어빵이 있나요?
        </p>
        <button
          type="button"
          onClick={onAddMenu}
          className={styles["add-place__create-btn"]}
        >
          +
        </button>
        <ul className={styles["add-place__menu"]}>
          {menuTypes.map((menu: any, index: any) => (
            <li key={menu.id}>
              <input
                type="text"
                value={menu.menu_name}
                onChange={(e) => onChangeMenuType(index, "menu_name", e)}
                placeholder="ex) 슈크림"
                className={`
                  ${styles["add-place__input"]}
                   ${styles["add-place__input--menu-name"]}
                `}
              />
              <input
                type="text"
                value={menu.price_desc}
                onChange={(e) => onChangeMenuType(index, "price_desc", e)}
                placeholder="ex) 2개 천원"
                className={`
                  ${styles["add-place__input"]}
                   ${styles["add-place__input--menu-price"]}
                `}
              />
              <span
                className={styles["add-place__menu-close"]}
                onClick={() => onRemoveMenu(menu.id)}
              >
                &#935;
              </span>
            </li>
          ))}
        </ul>
      </div>
      <button type="submit" className={styles["add-place__submit"]}>
        추가하기
      </button>
    </form>
  );
};

export default AddPlace;
