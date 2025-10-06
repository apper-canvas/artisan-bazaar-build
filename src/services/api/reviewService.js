import reviewsData from "@/services/mockData/reviews.json";

const delay = () => new Promise(resolve => setTimeout(resolve, 300));

const reviewService = {
  async getAll() {
    await delay();
    return [...reviewsData];
  },

  async getById(id) {
    await delay();
    const review = reviewsData.find(r => r.Id === parseInt(id));
    if (!review) throw new Error("Review not found");
    return { ...review };
  },

  async getByProductId(productId) {
    await delay();
    return reviewsData.filter(r => r.productId === parseInt(productId) && r.isApproved);
  },

  async getPendingReviews() {
    await delay();
    return reviewsData.filter(r => !r.isApproved);
  },

  async create(review) {
    await delay();
    const maxId = Math.max(...reviewsData.map(r => r.Id), 0);
    const newReview = {
      ...review,
      Id: maxId + 1,
      isApproved: false,
      createdAt: new Date().toISOString()
    };
    reviewsData.push(newReview);
    return { ...newReview };
  },

  async approve(id) {
    await delay();
    const index = reviewsData.findIndex(r => r.Id === parseInt(id));
    if (index === -1) throw new Error("Review not found");
    reviewsData[index] = { ...reviewsData[index], isApproved: true };
    return { ...reviewsData[index] };
  },

  async delete(id) {
    await delay();
    const index = reviewsData.findIndex(r => r.Id === parseInt(id));
    if (index === -1) throw new Error("Review not found");
    reviewsData.splice(index, 1);
    return true;
  }
};

export default reviewService;