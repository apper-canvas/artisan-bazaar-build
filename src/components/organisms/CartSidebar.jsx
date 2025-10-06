import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";

const CartSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-display font-bold text-gray-900">
                Shopping Cart
              </h2>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface transition-colors"
              >
                <ApperIcon name="X" className="w-6 h-6" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-4">
                    <ApperIcon name="ShoppingCart" className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start adding some handcrafted treasures!
                  </p>
                  <Button onClick={onClose}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.Id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 p-4 bg-surface rounded-lg"
                    >
                      <img
                        src={item.images?.[0] || "/placeholder-product.jpg"}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 line-clamp-2 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.Id, Math.max(1, item.quantity - 1))}
                            className="w-7 h-7 flex items-center justify-center rounded bg-white border border-gray-300 hover:bg-gray-50"
                          >
                            <ApperIcon name="Minus" className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.Id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center rounded bg-white border border-gray-300 hover:bg-gray-50"
                          >
                            <ApperIcon name="Plus" className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.Id)}
                        className="self-start text-gray-400 hover:text-error transition-colors"
                      >
                        <ApperIcon name="Trash2" className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-200 space-y-4">
                <div className="flex items-center justify-between text-lg font-display font-bold">
                  <span>Total:</span>
                  <span className="text-2xl text-primary">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
                <Button
                  variant="accent"
                  className="w-full py-3"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                  <ApperIcon name="ArrowRight" className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={onClose}
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;