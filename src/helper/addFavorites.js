import { deleteField, doc, getDoc, updateDoc } from '@firebase/firestore';
import { db } from '../firebase';

const addFavorites = async ({ data, typename, authCheck }) => {
  if (!authCheck) {
    throw new Error('Sign Up to keep track of your Favroites');
  }
  data = {
    title: data.title,
    mal_id: data.mal_id,
    score: data.score,
    start_date: data.start_date,
    end_date: data.end_date,
    image_url: data.image_url,
    type: data.type,
  };
  const docRef = doc(db, 'users', authCheck);

  await getDoc(docRef)
    .then(async (res) => {
      const resData = res.data();

      let exist = Object.keys(resData.favorites).find(
        (fav) => fav === `${typename}:${data.mal_id}`,
      );

      const updatedValue = exist
        ? {
            [`favorites.${exist}`]: deleteField(),
          }
        : {
            favorites: {
              ...resData.favorites,
              [`${typename}:${data.mal_id}`]: data,
            },
          };

      await updateDoc(docRef, updatedValue);
    })
    .catch((err) => console.log(err));
  return 'success';
};

export default addFavorites;
