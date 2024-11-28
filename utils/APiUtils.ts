export class ApiUtils {
    apiContext: any;
    loginPayLoad: any;
  
    constructor(apiContext: any, loginPayLoad: string) {
      this.apiContext = apiContext;
      this.loginPayLoad = loginPayLoad;
    }
  
    // Method to get token
    async getToken() {
      const loginResponse = await this.apiContext.post(
        "https://dummyjson.com/api/ecom/auth/login",
        {
          data: this.loginPayLoad,
        }
      );
      const loginResponseJson = await loginResponse.json();
      const token = loginResponseJson.token;
      console.log(token);
      return token;
    }
  
    // Method to create an order
    async createOrder(orderPayLoad: string) {
      const response = { token: "", orderId: "" };
      response.token = await this.getToken();
      
      const orderResponse = await this.apiContext.post(
        "https://dummyjson.com/api/ecom/order/create-order",
        {
          data: orderPayLoad,
          headers: {
            Authorization: response.token,
            "Content-Type": "application/json",
          },
        }
      );
  
      const orderResponseJson = await orderResponse.json();
      console.log(orderResponseJson);
      response.orderId = orderResponseJson.orders[0];
      return response;
    }
  
    // Method to make GET requests
    async get(url: string) {
      const response = await this.apiContext.get(url);
      const responseBody = await response.json();
      return responseBody;
    }
  
    // Method to make POST requests
    async post(url: string, data: any) {
      const response = await this.apiContext.post(url, {
        data: data,
      });
      const responseBody = await response.json();
      return responseBody;
    }
  }
  