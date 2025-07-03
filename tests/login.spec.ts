import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {generateRandomWord} from '../utils/DataGenerator';

test('User can log in with valid credentials', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await expect(page).toHaveURL('https://demo-bank.vercel.app/pulpit.html');
});