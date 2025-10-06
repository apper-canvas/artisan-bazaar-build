import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
const Header = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [userRole, setUserRole] = useState(() => {
    const stored = localStorage.getItem("userRole");
    return stored || "customer";
  });
  
  useEffect(() => {
    localStorage.setItem("userRole", userRole);
  }, [userRole]);
  
  const handleRoleChange = (newRole) => {
    setUserRole(newRole);
    localStorage.setItem("userRole", newRole);
  };
  
  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/browse?search=${encodeURIComponent(query)}`);
    }
  };

  const categories = [
    "Art & Prints",
    "Jewelry",
    "Home Decor",
    "Clothing",
    "Pottery & Ceramics",
    "Digital Downloads"
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <ApperIcon name="Package" className="w-4 h-4" />
            <span>Free shipping on orders over $50</span>
          </div>
<div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full">
              <ApperIcon name="User" className="w-4 h-4" />
              <span className="text-sm font-medium capitalize">{userRole}</span>
            </div>
            <Link to="/seller/register" className="hover:underline">
              Become a Seller
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
              <ApperIcon name="ShoppingBag" className="w-6 h-6 text-white" />
            </div>
            <span className="font-display text-2xl font-bold text-gray-900 hidden sm:block">
              Artisan Bazaar
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-2xl">
            <SearchBar
              placeholder="Search for handcrafted treasures..."
              onSearch={handleSearch}
            />
          </div>

          {/* Actions */}
<div className="flex items-center gap-3 ml-auto">
            <Button
              variant="ghost"
              size="sm"
              className="hidden lg:flex"
              onClick={() => navigate("/browse")}
            >
              Browse
            </Button>
            
            {(userRole === "seller" || userRole === "admin") && (
              <Button
                variant="ghost"
                size="sm"
                className="hidden lg:flex"
                onClick={() => navigate("/seller/dashboard")}
              >
                Dashboard
              </Button>
            )}

            <div className="hidden lg:flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                Role:
              </label>
              <Select
                value={userRole}
                onChange={(e) => handleRoleChange(e.target.value)}
                className="text-sm min-w-[120px]"
              >
                <option value="customer">Customer</option>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>
              </Select>
            </div>

<Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
              >
                <ApperIcon name="ShoppingCart" className="w-6 h-6" />
                {cartItems && cartItems.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                  >
                    {cartItems.length}
                  </motion.span>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <ApperIcon name={mobileMenuOpen ? "X" : "Menu"} className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden mt-4">
          <SearchBar
            placeholder="Search products..."
            onSearch={handleSearch}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="hidden lg:block border-t border-gray-200 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6 py-3 overflow-x-auto">
{categories.map((category) => (
              <Link
                key={category}
                to={`/browse?category=${encodeURIComponent(category)}`}
                className="text-sm font-medium text-gray-700 hover:text-primary whitespace-nowrap transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>

{/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-200 bg-white overflow-hidden"
>
<div className="px-4 py-4 space-y-3">
              <div className="mb-4 p-4 bg-surface rounded-lg border-2 border-primary/20">
                <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <ApperIcon name="User" className="w-4 h-4" />
                  Switch Role (for testing)
                </label>
                <Select
                  value={userRole}
                  onChange={(e) => handleRoleChange(e.target.value)}
                  className="w-full"
                >
                  <option value="customer">Customer</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </Select>
                <p className="mt-2 text-xs text-gray-600">
                  Current role: <span className="font-semibold capitalize text-primary">{userRole}</span>
                </p>
              </div>

              <nav className="space-y-1">
                <Link
to="/browse"
                  className="block py-2 text-gray-700 hover:text-primary font-medium"
                >
                  Browse All
                </Link>
                {categories.map((category) => (
<Link
                    key={category}
                    to={`/browse?category=${encodeURIComponent(category)}`}
                    className="block py-2 text-gray-700 hover:text-primary"
                  >
                    {category}
                  </Link>
                ))}
                <div className="border-t pt-2 mt-2">
<Link
                    to="/seller/register"
                    className="block py-2 text-primary font-medium"
                  >
                    Become a Seller
                  </Link>
{(userRole === "seller" || userRole === "admin") && (
                    <Link
                      to="/seller/dashboard"
                      className="block py-2 text-primary font-medium"
                    >
                      Seller Dashboard
                    </Link>
                  )}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;