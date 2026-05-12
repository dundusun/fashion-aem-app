import { useParams, Link } from 'react-router-dom';
import { useProductDetail } from '../hooks/useProductDetail';
import { useCart } from '../context/CartContext';
import { damUrl } from '../utils/imageHelper';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { data: product, isLoading, isError } = useProductDetail(slug);
  const { addToCart } = useCart();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-[3/4] bg-gray-100 animate-pulse rounded-2xl" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-100 animate-pulse rounded w-3/4" />
            <div className="h-6 bg-gray-100 animate-pulse rounded w-1/4" />
            <div className="h-24 bg-gray-100 animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 font-medium">Product not found.</p>
        <Link to="/products" className="text-pink-500 text-sm mt-4 block">
          ← Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <Link to="/products" className="text-sm text-gray-400 hover:text-gray-900 mb-8 block">
        ← Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Image */}
        <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-50">
          <img
            src={damUrl(product.thumbnailImage?._path, 800)}
            alt={product.title}
            className="w-full h-full object-cover"
            onError={e => { e.target.src = 'https://placehold.co/600x800?text=Fashion'; }}
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-widest">{product.brand}</p>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.title}</h1>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
            {product.oldPrice > product.price && (
              <>
                <span className="text-lg text-gray-400 line-through">₹{product.oldPrice}</span>
                <span className="bg-green-50 text-green-700 text-sm px-2 py-1 rounded-md font-medium">
                  {Math.round((1 - product.price / product.oldPrice) * 100)}% off
                </span>
              </>
            )}
          </div>

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Select Size</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm
                               hover:border-gray-900 hover:bg-gray-900 hover:text-white
                               transition-all"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Colors</p>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <span
                    key={color}
                    className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {product.description?.plaintext && (
            <p className="text-gray-600 leading-relaxed text-sm">
              {product.description.plaintext}
            </p>
          )}

          {/* Add to Cart */}
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className="w-full bg-gray-900 text-white py-4 rounded-full font-medium
                       hover:bg-pink-500 transition-colors disabled:bg-gray-200
                       disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>

        </div>
      </div>
    </div>
  );
}