import { test, expect } from '@playwright/test';
import { POManager } from '../../pageobjects/POManager';
import UserLoginData from '../../utils/UserLoginData.json';
import productData from '../../testData/productData.json'
import messageData from '../../testData/orderCompleteMessage.json'

let poManager: POManager;
let loginPage: any;
let productsPage: any;
let cartPage: any;
let checkoutPage: any;

test('@e2e Add multiple items to cart, remove items, and update cart quantities', async ({ page }) => {

    poManager = new POManager(page);
    loginPage = poManager.getLoginPage();
    productsPage = poManager.getProductsPage();
    cartPage = poManager.getCartPage();
    checkoutPage = poManager.getCheckoutPage();

    // Navigate to the inventory/products page
    await loginPage.goTo();
    await loginPage.validLogin(
        UserLoginData.standard_user.username,
        UserLoginData.standard_user.password
    );

    // Add multiple items to the cart
    await expect(productsPage.productsTitle).toBeVisible(); // Validate navigation
    await productsPage.validateProductsandAddToCart(productData);

    // Verify that the cart badge is updated
    const cartBadge = await productsPage.cartBadge
    await expect(cartBadge).toHaveText('2');
    // await page.pause()
    // Click on the shopping cart link to open the cart
    await productsPage.cart.click();

    // Verify the items are in the cart with name price and button
    let cartItems = await productsPage.cartItems
    await expect(cartItems).toHaveCount(2);
    
    await cartPage.validateProductsOnCartPage(productData)


    // // Remove an item from the cart (Sauce Labs Backpack)
    await cartPage.removeItemFromCart(productData[0])
    // cartItems = await productsPage.cartItems
    await expect(await productsPage.cartItems).toHaveCount(1);

    await cartPage.continueShopping.click()
    await expect(cartBadge).toHaveText('1');
    await productsPage.validateProductsandAddToCart([productData[0]]);
    await expect(cartBadge).toHaveText('2');
    
    // Click on the shopping cart link to open the cart
    await productsPage.cart.click();

    // Proceed to checkout
    await cartPage.checkout.click();

    // Cancel Checkout
    await checkoutPage.cancelBtn.click()
    await expect(productsPage.cartItems).toHaveCount(2);

    // Again proceed to checkout
    await cartPage.checkout.click();
    await checkoutPage.insertCheckOutDetailsAndContinue(UserLoginData.standard_user);
    await checkoutPage.validateCheckoutOverviewPage(productData);
    
    await checkoutPage.finishBtn.click()
    // Verify Order Complete messages
    await checkoutPage.validateOrderCompleteMessage(messageData)


    
});
