const db = require('../models');
const Users = db.users;

const Customers = db.customers;

const OrderItems = db.order_items;

const Orders = db.orders;

const Products = db.products;

const Reviews = db.reviews;

const Variations = db.variations;

const CustomersData = [
  {
    first_name: 'John',

    last_name: 'Doe',

    email: 'john.doe@example.com',

    // type code here for "relation_many" field
  },

  {
    first_name: 'Jane',

    last_name: 'Smith',

    email: 'jane.smith@example.com',

    // type code here for "relation_many" field
  },

  {
    first_name: 'Alice',

    last_name: 'Johnson',

    email: 'alice.johnson@example.com',

    // type code here for "relation_many" field
  },

  {
    first_name: 'Bob',

    last_name: 'Brown',

    email: 'bob.brown@example.com',

    // type code here for "relation_many" field
  },

  {
    first_name: 'Charlie',

    last_name: 'Davis',

    email: 'charlie.davis@example.com',

    // type code here for "relation_many" field
  },
];

const OrderItemsData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    quantity: 2,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    quantity: 1,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    quantity: 3,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    quantity: 1,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    quantity: 2,
  },
];

const OrdersData = [
  {
    // type code here for "relation_one" field

    order_date: new Date('2023-10-01T10:00:00Z'),

    status: 'Shipped',

    // type code here for "relation_many" field
  },

  {
    // type code here for "relation_one" field

    order_date: new Date('2023-10-02T11:30:00Z'),

    status: 'Cancelled',

    // type code here for "relation_many" field
  },

  {
    // type code here for "relation_one" field

    order_date: new Date('2023-10-03T14:45:00Z'),

    status: 'Cancelled',

    // type code here for "relation_many" field
  },

  {
    // type code here for "relation_one" field

    order_date: new Date('2023-10-04T09:15:00Z'),

    status: 'Shipped',

    // type code here for "relation_many" field
  },

  {
    // type code here for "relation_one" field

    order_date: new Date('2023-10-05T16:00:00Z'),

    status: 'Cancelled',

    // type code here for "relation_many" field
  },
];

const ProductsData = [
  {
    name: 'Classic White T-Shirt',

    description: 'A timeless white t-shirt made from 100% cotton.',

    price: 19.99,

    category: 'Women',

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Blue Denim Jeans',

    description: 'Stylish blue denim jeans with a slim fit.',

    price: 49.99,

    category: 'Men',

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Red Hoodie',

    description: 'Comfortable red hoodie with a front pocket.',

    price: 29.99,

    category: 'Men',

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Black Leather Jacket',

    description: 'Premium black leather jacket with a modern cut.',

    price: 199.99,

    category: 'Men',

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Green Summer Dress',

    description: 'Light and breezy green dress perfect for summer.',

    price: 39.99,

    category: 'Women',

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },
];

const ReviewsData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    rating: 5,

    comment: 'Great quality and fit!',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    rating: 4,

    comment: 'Very comfortable jeans.',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    rating: 3,

    comment: 'Color faded after washing.',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    rating: 5,

    comment: 'Love this jacket!',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    rating: 4,

    comment: 'Perfect for summer days.',
  },
];

const VariationsData = [
  {
    // type code here for "relation_one" field

    size: 'M',

    color: 'White',

    stock: 50,
  },

  {
    // type code here for "relation_one" field

    size: 'L',

    color: 'Blue',

    stock: 30,
  },

  {
    // type code here for "relation_one" field

    size: 'S',

    color: 'Red',

    stock: 20,
  },

  {
    // type code here for "relation_one" field

    size: 'XL',

    color: 'Black',

    stock: 10,
  },

  {
    // type code here for "relation_one" field

    size: 'M',

    color: 'Green',

    stock: 40,
  },
];

// Similar logic for "relation_many"

// Similar logic for "relation_many"

async function associateOrderItemWithOrder() {
  const relatedOrder0 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const OrderItem0 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (OrderItem0?.setOrder) {
    await OrderItem0.setOrder(relatedOrder0);
  }

  const relatedOrder1 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const OrderItem1 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (OrderItem1?.setOrder) {
    await OrderItem1.setOrder(relatedOrder1);
  }

  const relatedOrder2 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const OrderItem2 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (OrderItem2?.setOrder) {
    await OrderItem2.setOrder(relatedOrder2);
  }

  const relatedOrder3 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const OrderItem3 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (OrderItem3?.setOrder) {
    await OrderItem3.setOrder(relatedOrder3);
  }

  const relatedOrder4 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const OrderItem4 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (OrderItem4?.setOrder) {
    await OrderItem4.setOrder(relatedOrder4);
  }
}

async function associateOrderItemWithProduct() {
  const relatedProduct0 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const OrderItem0 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (OrderItem0?.setProduct) {
    await OrderItem0.setProduct(relatedProduct0);
  }

  const relatedProduct1 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const OrderItem1 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (OrderItem1?.setProduct) {
    await OrderItem1.setProduct(relatedProduct1);
  }

  const relatedProduct2 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const OrderItem2 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (OrderItem2?.setProduct) {
    await OrderItem2.setProduct(relatedProduct2);
  }

  const relatedProduct3 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const OrderItem3 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (OrderItem3?.setProduct) {
    await OrderItem3.setProduct(relatedProduct3);
  }

  const relatedProduct4 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const OrderItem4 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (OrderItem4?.setProduct) {
    await OrderItem4.setProduct(relatedProduct4);
  }
}

async function associateOrderWithCustomer() {
  const relatedCustomer0 = await Customers.findOne({
    offset: Math.floor(Math.random() * (await Customers.count())),
  });
  const Order0 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Order0?.setCustomer) {
    await Order0.setCustomer(relatedCustomer0);
  }

  const relatedCustomer1 = await Customers.findOne({
    offset: Math.floor(Math.random() * (await Customers.count())),
  });
  const Order1 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Order1?.setCustomer) {
    await Order1.setCustomer(relatedCustomer1);
  }

  const relatedCustomer2 = await Customers.findOne({
    offset: Math.floor(Math.random() * (await Customers.count())),
  });
  const Order2 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Order2?.setCustomer) {
    await Order2.setCustomer(relatedCustomer2);
  }

  const relatedCustomer3 = await Customers.findOne({
    offset: Math.floor(Math.random() * (await Customers.count())),
  });
  const Order3 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Order3?.setCustomer) {
    await Order3.setCustomer(relatedCustomer3);
  }

  const relatedCustomer4 = await Customers.findOne({
    offset: Math.floor(Math.random() * (await Customers.count())),
  });
  const Order4 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Order4?.setCustomer) {
    await Order4.setCustomer(relatedCustomer4);
  }
}

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

async function associateReviewWithProduct() {
  const relatedProduct0 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const Review0 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Review0?.setProduct) {
    await Review0.setProduct(relatedProduct0);
  }

  const relatedProduct1 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const Review1 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Review1?.setProduct) {
    await Review1.setProduct(relatedProduct1);
  }

  const relatedProduct2 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const Review2 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Review2?.setProduct) {
    await Review2.setProduct(relatedProduct2);
  }

  const relatedProduct3 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const Review3 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Review3?.setProduct) {
    await Review3.setProduct(relatedProduct3);
  }

  const relatedProduct4 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const Review4 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Review4?.setProduct) {
    await Review4.setProduct(relatedProduct4);
  }
}

async function associateReviewWithCustomer() {
  const relatedCustomer0 = await Customers.findOne({
    offset: Math.floor(Math.random() * (await Customers.count())),
  });
  const Review0 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Review0?.setCustomer) {
    await Review0.setCustomer(relatedCustomer0);
  }

  const relatedCustomer1 = await Customers.findOne({
    offset: Math.floor(Math.random() * (await Customers.count())),
  });
  const Review1 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Review1?.setCustomer) {
    await Review1.setCustomer(relatedCustomer1);
  }

  const relatedCustomer2 = await Customers.findOne({
    offset: Math.floor(Math.random() * (await Customers.count())),
  });
  const Review2 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Review2?.setCustomer) {
    await Review2.setCustomer(relatedCustomer2);
  }

  const relatedCustomer3 = await Customers.findOne({
    offset: Math.floor(Math.random() * (await Customers.count())),
  });
  const Review3 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Review3?.setCustomer) {
    await Review3.setCustomer(relatedCustomer3);
  }

  const relatedCustomer4 = await Customers.findOne({
    offset: Math.floor(Math.random() * (await Customers.count())),
  });
  const Review4 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Review4?.setCustomer) {
    await Review4.setCustomer(relatedCustomer4);
  }
}

async function associateVariationWithProduct() {
  const relatedProduct0 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const Variation0 = await Variations.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Variation0?.setProduct) {
    await Variation0.setProduct(relatedProduct0);
  }

  const relatedProduct1 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const Variation1 = await Variations.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Variation1?.setProduct) {
    await Variation1.setProduct(relatedProduct1);
  }

  const relatedProduct2 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const Variation2 = await Variations.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Variation2?.setProduct) {
    await Variation2.setProduct(relatedProduct2);
  }

  const relatedProduct3 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const Variation3 = await Variations.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Variation3?.setProduct) {
    await Variation3.setProduct(relatedProduct3);
  }

  const relatedProduct4 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const Variation4 = await Variations.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Variation4?.setProduct) {
    await Variation4.setProduct(relatedProduct4);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Customers.bulkCreate(CustomersData);

    await OrderItems.bulkCreate(OrderItemsData);

    await Orders.bulkCreate(OrdersData);

    await Products.bulkCreate(ProductsData);

    await Reviews.bulkCreate(ReviewsData);

    await Variations.bulkCreate(VariationsData);

    await Promise.all([
      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      await associateOrderItemWithOrder(),

      await associateOrderItemWithProduct(),

      await associateOrderWithCustomer(),

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      await associateReviewWithProduct(),

      await associateReviewWithCustomer(),

      await associateVariationWithProduct(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('customers', null, {});

    await queryInterface.bulkDelete('order_items', null, {});

    await queryInterface.bulkDelete('orders', null, {});

    await queryInterface.bulkDelete('products', null, {});

    await queryInterface.bulkDelete('reviews', null, {});

    await queryInterface.bulkDelete('variations', null, {});
  },
};
