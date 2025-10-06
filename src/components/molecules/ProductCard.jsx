import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import RatingStars from "@/components/molecules/RatingStars";

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product.Id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart?.(product);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-200"
      onClick={handleClick}
    >
      <div className="relative aspect-square overflow-hidden bg-surface">
        <img
          src={product.images?.[0] || "/placeholder-product.jpg"}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {product.productType === "digital" && (
          <Badge variant="accent" className="absolute top-3 right-3 shadow-md">
            Digital
          </Badge>
        )}
        {product.productType === "customizable" && (
          <Badge variant="secondary" className="absolute top-3 right-3 shadow-md">
            Customizable
          </Badge>
        )}
      </div>
      
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-display font-semibold text-lg text-gray-900 line-clamp-2">
            {product.title}
          </h3>
          <p className="text-sm text-gray-600">by {product.shopName}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <RatingStars rating={product.rating || 0} size="sm" />
          <span className="text-sm text-gray-600">
            ({product.reviewCount || 0})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-display font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          <Button
            size="sm"
            variant="accent"
            onClick={handleAddToCart}
          >
            <ApperIcon name="ShoppingCart" className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;