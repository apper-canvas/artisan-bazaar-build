import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import ProductCard from "@/components/molecules/ProductCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import productService from "@/services/api/productService";
import { useCart } from "@/hooks/useCart";
import { toast } from "react-toastify";

const HomePage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAll();
      setProducts(data.slice(0, 8));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const categories = [
    { name: "Art & Prints", icon: "Palette", color: "from-accent to-primary" },
    { name: "Jewelry", icon: "Sparkles", color: "from-primary to-secondary" },
    { name: "Home Decor", icon: "Home", color: "from-secondary to-accent" },
    { name: "Pottery & Ceramics", icon: "Coffee", color: "from-accent to-secondary" },
    { name: "Clothing", icon: "Shirt", color: "from-primary to-accent" },
    { name: "Digital Downloads", icon: "Download", color: "from-secondary to-primary" }
  ];

  if (loading) return <Loading variant="cards" />;
  if (error) return <Error message={error} onRetry={loadProducts} />;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-surface via-white to-secondary/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Discover Unique
                <span className="block bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Handcrafted Treasures
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Support independent artists and makers. Find one-of-a-kind pieces that tell a story.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="accent"
                  size="lg"
                  onClick={() => navigate("/browse")}
                >
                  Start Shopping
                  <ApperIcon name="ArrowRight" className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate("/seller/register")}
                >
                  Become a Seller
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400"
                  alt="Handcrafted art"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400"
                  alt="Handmade jewelry"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover mt-8"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl -z-0" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/10 to-accent/10 rounded-full blur-3xl -z-0" />
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg">
            Explore handcrafted items across diverse collections
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => navigate(`/browse?category=${encodeURIComponent(category.name)}`)}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col items-center gap-3 border border-gray-200"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center shadow-md`}>
                <ApperIcon name={category.icon} className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900 text-center">
                {category.name}
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-surface/50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg">
              Handpicked treasures from talented artisans
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.Id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/browse")}
            >
              View All Products
              <ApperIcon name="ArrowRight" className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
            Why Artisan Bazaar?
          </h2>
          <p className="text-gray-600 text-lg">
            More than a marketplace—a community of creators
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "Heart",
              title: "Support Artisans",
              description: "Every purchase directly supports independent creators and their craft"
            },
            {
              icon: "Shield",
              title: "Secure & Trusted",
              description: "Shop with confidence with our secure payment and buyer protection"
            },
            {
              icon: "Sparkles",
              title: "Unique & Custom",
              description: "Find one-of-a-kind pieces or request custom creations just for you"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-200"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <ApperIcon name={feature.icon} className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary via-accent to-primary py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              Ready to Start Selling?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Join thousands of artisans showcasing their craft on Artisan Bazaar
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/seller/register")}
              className="bg-white text-primary hover:bg-surface"
            >
              Open Your Shop Today
              <ApperIcon name="Store" className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;