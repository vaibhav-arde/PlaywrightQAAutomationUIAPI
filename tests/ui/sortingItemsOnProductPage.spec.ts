import { test, expect } from '@playwright/test';
import { UtilityFunctions } from '../../utils/UtilityFunctions';
import { POManager } from '../../pageobjects/POManager';
import UserLoginData from '../../utils/UserLoginData.json';

let poManager: POManager;
let loginPage: any;

test.describe('Product Sorting Tests', () => {
  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(
      UserLoginData.standard_user.username,
      UserLoginData.standard_user.password
    );
  });

  test('Sort products by Name (A to Z)', async ({ page }) => {
    // Select "Name (A to Z)" from the dropdown
    await page.selectOption('select.product_sort_container', 'az');

    const nameLocator = page.locator('.inventory_item_name');
    const productNames = await UtilityFunctions.getTextContent(nameLocator);

    // Verify ascending order
    const sortedNames = UtilityFunctions.sortStrings(productNames, 'asc');
    expect(productNames).toEqual(sortedNames);
  });

  test('Sort products by Name (Z to A)', async ({ page }) => {
    // Select "Name (Z to A)" from the dropdown
    await page.selectOption('select.product_sort_container', 'za');

    const nameLocator = page.locator('.inventory_item_name');
    const productNames = await UtilityFunctions.getTextContent(nameLocator);

    // Verify descending order
    const sortedNames = UtilityFunctions.sortStrings(productNames, 'desc');
    expect(productNames).toEqual(sortedNames);
  });

  test('Sort products by Price (low to high)', async ({ page }) => {
    // Select "Price (low to high)" from the dropdown
    await page.selectOption('select.product_sort_container', 'lohi');

    const priceLocator = page.locator('.inventory_item_price');
    const productPrices = await UtilityFunctions.getNumericValues(priceLocator);

    // Verify ascending order
    const sortedPrices = UtilityFunctions.sortNumbers(productPrices, 'asc');
    expect(productPrices).toEqual(sortedPrices);
  });

  test('Sort products by Price (high to low)', async ({ page }) => {
    // Select "Price (high to low)" from the dropdown
    await page.selectOption('select.product_sort_container', 'hilo');

    const priceLocator = page.locator('.inventory_item_price');
    const productPrices = await UtilityFunctions.getNumericValues(priceLocator);

    // Verify descending order
    const sortedPrices = UtilityFunctions.sortNumbers(productPrices, 'desc');
    expect(productPrices).toEqual(sortedPrices);
  });
});
