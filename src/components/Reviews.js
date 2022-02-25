import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { useSelector } from 'react-redux';

const Review = ({
  type,
  reviews: { currentItemReviews, myreview },
  mal_id,
}) => {
  const authState = useSelector((state) => state.authCheck);

  return (
    <div className="text-block mt-4 max-w-screen-lg">
      <p className="text-xl text-white">Reviews</p>
      <hr />
      <div className="reviews flex flex-col my-2 gap-2">
        {!!authState && (
          <Link
            to={`/edit/${type}/${mal_id}`}
            className="bg-purple-700 w-max my-2 px-2 py-1 text-white rounded-sm self-end">
            {!!myreview.review ? 'Update' : 'Add'} Review
          </Link>
        )}

        {!!authState && !!currentItemReviews.length && (
          <div className="reviews-wrap mx-auto w-full flex flex-col gap-4">
            {currentItemReviews.map((re) => {
              return (
                <div
                  key={re.id}
                  className="review bg-white rounded-md text-black px-4 py-2 pb-4 ">
                  <div className="user-info flex items-center">
                    <div className="profile-wrap flex items-center gap-2">
                      <h1 className="name text-lg font-medium">
                        @{re.username}
                      </h1>
                      {re.areYouAuthor && (
                        <Link to="/profile">
                          <CgProfile />
                        </Link>
                      )}
                    </div>
                    <p className="ml-auto">{re.date}</p>
                  </div>
                  <p className="review-data break-all text-gray-600">
                    {re.review}
                  </p>
                </div>
              );
            })}
          </div>
        )}
        {!!authState && !currentItemReviews.length && (
          <p className="text-slate-300 text-lg my-4 text-center">
            No reviews Found
          </p>
        )}
        {!authState && (
          <div className="text-slate-300 text-lg text-center my-4">
            <p>Sign In to Read and Post Reviews</p>
            <p>Join The Community if You Are New Here</p>
            <div>
              {'(☞ﾟヮﾟ)☞'.toString()}
              <Link to="/profile" className="mx-2 border-b-2 border-purple-500">
                Profile
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
