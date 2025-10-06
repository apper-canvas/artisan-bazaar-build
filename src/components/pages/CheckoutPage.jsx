import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import FileUpload from "@/components/molecules/FileUpload";
import { useCart } from "@/hooks/useCart";
import orderService from "@/services/api/orderService";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "USA"
  });

  const [customizationFiles, setCustomizationFiles] = useState({});
  const [specialInstructions, setSpecialInstructions] = useState("");

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });

  const hasCustomizableItems = cartItems.some(item => item.productType === "customizable");
  const subtotal = getCartTotal();
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (hasCustomizableItems) {
      setStep(2);
    } else {
      setStep(3);
    }
  };

  const handleCustomizationSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      for (const item of cartItems) {
        const orderData = {
          customerId: 1,
          customerName: shippingInfo.name,
          shopId: item.shopId,
          productId: item.Id,
          productTitle: item.title,
          productImage: item.images?.[0],
          quantity: item.quantity,
          totalAmount: item.price * item.quantity,
          shippingAddress: shippingInfo,
          customizationFiles: customizationFiles[item.Id] || [],
          specialInstructions: specialInstructions,
          stripePaymentId: `pi_${Math.random().toString(36).substr(2, 9)}`
        };
        
        await orderService.create(orderData);
      }
      
      clearCart();
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-surface/30 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {[
              { num: 1, label: "Shipping" },
              hasCustomizableItems && { num: 2, label: "Customization" },
              { num: hasCustomizableItems ? 3 : 2, label: "Payment" }
            ].filter(Boolean).map((stepItem, index, arr) => (
              <div key={stepItem.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-colors ${
                    step >= stepItem.num
                      ? "bg-gradient-to-r from-primary to-accent text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}>
                    {step > stepItem.num ? (
                      <ApperIcon name="Check" className="w-6 h-6" />
                    ) : (
                      stepItem.num
                    )}
                  </div>
                  <span className={`mt-2 text-sm font-medium ${
                    step >= stepItem.num ? "text-gray-900" : "text-gray-500"
                  }`}>
                    {stepItem.label}
                  </span>
                </div>
                {index < arr.length - 1 && (
                  <div className={`w-24 h-1 mx-4 transition-colors ${
                    step > stepItem.num ? "bg-primary" : "bg-gray-200"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm p-8"
              >
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                  Shipping Information
                </h2>
                
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <Input
                    label="Full Name"
                    required
                    value={shippingInfo.name}
                    onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                  />
                  
                  <Input
                    label="Email"
                    type="email"
                    required
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                  />
                  
                  <Input
                    label="Street Address"
                    required
                    value={shippingInfo.street}
                    onChange={(e) => setShippingInfo({...shippingInfo, street: e.target.value})}
                  />
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="City"
                      required
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                    />
                    
                    <Input
                      label="State"
                      required
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="ZIP Code"
                      required
                      value={shippingInfo.zip}
                      onChange={(e) => setShippingInfo({...shippingInfo, zip: e.target.value})}
                    />
                    
                    <Input
                      label="Country"
                      required
                      value={shippingInfo.country}
                      onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
                    />
                  </div>
                  
                  <Button type="submit" variant="accent" className="w-full">
                    Continue to {hasCustomizableItems ? "Customization" : "Payment"}
                    <ApperIcon name="ArrowRight" className="w-5 h-5 ml-2" />
                  </Button>
                </form>
              </motion.div>
            )}

            {/* Step 2: Customization */}
            {step === 2 && hasCustomizableItems && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm p-8"
              >
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">
                  Upload Customization Files
                </h2>
                <p className="text-gray-600 mb-6">
                  Upload your designs for custom products
                </p>
                
                <form onSubmit={handleCustomizationSubmit} className="space-y-6">
                  {cartItems
                    .filter(item => item.productType === "customizable")
                    .map((item) => (
                      <div key={item.Id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex gap-4 mb-4">
                          <img
                            src={item.images?.[0]}
                            alt={item.title}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div>
                            <h3 className="font-medium text-gray-900">{item.title}</h3>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        
                        <FileUpload
                          label="Upload Your Design"
                          maxSize={25}
                          maxFiles={3}
                          accept="image/*,.pdf"
                          onFilesChange={(files) => setCustomizationFiles({
                            ...customizationFiles,
                            [item.Id]: files
                          })}
                          helperText="Upload images or PDF (max 25MB)"
                        />
                      </div>
                    ))}
                  
                  <TextArea
                    label="Special Instructions (Optional)"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Any special requests or notes for the seller..."
                    rows={4}
                  />
                  
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setStep(1)}
                    >
                      <ApperIcon name="ArrowLeft" className="w-5 h-5 mr-2" />
                      Back
                    </Button>
                    <Button type="submit" variant="accent" className="flex-1">
                      Continue to Payment
                      <ApperIcon name="ArrowRight" className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === (hasCustomizableItems ? 3 : 2) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm p-8"
              >
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                  Payment Information
                </h2>
                
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <Input
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    required
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                  />
                  
                  <Input
                    label="Cardholder Name"
                    required
                    value={paymentInfo.cardName}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                  />
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      placeholder="MM/YY"
                      required
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                    />
                    
                    <Input
                      label="CVV"
                      placeholder="123"
                      required
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                    />
                  </div>
                  
                  <div className="bg-secondary/10 rounded-lg p-4 flex items-start gap-3">
                    <ApperIcon name="Lock" className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      Your payment information is encrypted and secure
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setStep(hasCustomizableItems ? 2 : 1)}
                    >
                      <ApperIcon name="ArrowLeft" className="w-5 h-5 mr-2" />
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="accent"
                      className="flex-1"
                      disabled={loading}
                    >
                      {loading ? "Processing..." : `Place Order - $${total.toFixed(2)}`}
                      {!loading && <ApperIcon name="Check" className="w-5 h-5 ml-2" />}
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="font-display text-xl font-bold text-gray-900 mb-4">
                Order Summary
              </h2>
              
              <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.Id} className="flex gap-3">
                    <img
                      src={item.images?.[0]}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <span className="font-display font-bold text-gray-900">Total</span>
                  <span className="font-display text-xl font-bold text-primary">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;