import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';
import { useProducts } from '../hooks/useProducts';

const CATEGORIES = ['All', 'Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Accessories'];

export default function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get('category') || null
  );

  const { data: products = [], isLoading, isError } = useProducts(activeCategory);

  useEffect(() => {
    if (activeCategory) {
      setSearchParams({ category: activeCategory });
    } else {
      setSearchParams({});
    }
  }, [activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <p className="text-gray-400 mt-1">
          {activeCategory ? `Showing: ${activeCategory}` : 'Showing all products'}
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat === 'All' ? null : cat)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium
                        transition-colors border
              ${(cat === 'All' && !activeCategory) || cat === activeCategory
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-900'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Error State */}
      {isError && (
        <div className="text-center py-20">
          <p className="text-red-500 font-medium">Failed to load products.</p>
          <p className="text-gray-400 text-sm mt-1">
            Check AEM connection in .env file.
          </p>
        </div>
      )}

      {/* Product Grid */}
      {!isError && (
        <ProductGrid products={products} loading={isLoading} />
      )}

    </div>
  );
}