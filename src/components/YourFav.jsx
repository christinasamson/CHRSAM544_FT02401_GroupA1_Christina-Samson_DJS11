import { useFavorites } from '../contexts/FavouriteContext';
import { Link } from 'react-router-dom';
import './YourFav.css';

const YourFav = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="favorites-container">
      <h2>Your Favorite Episodes</h2>
      <ul className="favorites-list">
        {Object.values(favorites).map((favorite) => (
          <li key={favorite.id} className="favorite-item">
            <h3>{favorite.title}</h3>
            <p>Show: {favorite.showTitle}</p>
            <p>Season: {favorite.seasonNumber}</p>
            <button onClick={() => removeFavorite(favorite.id)}>Remove from Favorites</button>
            <Link to={`/show/${favorite.showId}`} className="view-show-link">
              View Show
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YourFav;
