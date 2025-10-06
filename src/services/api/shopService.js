import shopsData from "@/services/mockData/shops.json";

const delay = () => new Promise(resolve => setTimeout(resolve, 300));

const shopService = {
  async getAll() {
    await delay();
    return [...shopsData];
  },

  async getById(id) {
    await delay();
    const shop = shopsData.find(s => s.Id === parseInt(id));
    if (!shop) throw new Error("Shop not found");
    return { ...shop };
  },

  async getByCustomUrl(customUrl) {
    await delay();
    const shop = shopsData.find(s => s.customUrl === customUrl);
    if (!shop) throw new Error("Shop not found");
    return { ...shop };
  },

  async create(shop) {
    await delay();
    const maxId = Math.max(...shopsData.map(s => s.Id), 0);
    const newShop = {
      ...shop,
      Id: maxId + 1,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    shopsData.push(newShop);
    return { ...newShop };
  },

  async update(id, data) {
    await delay();
    const index = shopsData.findIndex(s => s.Id === parseInt(id));
    if (index === -1) throw new Error("Shop not found");
    shopsData[index] = { ...shopsData[index], ...data };
    return { ...shopsData[index] };
  },

  async delete(id) {
    await delay();
    const index = shopsData.findIndex(s => s.Id === parseInt(id));
    if (index === -1) throw new Error("Shop not found");
    shopsData.splice(index, 1);
    return true;
  }
};

export default shopService;