import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import orderService from "@/services/api/orderService";
import productService from "@/services/api/productService";

const SellerDashboardPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    pendingOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [allOrders, allProducts] = await Promise.all([
        orderService.getAll(),
        productService.getAll()
      ]);

      // Calculate stats (in real app, filter by seller's shop)
      const totalRevenue = allOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      const pendingCount = allOrders.filter(o => o.status === "new").length;

      setStats({
        totalOrders: allOrders.length,
        totalRevenue,
        totalProducts: allProducts.length,
        pendingOrders: pendingCount
      });

      setRecentOrders(allOrders.slice(0, 5));
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      new: "warning",
      shipped: "info",
      delivered: "success",
      cancelled: "error"
    };
    return colors[status] || "default";
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-surface/30 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
            Seller Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your products, orders, and business performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Total Orders</span>
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <ApperIcon name="ShoppingBag" className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="font-display text-3xl font-bold text-gray-900">
                {stats.totalOrders}
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Total Revenue</span>
                <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                  <ApperIcon name="DollarSign" className="w-5 h-5 text-success" />
                </div>
              </div>
              <p className="font-display text-3xl font-bold text-gray-900">
                ${stats.totalRevenue.toFixed(2)}
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Total Products</span>
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                  <ApperIcon name="Package" className="w-5 h-5 text-secondary" />
                </div>
              </div>
              <p className="font-display text-3xl font-bold text-gray-900">
                {stats.totalProducts}
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Pending Orders</span>
                <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                  <ApperIcon name="Clock" className="w-5 h-5 text-warning" />
                </div>
              </div>
              <p className="font-display text-3xl font-bold text-gray-900">
                {stats.pendingOrders}
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Recent Orders */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-gray-900">
              Recent Orders
            </h2>
            <Button variant="ghost" size="sm">
              View All
              <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.Id}
                className="flex items-center gap-4 p-4 bg-surface rounded-lg hover:shadow-md transition-shadow"
              >
                <img
                  src={order.productImage}
                  alt={order.productTitle}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {order.productTitle}
                  </p>
                  <p className="text-sm text-gray-600">
                    Order #{order.Id} • {order.customerName}
                  </p>
                </div>
                <Badge variant={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    ${order.totalAmount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Qty: {order.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SellerDashboardPage;