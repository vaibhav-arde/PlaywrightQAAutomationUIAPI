import { expect, Locator, Page } from '@playwright/test';
export class CheckoutPage {

    firstName: Locator;
    lastName: Locator;
    postalCode: Locator;
    continueBtn: Locator;
    cancelBtn: Locator;
    subtotal: Locator;
    tax: Locator;
    total: Locator;
    orderCompleteHeader: Locator;
    orderCompleteMessage: Locator;
    backHomeBtn: Locator;
    finishBtn: Locator;
    page: Page;


    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator(`#first-name`);
        this.lastName = page.locator(`#last-name`);
        this.postalCode = page.locator(`#postal-code`);
        this.continueBtn = page.locator(`#continue`);
        this.cancelBtn = page.locator(`#cancel`);
        this.subtotal = page.locator(`.summary_subtotal_label`);
        this.tax = page.locator(`.summary_tax_label`);
        this.total = page.locator(`.summary_total_label`);
        this.orderCompleteHeader = page.locator(`h2.complete-header`);
        this.orderCompleteMessage = page.locator(`div.complete-text`);
        this.backHomeBtn = page.locator(`#back-to-products`);
        this.finishBtn = page.locator(`#finish`);

    }

    async insertCheckOutDetailsAndContinue(data:any){
        await this.firstName.fill(data.firstname)
        await this.lastName.fill(data.lastname)
        await this.postalCode.fill(data.zipcode)
        await this.continueBtn.click()
    }

    async validateOrderCompleteMessage(data:any){
        await expect(this.orderCompleteHeader).toHaveText(data.headerMessage)
        await expect(this.orderCompleteMessage).toHaveText(data.fullMessage)
    }

    async validateCheckoutOverviewPage(productData: any[]) {
        let totalCost= 0
        for (const data of productData) {
            // Locate the container of the product using the name
            const productContainer = this.page.locator('.cart_item_label', { hasText: data.name });

            // Locate the price inside the product container
            const priceLocator = productContainer.locator('.inventory_item_price');

            // Retrieve the text of the price element
            const price = await priceLocator.innerText();

            // Assert the price matches the expected value
            expect(price).toBe(data.price);
            totalCost= totalCost + parseFloat(price.replace('$','').trim())
            
        }
        
        expect(this.subtotal).toHaveText(`Item total: \$${totalCost}`)

        // Validate Item total, tax and total on checkout overview page
        let subTotalCost = await this.subtotal.innerText()
        let subTotalNum = await parseFloat(subTotalCost.split('$')[1])
        
        let taxCost = await this.tax.innerText()
        let taxNum = await parseFloat(taxCost.split('$')[1])
        
        let fullCost = await this.total.innerText()
        let fullNum = await parseFloat(fullCost.split('$')[1])

        expect(fullNum == (parseFloat(subTotalNum.toFixed(2)) + taxNum)).toBeTruthy()

    }
}