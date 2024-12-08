import { Link } from 'react-router-dom';

const PosterCard = ({ title, posterUrl, id, revenue }) => {
  const imagePath = 'https://image.tmdb.org/t/p/w200';

  return (
    <div className="rounded overflow-hidden shadow-lg bg-white text-black w-full h-auto hover:bg-secondary hover:text-white transition-all duration-300">
      <Link to={`/movie/${id}`}>
        {revenue && (
        <div className="px-6 py-4">
          <p className="font-semibold">{revenue}</p>
        </div>
        )}
        <div className="relative w-full aspect-[2/3]">
          <img className="w-full h-full object-cover" src={imagePath + posterUrl} alt={title} />
        </div>
        <div className="px-6 py-4">
          <p className="font-semibold">{title}</p>
        </div>
      </Link>
    </div>
  );
};

export default PosterCard;
