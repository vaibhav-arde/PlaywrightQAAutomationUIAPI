export const getProductsSchema = {
    type: "object",
    properties: {
      products: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            category: { type: "string" },
            stock: { type: "integer" },
          },
          required: ["id", "title", "description", "price", "category", "stock"]
        }
      },
      total: { type: "integer" },
      skip: { type: "integer" },
      limit: { type: "integer" }
    },
    required: ["products", "total", "skip", "limit"]
  };
  
  export const postProductSchema = {
    type: "object",
    properties: {
      id: { type: "integer" },
      title: { type: "string" },
      description: { type: "string" },
      price: { type: "number" },
    },
    required: ["id", "title", "description", "price"]
  };
  