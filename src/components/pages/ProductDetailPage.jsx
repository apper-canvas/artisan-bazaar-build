import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import RatingStars from "@/components/molecules/RatingStars";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import productService from "@/services/api/productService";
import reviewService from "@/services/api/reviewService";
import { useCart } from "@/hooks/useCart";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadProductData();
  }, [id]);

  const loadProductData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [productData, reviewsData] = await Promise.all([
        productService.getById(id),
        reviewService.getByProductId(id)
      ]);
      setProduct(productData);
      setReviews(reviewsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadProductData} />;
  if (!product) return <Error message="Product not found" />;

  return (
    <div className="min-h-screen bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <button onClick={() => navigate("/")} className="hover:text-primary">
            Home
          </button>
          <ApperIcon name="ChevronRight" className="w-4 h-4" />
          <button onClick={() => navigate("/browse")} className="hover:text-primary">
            Browse
          </button>
          <ApperIcon name="ChevronRight" className="w-4 h-4" />
          <span className="text-gray-900">{product.title}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-white rounded-2xl overflow-hidden shadow-md"
            >
              <img
                src={product.images?.[selectedImage] || "/placeholder-product.jpg"}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-primary shadow-md"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {product.productType !== "physical" && (
                <Badge variant="accent" className="mb-3">
                  {product.productType === "digital" ? "Digital Product" : "Customizable"}
                </Badge>
              )}
              <h1 className="font-display text-4xl font-bold text-gray-900 mb-3">
                {product.title}
              </h1>
              <button
                onClick={() => navigate(`/shop/${product.shopId}`)}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                by {product.shopName}
              </button>
            </div>

            <div className="flex items-center gap-4">
              <RatingStars rating={product.rating || 0} size="lg" />
              <span className="text-gray-600">
                ({product.reviewCount || 0} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-display font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <p className="text-gray-700 leading-relaxed text-lg">
              {product.description}
            </p>

            {product.productType === "physical" && (
              <div className="bg-surface rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-gray-700">
                  <ApperIcon name="Package" className="w-5 h-5 text-primary" />
                  <span>Ships within 3-5 business days</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <ApperIcon name="Truck" className="w-5 h-5 text-primary" />
                  <span>Free shipping on orders over $50</span>
                </div>
              </div>
            )}

            {product.productType === "digital" && (
              <div className="bg-secondary/10 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-gray-700">
                  <ApperIcon name="Download" className="w-5 h-5 text-secondary" />
                  <span>Instant download after purchase</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <ApperIcon name="Clock" className="w-5 h-5 text-secondary" />
                  <span>Access expires after 7 days or 5 downloads</span>
                </div>
              </div>
            )}

            {product.productType === "customizable" && (
              <div className="bg-accent/10 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-gray-700">
                  <ApperIcon name="Palette" className="w-5 h-5 text-accent" />
                  <span>Upload your custom design during checkout</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <ApperIcon name="Clock" className="w-5 h-5 text-accent" />
                  <span>Processing time: 5-7 business days</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-surface transition-colors"
                >
                  <ApperIcon name="Minus" className="w-5 h-5" />
                </button>
                <span className="px-6 py-3 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-surface transition-colors"
                >
                  <ApperIcon name="Plus" className="w-5 h-5" />
                </button>
              </div>
              <span className="text-gray-600">
                {product.inventory} in stock
              </span>
            </div>

            <div className="flex gap-3">
              <Button
                variant="accent"
                size="lg"
                className="flex-1"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ApperIcon name="ShoppingCart" className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-8">
            Customer Reviews
          </h2>
          
          {reviews.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              No reviews yet. Be the first to review this product!
            </p>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.Id} className="border-b border-gray-200 pb-6 last:border-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium text-gray-900">{review.customerName}</p>
                      <RatingStars rating={review.rating} size="sm" />
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-3">{review.text}</p>
                  {review.media && review.media.length > 0 && (
                    <div className="flex gap-2">
                      {review.media.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`Review ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;