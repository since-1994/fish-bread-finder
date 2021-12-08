import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const COLLECTION_NAME = `image/`;

const storage = getStorage();

export interface I_METADATA {
  contentType: string;
}

export const getDownloadURLByUpload = async (
  file: any,
  metadata: I_METADATA
) => {
  const date = new Date();
  const getTime = date.getTime();

  const imageRef = ref(storage, `${COLLECTION_NAME}${file.name}-${getTime}`);
  const snapshot = await uploadBytesResumable(imageRef, file, metadata);

  return await getDownloadURL(snapshot.ref);
};
