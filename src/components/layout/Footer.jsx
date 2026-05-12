export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <h3 className="text-white font-bold text-lg mb-4">FASHION</h3>
          <p className="text-sm leading-relaxed">
            Premium fashion powered by AEM headless CMS and React.
          </p>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="/products" className="hover:text-white transition-colors">Products</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4">Contact</h4>
          <p className="text-sm">fashion@example.com</p>
        </div>

      </div>
      <div className="border-t border-gray-800 text-center py-4 text-xs">
        © 2026 Fashion App. Built with AEM + React.
      </div>
    </footer>
  );
}