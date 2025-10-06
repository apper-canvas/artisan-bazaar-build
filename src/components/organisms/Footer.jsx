import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const Footer = () => {
  const footerLinks = {
    "Shop": [
      { label: "Browse All", to: "/browse" },
      { label: "Art & Prints", to: "/browse?category=Art%20%26%20Prints" },
      { label: "Jewelry", to: "/browse?category=Jewelry" },
      { label: "Home Decor", to: "/browse?category=Home%20Decor" }
    ],
    "Sell": [
      { label: "Become a Seller", to: "/seller/register" },
      { label: "Seller Dashboard", to: "/seller/dashboard" },
      { label: "Seller Guide", to: "#" }
    ],
    "Support": [
      { label: "Help Center", to: "#" },
      { label: "Shipping Info", to: "#" },
      { label: "Returns", to: "#" },
      { label: "Contact Us", to: "#" }
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                <ApperIcon name="ShoppingBag" className="w-6 h-6 text-white" />
              </div>
              <span className="font-display text-xl font-bold">
                Artisan Bazaar
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Discover unique, handcrafted treasures from talented artists and makers around the world.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <ApperIcon name="Facebook" className="w-5 h-5" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <ApperIcon name="Instagram" className="w-5 h-5" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <ApperIcon name="Twitter" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-display font-semibold text-lg mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © 2024 Artisan Bazaar. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;