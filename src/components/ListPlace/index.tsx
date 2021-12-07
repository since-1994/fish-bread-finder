import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import Loading from "../Loading";

import { getDatabase, ref, child, get } from "firebase/database";

const ListPlace = function () {
  const [list, setList] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const dbRef = ref(getDatabase());

    get(child(dbRef, `places/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setList(
            Object.entries(snapshot.val()).map((item) => {
              return {
                uniqueId: item[0],
                ...Object.assign({}, item[1]),
              };
            })
          );
        } else {
          setList([]);
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (error) {
    return <div>에러!</div>;
  }

  return (
    <div className={styles["list-place"]}>
      {loading ? (
        <Loading visible={true} />
      ) : (
        <ul className={styles["list-place__lists"]}>
          {list.map((item: any) => (
            <li
              key={item.uniqueId}
              className={styles["list-place__item"]}
              onClick={() => navigate(`/place/${item.uniqueId}`)}
            >
              <div className={styles["list-place__item-left"]}>
                {item.placeName}
              </div>
              <div className={styles["list-place__item-right"]}>
                <img
                  src={item.thumbnailUrl || "http://placehold.it/100x70"}
                  alt=""
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListPlace;
