import {googleLogin} from "../support/login";
import {Pagination} from "../support/Selectors/pagination";
import {GlobalSearch, Header, TeamPage} from "../support/Selectors/commonElements";
import {HeaderIconText} from "../support/consts/meshPageTexts";

describe('Redirect on Link', () => {
    describe('Correct user directing after login', () => {
        before(() => {
            googleLogin()
            cy.window().then((win) => {
                win.localStorage.setItem('onboarding_team_passed', JSON.stringify(true));
                win.localStorage.setItem('onboarding_mesh_passed', JSON.stringify(true));
                win.localStorage.setItem('onboarding_profile_passed', JSON.stringify(true));
            });
        })
        beforeEach(() => {
            // Відновлюємо кеш перед кожним тестом
            cy.restoreGlobalLocalStorage(); // Відновлюємо глобальний кеш перед кожним тестом
            Cypress.on('uncaught:exception', (err, runnable) => {
                // returning false here prevents Cypress from
                // failing the test
                return false
            })
        });
        it('Log out from Profile page and login', () => {
            cy.visit('/people/my-profile');
            // Check if the user is redirected to the login page
            cy.url().should('include', '/people/my-profile');
            cy.get(Header.menuBtn).click()
            cy.contains(HeaderIconText.exitMenuItem).click()

            googleLogin()
            cy.reload();
            cy.url().should('include', '/people/my-profile');
            cy.get('[data-cy="profile-page-user-name"]').should('have.text', 'Максим Котовський')
        })
        it('Log out from Org chart page and login', () => {
            cy.visit('/people/team');
            // Check if the user is redirected to the login page
            cy.url().should('include', '/people/team');
            cy.get(Header.menuBtn).click()
            cy.contains(HeaderIconText.exitMenuItem).click()

            googleLogin()
            cy.reload();
            cy.url().should('include', '/people/team');
            cy.get('[href="/people/form"]').should('exist').and('be.visible')
        })
        it('Log out from Search page and login', () => {
            cy.visit('/search');
            // Check if the user is redirected to the login page
            cy.url().should('include', '/search');
            cy.get(Header.menuBtn).click()
            cy.contains(HeaderIconText.exitMenuItem).click()

            googleLogin()
            cy.reload();
            cy.url().should('include', '/search');
            cy.contains('People').should('exist').and('be.visible')
            cy.contains('Drive').should('exist').and('be.visible')

        })
    })
    describe('paste link before login', () => {
        beforeEach(() => {
            Cypress.on('uncaught:exception', (err, runnable) => {
                // returning false here prevents Cypress from
                // failing the test
                return false
            })
        });
        it('Login with link on mesh page', () => {
            cy.visit('/mesh');
            // Check if the user is redirected to the login page
            cy.url().should('include', '/mesh');

            googleLogin()
            cy.reload();
            cy.url().should('include', '/mesh');
            cy.contains('Віджети')
        })
        it('Login with link on Profile page', () => {
            cy.visit('/people/my-profile');
            // Check if the user is redirected to the login page
            cy.url().should('include', '/people/my-profile');

            googleLogin()
            cy.reload();
            cy.url().should('include', '/people/my-profile');
            cy.get('[data-cy="profile-page-user-name"]').should('have.text', 'Максим Котовський')
        })
        it('Login with link on Org chart page', () => {
            cy.visit('/people/team');
            // Check if the user is redirected to the login page
            cy.url().should('include', '/people/team');

            googleLogin()
            cy.reload();
            cy.url().should('include', '/people/team');
            cy.get('[href="/people/form"]').should('exist').and('be.visible')
        })
        it('Login with link on Search page', () => {
            cy.visit('/search');
            // Check if the user is redirected to the login page
            cy.url().should('include', '/search');

            googleLogin()
            cy.reload();
            cy.url().should('include', '/search');
            cy.contains('People').should('exist').and('be.visible')
            cy.contains('Drive').should('exist').and('be.visible')
        })

    })
})
