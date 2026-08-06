import { test} from '@playwright/test';
import { readTestData } from '../utils/excelReader';
import { FormPage } from '../pages/formpage';
import { LoginPage } from '../pages/LoginPage';

const dataRows = readTestData();
test.describe('Data-driven', () => {
  for (let i = 0; i < dataRows.length; i++) {
    const row = dataRows[i];
    test(`${row.employer_identification_number} [${row.company_name} / ${row.sector}] (${i + 1})`, async ({ page }) => {
      const formPage = new FormPage(page);
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(row.username, row.password);
      await formPage.CompanyInfo(row.company_name, row.company_address, row.employer_identification_number, row.sector, row.automation_tool, row.annual_automation_saving, row.date_of_first_project);
    });
  }
});
