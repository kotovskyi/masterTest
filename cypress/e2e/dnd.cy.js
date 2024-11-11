import {googleLogin} from "../support/login";
import {Pagination} from "../support/Selectors/pagination";
import {GlobalSearch, TeamPage, Widgets} from "../support/Selectors/commonElements";
import {captureWidgetPosition} from "../support/widgetUtils";

let initialPosition;
let initialWidgetPosition;


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

        cy.viewport(1920, 1080)
        cy.restoreGlobalLocalStorage(); // Відновлюємо глобальний кеш перед кожним тестом
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
        })
        cy.visit('/');

    });
    it('Drag widget (small size widget) diagonally.', () => {

        // Change widget size on small
        cy.get(Widgets.jiraWidget).find(Widgets.moreBtnWidget).click()
        cy.contains(Widgets.menuItem, 'Змінити розмір').click()
        cy.get(Widgets.dialogWidgetSize).should('exist')
        cy.get(Widgets.smallSize).eq(2).click()
        cy.contains('[type="button"]', 'Редагувати').click();

        captureWidgetPosition(Widgets.jiraWidget).then((pos) => {
            initialPosition = pos;
        });
        // Capture initial position of the Google Calendar widget
        captureWidgetPosition(Widgets.calendarWidget).then((pos) => {
            initialWidgetPosition = pos;
        });
        // Move small Jira widget
        cy.dragAndDrop(Widgets.jiraWidget, Widgets.calendarWidget);
        cy.contains('Готово').click()

        // Verify new position of Jira widget
        cy.get(Widgets.jiraWidget).then(($widget) => {
            const {top, left} = $widget[0].getBoundingClientRect();
            // Optionally, verify specific movement direction or amount if needed
            expect(top).to.be.greaterThan(initialPosition.top);  // Check if moved downward
            expect(left).to.be.lessThan(initialPosition.left);     // Verify it moved leftward
        });
        // Verify new position of the Google Calendar widget
        cy.get(Widgets.calendarWidget).then(($widget) => {
            const {top, left} = $widget[0].getBoundingClientRect();
            // Ensure the Google Calendar widget has moved down
            expect(top).to.be.greaterThan(initialWidgetPosition.top); // Verify it moved downward
            expect(left).to.equal(initialWidgetPosition.left);        // Verify it stayed in the same horizontal position
        });

    });
    it('Drag widget (small size widget) vertically.', () => {

        cy.contains('[type="button"]', 'Редагувати').click();

        captureWidgetPosition(Widgets.jiraWidget).then((pos) => {
            initialPosition = pos;
        });
        // Capture initial position of the Google Calendar widget
        captureWidgetPosition(Widgets.positionWidget).then((pos) => {
            initialWidgetPosition = pos;
        });
        // Move small Jira widget
        cy.dragAndDrop(Widgets.jiraWidget, Widgets.positionWidget);
        cy.contains('Готово').click()

        // Verify new position of the Jira widget
        cy.get(Widgets.jiraWidget).then(($widget) => {
            const {top, left} = $widget[0].getBoundingClientRect();

            // Check if it moved horizontally left but did not move vertically
            expect(left).to.be.lessThan(initialPosition.left); // Moved leftward
            expect(top).to.be.lessThan(initialPosition.top);   // Moved upward
        });

        // Verify new position of the Team widget
        cy.get(Widgets.positionWidget).then(($widget) => {
            const {top, left} = $widget[0].getBoundingClientRect();

            // Ensure the Team widget did not move in any direction
            expect(top).to.greaterThan(initialWidgetPosition.top);  // No vertical movement
            expect(left).to.equal(initialWidgetPosition.left); // No horizontal movement
        });
    })

    it('Drag widget (medium size widget) diagonally.', () => {
        cy.window().then((win) => {
            win.localStorage.setItem('widgets', Cypress.env("standartWidgetPositions"));
        });
        // Chage widget size on small
        cy.get(Widgets.jiraWidget).find(Widgets.moreBtnWidget).click()
        cy.contains(Widgets.menuItem, 'Змінити розмір').click()
        cy.get(Widgets.dialogWidgetSize).should('exist')
        cy.get(Widgets.mediumSize).eq(1).click()
        cy.contains('[type="button"]', 'Редагувати').click();

        captureWidgetPosition(Widgets.jiraWidget).then((pos) => {
            initialPosition = pos;
        });
        // Capture initial position of the Google Calendar widget
        captureWidgetPosition(Widgets.calendarWidget).then((pos) => {
            initialWidgetPosition = pos;
        });
        // Move small Jira widget
        cy.dragAndDrop(Widgets.jiraWidget, Widgets.calendarWidget);
        cy.contains('Готово').click()

        // Verify new position of Jira widget
        cy.get(Widgets.jiraWidget).then(($widget) => {
            const {top, left} = $widget[0].getBoundingClientRect();
            // Optionally, verify specific movement direction or amount if needed
            expect(top).to.be.greaterThan(initialPosition.top);  // Check if moved downward
            expect(left).to.be.lessThan(initialPosition.left);     // Verify it moved leftward
        });
        // Verify new position of the Google Calendar widget
        cy.get(Widgets.calendarWidget).then(($widget) => {
            const {top, left} = $widget[0].getBoundingClientRect();
            // Ensure the Google Calendar widget has moved down
            expect(top).to.be.greaterThan(initialWidgetPosition.top); // Verify it moved downward
            expect(left).to.equal(initialWidgetPosition.left);        // Verify it stayed in the same horizontal position
        });
    });
    it('Drag widget (huge size widget) vertically.', () => {
        // Chage widget size on small
        cy.get(Widgets.jiraWidget).find(Widgets.moreBtnWidget).click()
        cy.contains(Widgets.menuItem, 'Змінити розмір').click()
        cy.get(Widgets.dialogWidgetSize).should('exist')
        cy.get(Widgets.hugeSize).eq(0).click()
        cy.contains('[type="button"]', 'Редагувати').click();

        captureWidgetPosition(Widgets.jiraWidget).then((pos) => {
            initialPosition = pos;
        });
        // Capture initial position of the Team widget
        captureWidgetPosition(Widgets.teamWidget).then((pos) => {
            initialWidgetPosition = pos;
        });
        // Move small Jira widget
        cy.dragAndDrop(Widgets.jiraWidget, Widgets.teamWidget);
        cy.contains('Готово').click()

        // Verify new position of Jira widget
        cy.get(Widgets.jiraWidget).then(($widget) => {
            const {top, left} = $widget[0].getBoundingClientRect();
            // Optionally, verify specific movement direction or amount if needed
            expect(top).to.be.equal(initialPosition.top);  // Check if moved downward
            expect(left).to.be.lessThan(initialPosition.left);     // Verify it moved leftward
        });
        // Verify new position of the Team widget
        cy.get(Widgets.teamWidget).then(($widget) => {
            const {top, left} = $widget[0].getBoundingClientRect();
            // Ensure the Google Calendar widget has moved down
            expect(top).to.be.greaterThan(initialWidgetPosition.top);
            expect(left).to.equal(initialWidgetPosition.left);
        });
    });


})

