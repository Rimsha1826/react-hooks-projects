import { useState } from "react";

function StarRating({ totalStars = 5 }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Star Rating</h1>

      <div className="flex gap-2 mb-4">
        {[...Array(totalStars)].map((_, index) => {
          const starValue = index + 1;
          return (
            <span
              key={index}
              className={`text-5xl cursor-pointer transition-all duration-150 ${
                starValue <= (hover || rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          );
        })}
      </div>

      <p className="text-xl text-gray-600 mt-4">
        {rating > 0
          ? `You rated: ${rating} / ${totalStars} stars`
          : "Click a star to rate!"}
      </p>
    </div>
  );
}

export default StarRating;