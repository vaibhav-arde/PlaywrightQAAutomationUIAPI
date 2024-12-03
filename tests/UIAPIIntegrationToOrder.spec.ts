
import { test, expect, request } from '@playwright/test';
import { APiUtils } from '../utils/APiUtils'
import userdata from '../utils/UserLoginData.json'
import orderData from '../testData/orderData.json'
import { POManager } from '../pageobjects/POManager';

const loginPayLoad = {userEmail:userdata.valid_user.useremail,userPassword:userdata.valid_user.password};
const orderPayLoad = { orders: [{ country: orderData.order1.country, productOrderedId: orderData.order1.productOrderedId }] };

let poManager: POManager;
let ordersPage: any;
let response: any;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
})

// Here Order is created with help of API and 
// Then with help of addInitScript, token is inserted in page which allow us to skip login using UI.

test('@APIUI Place the order', async ({ page }) => {

    poManager = new POManager(page);
    ordersPage = poManager.getOrdersPage();

    // Below step insert the token into local storage
    page.addInitScript((value : any) => {
        window.localStorage.setItem('token', value);
    }, response.token);

    // Login without UI
    await page.goto("/client");

    // Navigate to orders page
    await ordersPage.ordersButton.click();
    await ordersPage.tableBody.waitFor();

    // OpenOrder Summary for respective order
    await ordersPage.clickViewForRespectiveOrder(response.orderId)

    // Verify same orderid is present on order summary page as well
    await ordersPage.orderIdTxt.waitFor();
    const orderIdDetails = await ordersPage.orderIdTxt.textContent();
    console.log("orderIdDetails", orderIdDetails)
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});
