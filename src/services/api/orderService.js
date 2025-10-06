import ordersData from "@/services/mockData/orders.json";

const delay = () => new Promise(resolve => setTimeout(resolve, 300));

const orderService = {
  async getAll() {
    await delay();
    return [...ordersData];
  },

  async getById(id) {
    await delay();
    const order = ordersData.find(o => o.Id === parseInt(id));
    if (!order) throw new Error("Order not found");
    return { ...order };
  },

  async getByCustomerId(customerId) {
    await delay();
    return ordersData.filter(o => o.customerId === parseInt(customerId));
  },

  async getByShopId(shopId) {
    await delay();
    return ordersData.filter(o => o.shopId === parseInt(shopId));
  },

  async create(order) {
    await delay();
    const maxId = Math.max(...ordersData.map(o => o.Id), 0);
    const platformFee = order.totalAmount * 0.10;
    const sellerPayout = order.totalAmount - platformFee;
    
    const newOrder = {
      ...order,
      Id: maxId + 1,
      platformFee,
      sellerPayout,
      status: "new",
      trackingNumber: "",
      shippingLabelUrl: "",
      createdAt: new Date().toISOString(),
      shippedAt: null
    };
    ordersData.push(newOrder);
    return { ...newOrder };
  },

  async update(id, data) {
    await delay();
    const index = ordersData.findIndex(o => o.Id === parseInt(id));
    if (index === -1) throw new Error("Order not found");
    ordersData[index] = { ...ordersData[index], ...data };
    return { ...ordersData[index] };
  },

  async updateStatus(id, status) {
    await delay();
    const index = ordersData.findIndex(o => o.Id === parseInt(id));
    if (index === -1) throw new Error("Order not found");
    
    ordersData[index] = {
      ...ordersData[index],
      status,
      shippedAt: status === "shipped" ? new Date().toISOString() : ordersData[index].shippedAt
    };
    
    return { ...ordersData[index] };
  }
};

export default orderService;