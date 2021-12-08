import { getDatabase, ref, child, get, push } from "firebase/database";
import firebase from "./index";
import { DAYS, I_DAYS } from "../constants/date";

const COLLECTION_NAME = `review/`;

const dbRef = ref(getDatabase());

export const getReviewList = () => get(child(dbRef, COLLECTION_NAME));

export interface I_REVIEW {
  review: string;
  grade: number;
  uniqueId: string | undefined;
  date?: string;
}

export const createReview = ({ review, grade, uniqueId }: I_REVIEW) => {
  const date = new Date();

  const monday: I_DAYS | undefined = DAYS.pop();
  const days: (I_DAYS | undefined)[] = [monday].concat(DAYS);

  return push(ref(firebase.db, "review/"), {
    review,
    grade,
    date: `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${
      days.map((DAY: I_DAYS | undefined) => DAY?.text)[date.getDay()]
    }`,
    uniqueId,
  });
};
