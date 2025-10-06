import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const SearchBar = ({ placeholder = "Search...", onSearch, className }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <ApperIcon 
        name="Search" 
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 bg-surface border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
      />
      {query && (
        <button
          type="button"
          onClick={() => {
            setQuery("");
            onSearch?.("");
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <ApperIcon name="X" className="w-5 h-5" />
        </button>
      )}
    </form>
  );
};

export default SearchBar;