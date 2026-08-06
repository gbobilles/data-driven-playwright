// pages/LoginPage.ts
import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly signUpBtn: Locator;
    readonly orLoginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput =  page.locator('input[type="email"] >> visible=true');
    this.passwordInput = page.locator('input[type="password"] >> visible=true')
    this.loginButton = page.getByRole('button', { name: /LOG IN/i });
    this.signUpBtn = page.getByRole('button', { name: /SIGN UP OR LOGIN/i });
    this.orLoginBtn = page.getByRole('button', { name: /OR LOGIN/i }).last(); 
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.signUpBtn.click();
    await this.page.waitForTimeout(1000); 
    await this.orLoginBtn.click();
    await this.page.waitForTimeout(1000);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password.toString());
    await this.loginButton.click();
  }

}