import { useState, useEffect } from "react";

function LoadMore() {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  async function fetchProducts() {
    setLoading(true);
    const response = await fetch(
      `https://dummyjson.com/products?limit=8&skip=${count * 8}`
    );
    const data = await response.json();
    setProducts((prev) => [...prev, ...data.products]);
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, [count]);

  useEffect(() => {
    if (products.length >= 100) setDisableButton(true);
  }, [products]);

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Load More Products</h1>

      {loading && products.length === 0 ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <p className="font-semibold text-sm text-gray-800 truncate">
                    {product.title}
                  </p>
                  <p className="text-blue-600 font-bold text-sm mt-1">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={() => setCount(count + 1)}
              disabled={disableButton}
              className={`px-8 py-3 rounded-full font-semibold text-white transition ${
                disableButton
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {disableButton ? "All Products Loaded" : loading ? "Loading..." : "Load More"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default LoadMore;