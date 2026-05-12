import ProductCard from './ProductCard';

export default function ProductGrid({ products = [], loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="rounded-2xl bg-gray-100 animate-pulse aspect-[3/4]" />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p className="text-lg">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}