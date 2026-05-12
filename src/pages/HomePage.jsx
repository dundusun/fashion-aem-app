import { Link } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';
import { useFeaturedProducts } from '../hooks/useProducts';

const CATEGORIES = ['Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Accessories'];

export default function HomePage() {
  const { data: featured = [], isLoading } = useFeaturedProducts();

  return (
    <div>

      {/* Hero Banner */}
      <section className="bg-gray-900 text-white min-h-[70vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <p className="text-pink-400 text-sm uppercase tracking-widest mb-4">
            New Collection 2026
          </p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Style That <br />
            <span className="text-pink-400">Speaks</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-md">
            Discover premium fashion curated for the modern woman.
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full
                       font-medium hover:bg-pink-400 hover:text-white transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop by Category</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map(cat => (
            <Link
              key={cat}
              to={`/products?category=${cat}`}
              className="whitespace-nowrap px-6 py-3 rounded-full border border-gray-200
                         text-sm font-medium text-gray-700 hover:bg-gray-900
                         hover:text-white hover:border-gray-900 transition-all"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <Link
            to="/products"
            className="text-sm text-pink-500 hover:text-pink-600 font-medium"
          >
            View all →
          </Link>
        </div>
        <ProductGrid products={featured} loading={isLoading} />
      </section>

    </div>
  );
}