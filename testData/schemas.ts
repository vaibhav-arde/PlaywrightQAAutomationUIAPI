
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
            category: { type: "string" },
            price: { type: "number" },
            discountPercentage: { type: "number" },
            rating: { type: "number" },
            stock: { type: "integer" },
            tags: {
              type: "array",
              items: { type: "string" }
            },
            brand: { type: "string" },
            sku: { type: "string" },
            weight: { type: "integer" },
            dimensions: {
              type: "object",
              properties: {
                length: { type: "number" },
                width: { type: "number" },
                height: { type: "number" }
              },
              required: ["length", "width", "height"]
            },
            warrantyInformation: { type: "string" },
            shippingInformation: { type: "string" },
            availabilityStatus: { type: "string" },
            reviews: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  userId: { type: "integer" },
                  rating: { type: "number" },
                  comment: { type: "string" }
                },
                required: ["userId", "rating"]
              }
            },
            returnPolicy: { type: "string" },
            minimumOrderQuantity: { type: "integer" },
            meta: {
              type: "object",
              properties: {
                addedDate: { type: "string", format: "date" },
                updatedDate: { type: "string", format: "date-time" }
              }
            },
            images: {
              type: "array",
              items: { type: "string", format: "uri" }
            },
            thumbnail: { type: "string", format: "uri" }
          },
          required: [
            "id",
            "title",
            "description",
            "category",
            "price",
            "discountPercentage",
            "rating",
            "stock",
            "tags",
            "sku",
            "weight",
            "dimensions",
            "warrantyInformation",
            "shippingInformation",
            "availabilityStatus",
            "returnPolicy",
            "minimumOrderQuantity",
            "meta",
            "images",
            "thumbnail"
          ]
        }
      },
      total: { type: "integer" },
      skip: { type: "integer" },
      limit: { type: "integer" }
    },
    required: ["products", "total", "skip", "limit"]
  }

  export const postProductSchema = {
    type: "object",
    properties: {
      id: { type: "integer" },
      title: { type: "string" },
      description: { type: "string" },
      price: { type: "integer" },
    },
    required: ["id", "title", "description", "price"]
  };
  