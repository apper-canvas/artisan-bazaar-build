import { motion } from "framer-motion";

const Loading = ({ variant = "cards" }) => {
  if (variant === "cards") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-surface rounded-lg overflow-hidden shadow-sm"
          >
            <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 animate-pulse" />
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 animate-pulse" />
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 animate-pulse" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === "table") {
    return (
      <div className="space-y-3">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-surface rounded-lg p-4 flex items-center gap-4"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/3 animate-pulse" />
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2 animate-pulse" />
            </div>
            <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 animate-pulse" />
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-surface" />
        <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    </div>
  );
};

export default Loading;