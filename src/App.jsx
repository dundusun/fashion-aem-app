import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/"                 element={<HomePage />} />
          <Route path="/products"         element={<ProductListPage />} />
          <Route path="/products/:slug"   element={<ProductDetailPage />} />
          <Route path="*"                 element={
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-900">404</h2>
              <p className="text-gray-400 mt-2">Page not found.</p>
              <a href="/" className="text-pink-500 text-sm mt-4 block">
                ← Go Home
              </a>
            </div>
          } />
        </Routes>
      </main>

      <Footer />

    </div>
  );
}