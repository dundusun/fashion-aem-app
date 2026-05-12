import { useCart } from '../../context/CartContext';
import { damUrl } from '../../utils/imageHelper';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discount = hasDiscount
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <div className="group relative rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-lg transition-shadow duration-300">

      <Link to={`/products/${product.slug}`}>
        <div className="aspect-[3/4] overflow-hidden bg-gray-50">
          <img
            src={damUrl(product.thumbnailImage?._path, 600)}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => { e.target.src = 'https://placehold.co/400x533?text=Fashion'; }}
          />
        </div>

        <div className="p-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest">{product.brand}</p>
          <h3 className="font-medium text-gray-900 mt-1 truncate">{product.title}</h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="font-semibold text-gray-900">₹{product.price}</span>
            {hasDiscount && (
              <>
                <span className="text-sm text-gray-400 line-through">₹{product.oldPrice}</span>
                <span className="text-xs text-green-600 font-medium">{discount}% off</span>
              </>
            )}
          </div>
        </div>
      </Link>

      {!product.inStock && (
        <div className="absolute top-3 left-3 bg-gray-900 text-white text-xs px-2 py-1 rounded-md">
          Out of stock
        </div>
      )}

      {product.featured && product.inStock && (
        <div className="absolute top-3 left-3 bg-pink-500 text-white text-xs px-2 py-1 rounded-md">
          Featured
        </div>
      )}

      <button
        onClick={() => addToCart(product)}
        disabled={!product.inStock}
        className="absolute bottom-4 right-4 bg-gray-900 text-white text-xs px-3 py-2
                   rounded-lg opacity-0 group-hover:opacity-100 transition-opacity
                   duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Add to cart
      </button>

    </div>
  );
}