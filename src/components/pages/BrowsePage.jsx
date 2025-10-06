import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Select from "@/components/atoms/Select";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ProductCard from "@/components/molecules/ProductCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import productService from "@/services/api/productService";
import { useCart } from "@/hooks/useCart";

const BrowsePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    query: searchParams.get("search") || "",
    category: searchParams.get("category") || "all",
    productType: "",
    minPrice: "",
    maxPrice: "",
    minRating: "",
    sort: "newest"
  });

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.search(filters);
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setFilters({
      query: "",
      category: "all",
      productType: "",
      minPrice: "",
      maxPrice: "",
      minRating: "",
      sort: "newest"
    });
    setSearchParams({});
  };

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Art & Prints", label: "Art & Prints" },
    { value: "Jewelry", label: "Jewelry" },
    { value: "Home Decor", label: "Home Decor" },
    { value: "Clothing", label: "Clothing" },
    { value: "Pottery & Ceramics", label: "Pottery & Ceramics" },
    { value: "Digital Downloads", label: "Digital Downloads" }
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "popular", label: "Most Popular" },
    { value: "rating", label: "Highest Rated" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" }
  ];

  if (error) return <Error message={error} onRetry={loadProducts} />;

  return (
    <div className="min-h-screen bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">
              Browse Products
            </h1>
            <p className="text-gray-600">
              {loading ? "Loading..." : `${products.length} products found`}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <ApperIcon name="SlidersHorizontal" className="w-5 h-5 mr-2" />
              Filters
            </Button>
            
            <Select
              value={filters.sort}
              onChange={(e) => handleFilterChange("sort", e.target.value)}
              options={sortOptions}
              className="min-w-[200px]"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:block ${showFilters ? "block" : "hidden"} w-full lg:w-64 flex-shrink-0`}>
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold text-gray-900">
                  Filters
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <Select
                  value={filters.category}
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                  options={categories}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Type
                </label>
                <Select
                  value={filters.productType}
                  onChange={(e) => handleFilterChange("productType", e.target.value)}
                  options={[
                    { value: "", label: "All Types" },
                    { value: "physical", label: "Physical" },
                    { value: "digital", label: "Digital" },
                    { value: "customizable", label: "Customizable" }
                  ]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                  />
                  <span className="text-gray-500">-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <Select
                  value={filters.minRating}
                  onChange={(e) => handleFilterChange("minRating", e.target.value)}
                  options={[
                    { value: "", label: "Any Rating" },
                    { value: "4", label: "4+ Stars" },
                    { value: "4.5", label: "4.5+ Stars" },
                    { value: "5", label: "5 Stars" }
                  ]}
                />
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <Loading variant="cards" />
            ) : products.length === 0 ? (
              <Empty
                icon="Package"
                title="No products found"
                message="Try adjusting your filters or search terms"
                actionLabel="Clear Filters"
                onAction={clearFilters}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.Id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;