
import { test, expect, request } from '@playwright/test';
import { validate } from 'jsonschema'; // Import validate function from jsonschema
import { getProductsSchema, postProductSchema } from '../testData/jsonSchemas';
import { APiUtils } from '../utils/APiUtils'; // Import the utility class

const BASE_URL = "https://dummyjson.com";
// const BASE_URL = process.env.API_BASE_URL;

// Create an instance of ApiUtils to make API calls
let apiUtils: APiUtils;

test.beforeAll(async () => {
  // Initialize the API utility with the context (e.g., Playwright's request context) and login payload
  const apiContext = await request.newContext(); // Using Playwright's request context
  const loginPayload: any = { username: 'your-username', password: 'your-password' }; // Your login payload
  apiUtils = new APiUtils(apiContext, loginPayload);
});

test.describe('API Tests for DummyJSON', () => {

  test('GET /products - Validate Response Schema and Data', async () => {
    const responseBody = await apiUtils.get(`${BASE_URL}/products`);
    expect(responseBody).toBeDefined();
    const validationResult = validate(responseBody, getProductsSchema);
    expect(validationResult.valid, JSON.stringify(validationResult.errors)).toBeTruthy();
    expect(responseBody.products.length).toBeGreaterThan(0);
  });

  test('POST /products/add - Create a New Product', async () => {
    const newProduct = {
      title: "Test Product",
      description: "A product created during testing.",
      price: 123,
    };

    const responseBody = await apiUtils.post(`${BASE_URL}/products/add`, newProduct);
    expect(responseBody).toBeDefined();
    const validationResult = validate(responseBody, postProductSchema);
    expect(validationResult.valid, JSON.stringify(validationResult.errors)).toBeTruthy();
    expect(responseBody.title).toBe(newProduct.title);
    expect(responseBody.description).toBe(newProduct.description);
    expect(responseBody.price).toBe(newProduct.price);
  });

  test('GET /products - Validate Pagination', async () => {
    const responseBody = await apiUtils.get(`${BASE_URL}/products?limit=5`);
    expect(responseBody).toBeDefined();
    expect(responseBody.limit).toBe(5);
    expect(responseBody.products.length).toBe(5);
  });

  test('GET /products - Validate Invalid Endpoint Handling', async ({request}) => {
    const response = await request.get(`${BASE_URL}/invalidEndpoint`);
    expect(response.status()).toBe(404);
  });

});
