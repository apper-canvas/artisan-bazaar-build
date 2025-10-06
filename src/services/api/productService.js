import productsData from "@/services/mockData/products.json";

const delay = () => new Promise(resolve => setTimeout(resolve, 300));

const productService = {
  async getAll() {
    await delay();
    return [...productsData];
  },

  async getById(id) {
    await delay();
    const product = productsData.find(p => p.Id === parseInt(id));
    if (!product) throw new Error("Product not found");
    return { ...product };
  },

  async getByShopId(shopId) {
    await delay();
    return productsData.filter(p => p.shopId === parseInt(shopId));
  },

  async search(params) {
    await delay();
    let results = [...productsData];

    if (params.query) {
      const query = params.query.toLowerCase();
      results = results.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    if (params.category && params.category !== "all") {
      results = results.filter(p => p.category === params.category);
    }

    if (params.productType) {
      results = results.filter(p => p.productType === params.productType);
    }

    if (params.minPrice) {
      results = results.filter(p => p.price >= parseFloat(params.minPrice));
    }

    if (params.maxPrice) {
      results = results.filter(p => p.price <= parseFloat(params.maxPrice));
    }

    if (params.minRating) {
      results = results.filter(p => p.rating >= parseFloat(params.minRating));
    }

    if (params.sort) {
      switch (params.sort) {
        case "price-asc":
          results.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          results.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          results.sort((a, b) => b.rating - a.rating);
          break;
        case "popular":
          results.sort((a, b) => b.salesCount - a.salesCount);
          break;
        case "newest":
          results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        default:
          break;
      }
    }

    return results;
  },

  async create(product) {
    await delay();
    const maxId = Math.max(...productsData.map(p => p.Id), 0);
    const newProduct = {
      ...product,
      Id: maxId + 1,
      rating: 0,
      reviewCount: 0,
      salesCount: 0,
      createdAt: new Date().toISOString()
    };
    productsData.push(newProduct);
    return { ...newProduct };
  },

  async update(id, data) {
    await delay();
    const index = productsData.findIndex(p => p.Id === parseInt(id));
    if (index === -1) throw new Error("Product not found");
    productsData[index] = { ...productsData[index], ...data };
    return { ...productsData[index] };
  },

  async delete(id) {
    await delay();
    const index = productsData.findIndex(p => p.Id === parseInt(id));
    if (index === -1) throw new Error("Product not found");
    productsData.splice(index, 1);
    return true;
  }
};

export default productService;