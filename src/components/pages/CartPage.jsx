import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { useCart } from "@/hooks/useCart";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-surface/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="ShoppingCart" className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Start adding some handcrafted treasures!
          </p>
          <Button onClick={() => navigate("/browse")}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface/30 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-8">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <motion.div
                key={item.Id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white rounded-xl shadow-sm p-6 flex gap-6"
              >
                <img
                  src={item.images?.[0] || "/placeholder-product.jpg"}
                  alt={item.title}
                  className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">by {item.shopName}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.Id, Math.max(1, item.quantity - 1))}
                        className="p-2 hover:bg-surface transition-colors"
                      >
                        <ApperIcon name="Minus" className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.Id, item.quantity + 1)}
                        className="p-2 hover:bg-surface transition-colors"
                      >
                        <ApperIcon name="Plus" className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-2xl font-display font-bold text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.Id)}
                  className="text-gray-400 hover:text-error transition-colors flex-shrink-0"
                >
                  <ApperIcon name="Trash2" className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-medium">
                    {getCartTotal() >= 50 ? "FREE" : "$5.99"}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-display text-lg font-bold text-gray-900">
                    Total
                  </span>
                  <span className="font-display text-2xl font-bold text-primary">
                    ${(getCartTotal() + (getCartTotal() >= 50 ? 0 : 5.99)).toFixed(2)}
                  </span>
                </div>
              </div>

              {getCartTotal() < 50 && (
                <div className="bg-secondary/10 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    <ApperIcon name="Info" className="w-4 h-4 inline mr-1" />
                    Add ${(50 - getCartTotal()).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}

              <Button
                variant="accent"
                className="w-full mb-3"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
                <ApperIcon name="ArrowRight" className="w-5 h-5 ml-2" />
              </Button>
              
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => navigate("/browse")}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;