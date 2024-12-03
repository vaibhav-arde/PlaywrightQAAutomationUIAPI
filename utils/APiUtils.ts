export class APiUtils {
    apiContext: any;
    loginPayLoad: any;
  
    constructor(apiContext: any, loginPayLoad: {}) {
      this.apiContext = apiContext;
      this.loginPayLoad = loginPayLoad;
    }
  
    // Method to get token
    async getToken() {
      const loginResponse = await this.post("/api/ecom/auth/login", this.loginPayLoad)
      const token = loginResponse.token;
      console.log("token", token);
      return token;
    }
  
    // Method to create an order
    async createOrder(orderPayLoad: {}) {
      const response = { token: "", orderId: "" };
      response.token = await this.getToken();
      let headers = {
        Authorization: response.token,
        "Content-Type": "application/json",
      }
      const orderResponse = await this.post("/api/ecom/order/create-order", orderPayLoad, headers)
      console.log("orderResponse", orderResponse);
      response.orderId = orderResponse.orders[0];
      return response;
    }
  
    // Method to make GET requests
    async get(url: string) {
      const response = await this.apiContext.get(url);
      const responseBody = await response.json();
      return responseBody;
    }
  
    // Method to make POST requests
    async post(url: string, data: any, headers?: any) {
      const response = await this.apiContext.post(url, {
        data: data,
        headers: headers
      });
      const responseBody = await response.json();
      return responseBody;
    }
  }
  