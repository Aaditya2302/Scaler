import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import { LanguageProvider } from './context/LanguageContext';
import { OrderProvider } from './context/OrderContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderHistory from './pages/OrderHistory';
import Wishlist from './pages/Wishlist';
import Search from './pages/Search';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <UserProvider>
          <CartProvider>
            <OrderProvider>
              <WishlistProvider>
                <div className="min-h-screen flex flex-col font-sans bg-gray-100">
                  <Navbar />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
                      <Route path="/orders" element={<OrderHistory />} />
                      <Route path="/wishlist" element={<Wishlist />} />
                      <Route path="/search" element={<Search />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </WishlistProvider>
            </OrderProvider>
          </CartProvider>
        </UserProvider>
      </LanguageProvider>
    </Router>
  )
}

export default App;
