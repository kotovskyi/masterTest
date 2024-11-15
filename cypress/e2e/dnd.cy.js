import {googleLogin} from "../support/login";
import {Pagination} from "../support/Selectors/pagination";
import {GlobalSearch, TeamPage, Widgets} from "../support/Selectors/commonElements";
import {captureWidgetPosition, getWidgetPositions, assertWidgetPositionEquality} from "../support/widgetUtils";

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
        cy.get(Widgets.smallSize).click()
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
    it('Check that widget pin cause move widget up', () => {
        // Set the initial widget positions from environment variable
        cy.window().then((win) => {
            win.localStorage.setItem('widgets', Cypress.env("standartWidgetPositions"));
        });
        cy.reload()
        cy.wait(2000)
        // Store initial widget positions
        getWidgetPositions().then((initialPositions) => {
            const {jira, calendar, position, chat, camunda, looker, profile, team} = initialPositions;
            cy.log(initialPositions)

            // Click on the 'more' button and 'pin' option for chat widget
            cy.get(Widgets.chatWidget).find(Widgets.moreBtnWidget).click();
            cy.contains(Widgets.menuItem, 'Закріпити').click();

            // Check if the color of the pin button changes
            cy.get(Widgets.chatWidget).find(Widgets.pin).should('have.css', 'color', 'rgb(213, 57, 57)');

            // After pinning, get the new positions of the widgets
            getWidgetPositions().then((newPositions) => {
                const {jira, calendar, position, chat, camunda, looker, profile, team} = newPositions;
                cy.log(newPositions)

                // Compare the widget positions
                // All widgets should have the same positions except for the chat and position widgets
                assertWidgetPositionEquality(initialPositions, newPositions, [
                    'jira', 'calendar', 'camunda', 'looker', 'profile', 'team'
                ]);

                // The position widget and chat widget should have swapped positions
                expect(position.top, 'Position widget position should match the original chat widget position').to.equal(initialPositions.chat.top-200);
                expect(position.left, 'Position widget left position should match the original chat widget position').to.equal(initialPositions.chat.left);
                expect(chat.top, 'Chat widget position should match the original position widget position').to.equal(initialPositions.position.top);
                expect(chat.left, 'Chat widget left position should match the original position widget position').to.equal(initialPositions.position.left);
            });
        });
    });
    it('Check that widget resize do not change other widgets position except widget from below', () => {
        // Set the initial widget positions from environment variable
        cy.window().then((win) => {
            win.localStorage.setItem('widgets', Cypress.env("standartWidgetPositions"));
        });
        cy.reload();
        cy.wait(1000)

        // Store initial widget positions
        getWidgetPositions().then((initialPositions) => {
            const {jira, calendar, position, chat, camunda, looker, profile, team} = initialPositions;

            // Change Position Widget size to small
            cy.get(Widgets.positionWidget).find(Widgets.moreBtnWidget).click();
            cy.contains(Widgets.menuItem, 'Змінити розмір').click();
            cy.get(Widgets.dialogWidgetSize).should('exist');
            cy.get(Widgets.smallSize).click();

            // After resizing, get the new positions of the widgets
            getWidgetPositions().then((newPositions) => {
                const {jira, calendar, position, chat, camunda, looker, profile, team} = newPositions;

                // Compare the widget positions
                // All widgets should have the same positions except for the position and chat widgets
                assertWidgetPositionEquality(initialPositions, newPositions, [
                    'jira', 'calendar', 'camunda', 'looker', 'profile', 'team'
                ]);

                // Position widget should remain in the same position (no movement)
                expect(position.top, 'Position widget top position should remain the same').to.equal(initialPositions.position.top);
                expect(position.left, 'Position widget left position should stay the same').to.equal(initialPositions.position.left);

                // Chat widget should move up and align below the resized position widget
                expect(chat.top, 'Chat widget top should be just below position widget').to.equal(initialPositions.position.top+200 ); // Adjust based on widget size/spacing
                expect(chat.left, 'Chat widget left should stay the same').to.equal(initialPositions.position.left);
            });
        });
    });
    it('Check that unpinning upper widgets does not change any widgets positions', () => {
        // Set the initial widget positions from environment variable
        cy.window().then((win) => {
            win.localStorage.setItem('widgets', Cypress.env("standartWidgetPositions"));
        });
        cy.reload();
        cy.wait(2000);

        // Store initial widget positions
        getWidgetPositions().then((initialPositions) => {
            cy.log('Initial Positions:', initialPositions);

            // Pin specific widgets
            const widgetsToPin = ['position', 'profile', 'team', 'jira'];
            widgetsToPin.forEach((widget) => {
                cy.get(Widgets[`${widget}Widget`]).find(Widgets.moreBtnWidget).click();
                cy.contains(Widgets.menuItem, 'Закріпити').click();
            });

            // Verify pin button color changes for pinned widgets
            widgetsToPin.forEach((widget) => {
                cy.get(Widgets[`${widget}Widget`]).find(Widgets.pin).should('have.css', 'color', 'rgb(213, 57, 57)');
            });

            // Unpin the same widgets
            widgetsToPin.forEach((widget) => {
                cy.get(Widgets[`${widget}Widget`]).find(Widgets.pin).click();
            });

            // Verify pin button color resets for unpinned widgets (assuming it changes back)
            widgetsToPin.forEach((widget) => {
                cy.get(Widgets[`${widget}Widget`]).find(Widgets.moreBtnWidget).should('have.css', 'color', 'rgb(88, 92, 96)');
            });

            // After unpinning, get the new positions of all widgets
            getWidgetPositions().then((newPositions) => {
                cy.log('New Positions:', newPositions);

                // Compare positions of all widgets
                Object.keys(initialPositions).forEach((widget) => {
                    expect(newPositions[widget].top, `${widget} widget top position`).to.equal(initialPositions[widget].top);
                    expect(newPositions[widget].left, `${widget} widget left position`).to.equal(initialPositions[widget].left);
                });
            });
        });
    });

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

