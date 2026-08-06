// pages/FormPage.ts
import { type Page, type Locator } from '@playwright/test';

export class FormPage {
    readonly page: Page;
    readonly startBtn: Locator;
    readonly companyNameInput: Locator;
    readonly einInput: Locator;
    readonly companyAddressInput: Locator;
    readonly sectorInput: Locator;
    readonly automationToolInput: Locator;
    readonly annualSavingInput: Locator;
    readonly dateInput: Locator;
    readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.startBtn = page.getByRole('button', { name: /Start/i } ).last();
    this.companyNameInput = page.locator('input[id^="company_name_input_field_"] >> visible=true');
    this.einInput = page.locator('input[id^="ein_input_field_"] >> visible=true');
    this.companyAddressInput = page.locator('input[id^="address_input_field_"] >> visible=true');
    this.sectorInput = page.locator('input[id^="sector_input_field_"] >> visible=true');
    this.automationToolInput = page.locator('input[id^="automation_tool_input_field_"] >> visible=true');
    this.annualSavingInput = page.locator('input[id^="annual_saving_input_field_"] >> visible=true');
    this.dateInput = page.locator('input[id^="date_input_field_"] >> visible=true');
    this.submitButton = page.getByRole('button', { name: /Submit/i });
  }

  async CompanyInfo(company_name: string, company_address: string, employer_identification_number: string, sector: string, automation_tool: string, annual_automation_saving: string, date_of_first_project: string) {
      await this.startBtn.click();
      await this.page.waitForTimeout(1000); 
      await this.companyNameInput.fill(company_name);
      await this.companyAddressInput.fill(company_address);
      await this.einInput.fill(employer_identification_number);
      await this.sectorInput.fill(sector);
      await this.automationToolInput.fill(automation_tool);
      await this.annualSavingInput.fill(annual_automation_saving);
      await this.dateInput.fill(date_of_first_project);
      await this.submitButton.click();
      if (await this.page.getByRole('button', { name: /presentation/i }).isVisible()) {
          await this.page.getByRole('button', { name: /presentation/i }).click();
      }
  }

}