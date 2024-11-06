import {googleLogin} from "../support/login";
import {BirthdayWidget} from "../support/Selectors/birthdayWidget";
import { NavigationBar, ProfilePage, TeamPage, Widgets} from "../support/Selectors/commonElements";
import { generateRandomFutureDate } from '../support/utils';
const { date, birthday } = generateRandomFutureDate();

describe('Birthday Widget', () => {
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
        cy.visit('/')
    });
    it('Verify widget when no users has birthdays', () => {
        cy.window().then((win) => {
            win.localStorage.setItem('birthdayDate', '2000-01-01');
        });
        cy.get(Widgets.teamWidget).should('be.visible')
        cy.get(BirthdayWidget.widgetBlock).should('not.exist')
    })
    it('Verify widget when one user has birthday', () => {
        cy.window().then((win) => {
            win.localStorage.setItem('birthdayDate', '2000-11-07');
        });
        cy.get(Widgets.teamWidget).should('be.visible')
        cy.get(BirthdayWidget.widgetBlock).should('exist')
        cy.get(BirthdayWidget.employeeCount).should('have.text','1')
        cy.get(BirthdayWidget.employeeAvatar).should('have.length', '1')
        cy.get(BirthdayWidget.viewAllButton).should('not.exist')
        cy.get(BirthdayWidget.employeeAvatar).click()
        cy.url().should('include', '/people/employee')
        cy.get(ProfilePage.userLocation).should('have.text', 'QA')

    })
    it('Verify widget when three user has birthdays', () => {
        cy.window().then((win) => {
            win.localStorage.setItem('birthdayDate', '2000-11-06');
        });
        cy.get(Widgets.teamWidget).should('be.visible')
        cy.get(BirthdayWidget.widgetBlock).should('exist')
        cy.get(BirthdayWidget.employeeCount).should('have.text','3')
        cy.get(BirthdayWidget.employeeAvatar).should('have.length', '3')
        cy.get(BirthdayWidget.viewAllButton).should('not.exist')
        cy.get(BirthdayWidget.employeeAvatar).eq(1).click()
        cy.url().should('include', '/people/employee')
        cy.get(ProfilePage.userLocation).should('have.text', 'QA')

    })
    it('Verify widget when nine user has birthdays. Click "Дивитися всіх" button', () => {
        cy.window().then((win) => {
            win.localStorage.setItem('birthdayDate', '2000-11-04');
        });
        cy.get(Widgets.teamWidget).should('be.visible')
        cy.get(BirthdayWidget.widgetBlock).should('exist')
        cy.get(BirthdayWidget.employeeCount).should('have.text','9')
        cy.get(BirthdayWidget.employeeAvatar).should('have.length', '7')
        cy.get(BirthdayWidget.additionalEmployeeCount).should('have.text', '+2')
        cy.get(BirthdayWidget.viewAllButton).should('exist')
        cy.get(BirthdayWidget.employeeAvatar).eq(1).click()
        cy.url().should('include', '/people/employee')
        cy.get(ProfilePage.userLocation).should('have.text', 'QA')
        cy.get(NavigationBar.widgetsLink).click()
        cy.get(BirthdayWidget.viewAllButton).should('exist').click()
        cy.get(TeamPage.employeeAvatar).should('have.length', '9')
        cy.get(TeamPage.employeeLocation).each(($el) => {
            cy.wrap($el).should('have.text', 'QA');
        });
        cy.contains(TeamPage.teamPageFilterItem,'QA').find('[type="checkbox"]').eq(0).should('be.checked')
        cy.contains(TeamPage.teamPageFilterItem,'meta4').find('[type="checkbox"]').eq(0).should('not.be.checked')
        cy.contains(TeamPage.teamPageFilterItem,'UX/UI').find('[type="checkbox"]').eq(0).should('not.be.checked')
        cy.contains(TeamPage.teamPageFilterItem,'frontend').find('[type="checkbox"]').eq(0).should('not.be.checked')
        cy.contains(TeamPage.teamPageFilterItem,'BA').find('[type="checkbox"]').eq(0).should('not.be.checked')

        cy.url().should('match', new RegExp(`/people/team\\?dayOfBirth=04-11&workgroupIds=${Cypress.env("metaLastDepartment")}$`));
    })
    it('Verify possibility remove widget when three users has birthdays', () => {
        cy.window().then((win) => {
            win.localStorage.setItem('birthdayDate', '2000-11-06');
        });
        cy.get(Widgets.teamWidget).should('be.visible')
        cy.get(BirthdayWidget.widgetBlock).should('exist')
        cy.get(BirthdayWidget.employeeCount).should('have.text','3')
        cy.get(BirthdayWidget.employeeAvatar).should('have.length', '3')
        cy.get(BirthdayWidget.viewAllButton).should('not.exist')
        cy.get(BirthdayWidget.closeButton).click()
        cy.get(BirthdayWidget.widgetBlock).should('not.exist')
    })
    it('Verify possibility remove widget when nine users has birthdays', () => {
        cy.window().then((win) => {
            win.localStorage.setItem('birthdays', `${birthday}`);
            win.localStorage.setItem('birthdayDate', '2000-11-04');
        });
        cy.get(Widgets.teamWidget).should('be.visible')
        cy.get(BirthdayWidget.widgetBlock).should('exist')
        cy.get(BirthdayWidget.employeeCount).should('have.text','9')
        cy.get(BirthdayWidget.employeeAvatar).should('have.length', '7')
        cy.get(BirthdayWidget.additionalEmployeeCount).should('have.text', '+2')
        cy.get(BirthdayWidget.viewAllButton).should('exist')
        cy.get(BirthdayWidget.closeButton).click()
        cy.get(BirthdayWidget.widgetBlock).should('not.exist')
        cy.reload()
        cy.get(Widgets.teamWidget).should('be.visible')
        cy.get(BirthdayWidget.widgetBlock).should('not.exist')

    })
    it('The widget reappears the next day after being closed.', () => {
        cy.window().then((win) => {
            win.localStorage.setItem('birthdayDate', '2000-11-07');
            win.localStorage.setItem('birthdays', `${birthday}`);

        });
        cy.get(Widgets.teamWidget).should('be.visible')
        cy.get(BirthdayWidget.widgetBlock).should('exist')
        cy.get(BirthdayWidget.employeeCount).should('have.text','1')
        cy.get(BirthdayWidget.employeeAvatar).should('have.length', '1')
        cy.get(BirthdayWidget.viewAllButton).should('not.exist')
        cy.get(BirthdayWidget.closeButton).click()

        cy.get(BirthdayWidget.widgetBlock).should('not.exist')
        cy.reload()
        cy.get(Widgets.teamWidget).should('be.visible')
        cy.get(BirthdayWidget.widgetBlock).should('not.exist')
        cy.window().then((win) => {
            win.localStorage.setItem('birthdays', '2024-11-08');
        });
        cy.reload()
        cy.get(Widgets.teamWidget).should('be.visible')
        cy.get(BirthdayWidget.widgetBlock).should('exist')

    })

})
