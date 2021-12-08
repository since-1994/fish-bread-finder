import { getDatabase, ref, child, get, push } from "firebase/database";
import firebase from "./index";

const COLLECTION_NAME = `place/`;

const db = getDatabase();
const dbRef = ref(db);

export const getPlaceById = (id: string | undefined) =>
  get(child(dbRef, `${COLLECTION_NAME}${id}`));

export interface I_PLACE_ITEM {
  name: string;
  payments: string[];
  days: string[];
  menuTypes: string[];
  position: {
    lat: number;
    lon: number;
  };
  thumbnailUrl: string;
}

export const createPlace = ({
  name,
  payments,
  days,
  menuTypes,
  position,
  thumbnailUrl,
}: I_PLACE_ITEM) =>
  push(ref(firebase.db, COLLECTION_NAME), {
    name,
    payments,
    days,
    menuTypes,
    position,
    thumbnailUrl,
  });
