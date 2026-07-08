import { useState, useEffect } from "react";

function FoodRecipe() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const suggestions = [
    "chicken",
    "beef",
    "pasta",
    "fish",
    "rice",
    "salad",
    "soup",
    "pizza",
  ];

  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );
        const data = await response.json();
        if (data.meals) {
          setRecipes(data.meals);
        } else {
          setRecipes([]);
          setError("No recipes found. Try another search!");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, [query]);

  function handleSearch(e) {
    e.preventDefault();
    setQuery(search);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-orange-500 py-10 px-4 text-center">
        <h1 className="text-4xl font-bold text-white mb-6">Food Recipe App</h1>
        <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
          <input
            type="text"
            list="recipe-suggestions"
            placeholder="Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl outline-none text-gray-800"
          />
          <datalist id="recipe-suggestions">
            {suggestions.map((item) => (
              <option key={item} value={item} />
            ))}
          </datalist>
          <button
            type="submit"
            className="bg-white text-orange-500 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition"
          >
            Search
          </button>
        </form>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {loading && (
          <p className="text-center text-gray-500 text-lg">Loading recipes...</p>
        )}
        {error && (
          <p className="text-center text-red-500 text-lg">{error}</p>
        )}
        {!loading && !error && (
          <p className="text-gray-500 mb-6">
            Showing results for:{" "}
            <span className="font-semibold text-orange-500">{query}</span>
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              onClick={() => setSelectedRecipe(recipe)}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-sm">
                  {recipe.strMeal}
                </h3>
                <p className="text-orange-500 text-xs mt-1">
                  {recipe.strCategory}
                </p>
                <p className="text-gray-400 text-xs">
                  {recipe.strArea} Cuisine
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-800 pr-4">
                {selectedRecipe.strMeal}
              </h2>
              <button
                onClick={() => setSelectedRecipe(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                X
              </button>
            </div>
            <img
              src={selectedRecipe.strMealThumb}
              alt={selectedRecipe.strMeal}
              className="w-full h-64 object-cover rounded-2xl mb-4"
            />
            <div className="flex gap-2 mb-4">
              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                {selectedRecipe.strCategory}
              </span>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                {selectedRecipe.strArea}
              </span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Instructions:</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {selectedRecipe.strInstructions}
            </p>
            {selectedRecipe.strYoutube && (
              <a
                href={selectedRecipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-red-500 text-white px-6 py-2 rounded-full font-medium hover:bg-red-600 transition"
              >
                Watch on YouTube
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodRecipe;