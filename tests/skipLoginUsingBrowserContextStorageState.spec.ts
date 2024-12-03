//Login UI  -> .json

//test browser-> .json , cart-,order, orderdetails,orderhistory
import { test, expect, request } from '@playwright/test';
import userdata from '../utils/UserLoginData.json'
import orderData from '../testData/orderData.json'
import { POManager } from '../pageobjects/POManager';

let webContext: any;
let poManager: POManager;
let loginPage: any;
let productsPage: any;


test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    poManager = new POManager(page);
    loginPage = poManager.getLoginPage();
    productsPage = poManager.getProductsPage();

    await page.goto("/client");

    await loginPage.userEmail.fill(userdata.valid_user.useremail);
    await loginPage.password.fill(userdata.valid_user.password);
    await loginPage.loginButton.click();
    
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: 'state.json' });

    webContext = await browser.newContext({ storageState: 'state.json' });
})

test('@SkipUILogin Validate products on products page', async () => {
    const page = await webContext.newPage();
    await page.goto("/client");
    await page.waitForLoadState('networkidle');

    // const titles = await page.locator(".card-body b").allTextContents();
    const titles = await productsPage.productName.allTextContents();
    expect(orderData.products).toEqual(titles)
    console.log(titles);
})
