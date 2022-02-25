import { deleteField, doc, getDoc, updateDoc } from '@firebase/firestore';
import { db } from '../firebase';

const addFavorites = async ({ data, typename, authCheck }) => {

  data = {
    title: data.title,
    mal_id: data.mal_id,
    rank: data.rank || data.ranked || null,
    score: data.scored || data.score || null,
    start_date:
      data.start_date || (data.published && data.published.from) || '',
    end_date: data.end_date || (data.published && data.published.to) || '',
    image_url: data.image_url || data.images.webp.image_url || '',
    type: data.type,
  };

  const docRef = doc(db, 'users', authCheck);

  try {
    const res = await getDoc(docRef);
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
  } catch (error) {
    console.log(error);
  }
  return 'success';
};

export default addFavorites;
