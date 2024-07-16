import { useEffect, useState } from "react";
import { getMovieCast } from "../../apiService/movie";
import { useParams } from "react-router-dom";
import ErrorMessage from "../ErrorMesage/ErrorMessage";
import Loader from "../Loader/Loader";
import css from "./MovieCast.module.css";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w200";
const defaultImg =
  "https://dummyimage.com/200x300/cdcdcd/000.jpg&text=No+photo";

function getImageUrl(path) {
  return path ? `${BASE_IMAGE_URL}${path}` : defaultImg;
}
export default function MovieCast() {
  const { movieId } = useParams();
  const [casts, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const fetchCast = async () => {
      setIsLoading(true);
      try {
        const { cast } = await getMovieCast(movieId);
        setCast(cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCast();
  }, [movieId]);
  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={"Sorry! Something get wrong!"} />}
      <ul className={css.list}>
        {casts.map((cast) => (
          <li className={css.listItem} key={cast.id}>
            <img
              className={css.img}
              src={getImageUrl(cast.profile_path)}
              alt={cast.name}
              width={250}
            />
            <div className={css.textWrapper}>
              <p className={css.text}>{cast.name}</p>
              <p className={css.text}>Character: {cast.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
