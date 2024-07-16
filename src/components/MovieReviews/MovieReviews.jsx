import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../apiService/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMesage/ErrorMessage";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const { results } = await getMovieReviews(movieId);
        setReviews(results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);
  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={"Sorry! Something get wrong!"} />}
      {reviews.length === 0 ? (
        <p>We do not have any reviews for this movie.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h3 className={css.title}>Author: {review.author}</h3>
              <p className={css.text}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
