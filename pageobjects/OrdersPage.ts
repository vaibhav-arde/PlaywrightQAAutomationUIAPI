import { expect, Locator, Page } from '@playwright/test';
export class OrdersPage {

    page: Page;
    ordersButton: Locator;
    tableBody: Locator;
    orderIdTxt: Locator;


    constructor(page: Page) {
        this.page = page;
        this.ordersButton = page.locator("button[routerlink*='myorders']");
        this.tableBody = page.locator("tbody");
        this.orderIdTxt = page.locator(`.col-text`);

    }

    async clickViewForRespectiveOrder(orderId: string[]){
        const rows = this.page.locator("tbody tr");

        for (let i = 0; i < await rows.count(); ++i) {
            const rowOrderId = await rows.nth(i).locator("th").textContent() ?? "";
            if (orderId.includes(rowOrderId)) {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
    }

}