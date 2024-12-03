import { test, expect, request } from '@playwright/test';
import orderData from '../testData/orderData.json'
import { POManager } from '../pageobjects/POManager';
import userdata from '../utils/UserLoginData.json'

let poManager: POManager;
let loginPage: any;
let ordersPage: any;
let productsPage: any;
 
 
test('@Security Security test request intercept', async ({ page }) => {
    poManager = new POManager(page);
    loginPage = poManager.getLoginPage();
    ordersPage = poManager.getOrdersPage();
    productsPage = poManager.getProductsPage();
    
    // Login though UI and reach orders page
    await page.goto("/client");
    await loginPage.userEmail.fill(userdata.valid_user.useremail);
    await loginPage.password.fill(userdata.valid_user.password);
    await loginPage.loginButton.click();

    await page.waitForLoadState('networkidle');
    await productsPage.productName.first().waitFor()
    // await page.locator(".card-body b").first().waitFor();
    await ordersPage.ordersButton.waitFor()
    
    // await page.locator("button[routerlink*='myorders']").click();
    await ordersPage.ordersButton.click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route => route.continue({ url: `https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=${orderData.OtherUserOrder}` }))
    
    await ordersPage.orderViewButton.first().click();
    await page.waitForLoadState('networkidle');
    // console.log("notAuthorisedMessage", ordersPage.notAuthorisedMessage.textContent())
    // expect(ordersPage.notAuthorisedMessage.textContent()).toEqual(orderData.notAuthorisedMessage);

})