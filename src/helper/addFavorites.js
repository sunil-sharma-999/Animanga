import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from '@firebase/firestore';
import { db } from '../firebase';

const addFavorites = async (data, authCheck) => {
  if (!authCheck) {
    throw new Error('Sign Up to keep track of your Favroites');
  }

  const docRef = doc(db, 'users', authCheck);

  await getDoc(docRef)
    .then(async (res) => {
      const resData = res.data();

      let exist;
      if (!resData.favList) {
        exist = false;
      } else {
        exist =
          !!resData.favList.filter((fav) => fav === data.mal_id).length && true;
      }

      const updatedValue = exist
        ? { favorites: arrayRemove(data), favList: arrayRemove(data.mal_id) }
        : { favorites: arrayUnion(data), favList: arrayUnion(data.mal_id) };

      updateDoc(docRef, updatedValue);
    })
    .catch((err) => console.log(err));

  return await getDoc(docRef);
};

export default addFavorites;
