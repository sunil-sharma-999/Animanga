import { doc, setDoc, Timestamp, updateDoc } from '@firebase/firestore';
import { db } from '../firebase';

const addReview = async ({
  authState,
  username,
  isDocNull,
  collectionName,
  e,
}) => {
  e.preventDefault();
  const formNode = e.target;

  const formData = new FormData(formNode);
  const reviewData = {
    username: username,
    review: formData.get('review'),
  };
  const docRef = doc(db, 'reviews', collectionName);

  if (isDocNull) {
    return await setDoc(docRef, {
      [authState]: { ...reviewData, date: Timestamp.now() },
    });
  } else if (!isDocNull) {
    return await updateDoc(docRef, {
      [authState]: { ...reviewData, date: Timestamp.now() },
    });
  }
};

export default addReview;
