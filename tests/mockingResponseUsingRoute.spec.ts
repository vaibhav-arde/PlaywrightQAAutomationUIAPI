
import { test, expect, request } from '@playwright/test';
import { APiUtils } from '../utils/APiUtils'
import userdata from '../utils/UserLoginData.json'
import orderData from '../testData/orderData.json'

const fakePayLoadOrders = { data: [], message: "No Orders" };
const loginPayLoad = { userEmail: userdata.valid_user.useremail, userPassword: userdata.valid_user.password };
const orderPayLoad = { orders: [{ country: orderData.order1.country, productOrderedId: orderData.order1.productOrderedId }] };


let response: any;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);

})


// First we create order successfully 
test('@NoOrder Replace response of request to show that we dont have orders', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("/client");

    // Adding a route to respond fake order information as no Orders
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill(
                {
                    response,
                    body,

                });
            //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
        });

    // Click orders button to validate respose for No orders.
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")

    expect(await page.locator(".mt-4").textContent()).toEqual(orderData.youHaveNoOrders)


});