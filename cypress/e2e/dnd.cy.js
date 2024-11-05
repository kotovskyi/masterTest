import {googleLogin} from "../support/login";
import {Pagination} from "../support/Selectors/pagination";
import {GlobalSearch, TeamPage} from "../support/Selectors/commonElements";


describe('Move widgets using DnD', () => {
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
    it('should drag the widget horizontally to the right within the same row using DataTransfer', () => {
        cy.visit('/');

        // Відкриваємо меню для перетягування
        cy.get('[data-cy="chat-widget"]')
            .find('.MuiButtonBase-root')
            .should('be.visible')
            .click({ force: true });

        cy.contains('[role="menuitem"]', 'Перемістити').click();

        // Функція для перетягування віджета
        const dragAndDrop = (dragLocator, dropLocator) => {
            cy.get(dragLocator)
                .realMouseDown({button: 'left', position: 'center'})  // Натискаємо на елемент
                .realMouseMove(0, 100, {position: 'center'})           // Трохи рухаємо мишу вниз, щоб активувати переміщення
                .wait(200);                                             // Затримка для більш плавного перетягування

            cy.get(dropLocator)
                .realMouseMove(0, 0, {position: 'center'})            // Переміщуємо мишу до цільового елемента
                .realMouseUp();                                         // Відпускаємо мишу
        };

        // Використовуємо функцію для перетягування віджета
        dragAndDrop('[data-cy="chat-widget"]', '[data-cy="profile-widget"]');


    });

})

