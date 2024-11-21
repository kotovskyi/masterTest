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
    it('Drag widget (small size widget) diagonally and verify widget positions.', () => {
        // Store initial widget positions
        cy.wait(1000)
        getWidgetPositions().then((initialPositions) => {
            const {jira, calendar, camunda, ...otherWidgets} = initialPositions;

            // Change Jira Widget size to small
            cy.get(Widgets.jiraWidget).find(Widgets.moreBtnWidget).click();
            cy.contains(Widgets.menuItem, 'Змінити розмір').click();
            cy.get(Widgets.dialogWidgetSize).should('exist');
            cy.get(Widgets.smallSize).click();
            cy.contains('[type="button"]', 'Редагувати').click();

            // Drag the small Jira widget diagonally to the position of Google Calendar widget
                cy.get(Widgets.jiraWidget)
                    .realMouseDown({ button: 'left', position: 'center' }) // Press down on the element
                    .realMouseMove(0, 100, { position: 'center' })         // Move mouse down slightly to initiate drag
                    .wait(200);                                            // Wait for smooth dragging

                cy.get(Widgets.calendarWidget)
                    .realMouseMove(1, 1, { position: 'center' })
                    // Move mouse to the target element
                    .realMouseUp();                                        // Release mouse

            cy.contains('Готово').click();

            // Capture new widget positions after the drag-and-drop operation
            getWidgetPositions().then((newPositions) => {
                const {jira: newJira, calendar: newCalendar, camunda: newCamunda, ...newOtherWidgets} = newPositions;

                // Assert unchanged positions for widgets other than Jira, Calendar, and Camunda
                assertWidgetPositionEquality(otherWidgets, newOtherWidgets, Object.keys(otherWidgets));

                // Validate the Jira widget has moved down and left
                expect(newJira.top, 'Jira widget should move downward').to.be.greaterThan(jira.top);
                expect(newJira.left, 'Jira widget should move leftward').to.be.lessThan(jira.left);

                // Validate the Calendar widget has moved down but remained in the same horizontal position
                expect(newCalendar.top, 'Calendar widget should move downward').to.be.greaterThan(calendar.top);
                expect(newCalendar.left, 'Calendar widget should remain in the same horizontal position').to.equal(calendar.left);

                // Validate the Camunda widget has moved appropriately
                expect(newCamunda.top, 'Camunda widget top position should change').to.not.equal(camunda.top);
                expect(newCamunda.left, 'Camunda widget left position should change').to.equal(camunda.left);
            });
        });
    });
    it('Swap positions of Jira and Camunda widgets and verify positions.', () => {

        cy.window().then((win) => {
            win.localStorage.setItem('widgets', Cypress.env("standartWidgetPositions"));
            win.localStorage.setItem('grid-layouts', Cypress.env("gridPositions"));

        });
        cy.reload();
        cy.wait(2000);

        // Store initial widget positions
        getWidgetPositions().then((initialPositions) => {
            const {jira, camunda, ...otherWidgets} = initialPositions;

            // Edit mode for widgets
            cy.contains('[type="button"]', 'Редагувати').click();

            // Drag Jira widget to the position of Camunda widget
            cy.dragAndDrop(Widgets.jiraWidget, Widgets.camundaWidget,30,30);
            cy.contains('Готово').click();

            // Capture new widget positions after the drag-and-drop operation
            getWidgetPositions().then((newPositions) => {
                const {jira: newJira, camunda: newCamunda, ...newOtherWidgets} = newPositions;

                // Assert unchanged positions for widgets other than Jira and Camunda
                assertWidgetPositionEquality(otherWidgets, newOtherWidgets, Object.keys(otherWidgets));

                // Validate the Jira widget has moved to Camunda's original position
                expect(newJira.top, 'Jira widget should move to Camunda position').to.equal(camunda.top);
                expect(newJira.left, 'Jira widget should stay in the same horizontal position as Camunda').to.equal(camunda.left);

                // Validate the Camunda widget has moved to Jira's original position
                expect(newCamunda.top, 'Camunda widget should move to Jira position').to.equal(jira.top);
                expect(newCamunda.left, 'Camunda widget should stay in the same horizontal position as Jira').to.equal(jira.left);
            });
        });
    });
    it('Drag Jira widget (medium size) below Google Calendar widget and swap with Camunda widget, ensuring only Jira and Camunda positions change.', () => {
        // Set initial widget positions from environment variable
        cy.window().then((win) => {
            win.localStorage.setItem('widgets', Cypress.env("standartWidgetPositions"));
            win.localStorage.setItem('grid-layouts', Cypress.env("gridPositions"));

        });
        cy.reload();
        cy.wait(2000);

        // Store initial widget positions
        getWidgetPositions().then((initialPositions) => {
            const {jira, calendar, camunda, ...otherWidgets} = initialPositions;

            // Change Jira widget size to medium
            cy.get(Widgets.jiraWidget).find(Widgets.moreBtnWidget).click();
            cy.contains(Widgets.menuItem, 'Змінити розмір').click();
            cy.get(Widgets.dialogWidgetSize).should('exist');
            cy.get(Widgets.mediumSize).click();

            // Enable edit mode for widgets
            cy.contains('[type="button"]', 'Редагувати').click();

            // Drag Jira widget to a position below the Google Calendar widget
            cy.dragAndDrop(Widgets.jiraWidget, Widgets.calendarWidget,1,1);
            cy.contains('Готово').click();

            // Capture new widget positions after the drag-and-drop operation
            getWidgetPositions().then((newPositions) => {
                const {jira: newJira, calendar: newCalendar, camunda: newCamunda, ...newOtherWidgets} = newPositions;

                // Assert unchanged positions for all widgets except Jira and Camunda
                assertWidgetPositionEquality(otherWidgets, newOtherWidgets, Object.keys(otherWidgets));

                // Validate that Jira widget has moved downward and is below the Google Calendar widget
                expect(newJira.top, 'Jira widget should move downward below the Calendar widget').to.be.eq(calendar.top);
                expect(newJira.left, 'Jira widget should remain in the same horizontal position as Calendar widget').to.equal(calendar.left);

                // Validate that Camunda widget has taken the position of the Jira widget
                expect(newCamunda.top, 'Camunda widget should take the position of Jira widget').to.equal(jira.top);
                expect(newCamunda.left, 'Camunda widget should remain in the same horizontal position as Jira widget').to.equal(jira.left);

                // Ensure that the Calendar widget's position remains unchanged
                expect(newCalendar.top, 'Calendar widget position should remain unchanged').to.greaterThan(calendar.top);
                expect(newCalendar.left, 'Calendar widget left position should remain unchanged').to.equal(calendar.left);
            });
        });
    });
    it('Drag huge size Jira widget horizontally and ensure Camunda, Jira, and Looker change positions as expected.', () => {
        // Set initial widget positions from environment variable
        cy.window().then((win) => {
            win.localStorage.setItem('widgets', Cypress.env("standartWidgetPositions"));
            win.localStorage.setItem('grid-layouts', Cypress.env("gridPositions"));
        });
        cy.reload();
        cy.wait(2000);

        // Store initial widget positions
        getWidgetPositions().then((initialPositions) => {
            const {jira, team, camunda, looker, ...otherWidgets} = initialPositions;

            // Capture initial positions of Jira, Camunda, Team, and Looker widgets
            const initialJiraPosition = jira;
            const initialCamundaPosition = camunda;
            const initialTeamPosition = team;
            const initialLookerPosition = looker;

            // Change Jira widget size to huge
            cy.get(Widgets.jiraWidget).find(Widgets.moreBtnWidget).click();
            cy.contains(Widgets.menuItem, 'Змінити розмір').click();
            cy.get(Widgets.dialogWidgetSize).should('exist');
            cy.get(Widgets.hugeSize).click();

            // Enable edit mode for widgets
            cy.contains('[type="button"]', 'Редагувати').click();

            // Move huge Jira widget horizontally to the position of Camunda widget
            cy.dragAndDrop(Widgets.jiraWidget, Widgets.teamWidget, 50, 1);
            cy.contains('Готово').click();

            // Capture new widget positions after the drag-and-drop operation
            getWidgetPositions().then((newPositions) => {
                const {jira: newJira, camunda: newCamunda, team: newTeam, looker: newLooker, ...newOtherWidgets} = newPositions;

                // Assert unchanged positions for all widgets except Jira, Camunda, and Looker
                assertWidgetPositionEquality(otherWidgets, newOtherWidgets, Object.keys(otherWidgets));

                // Validate that the Camunda widget moved to Jira widget's position
                expect(newCamunda.top, 'Camunda widget should move to Jira\'s position').to.equal(initialJiraPosition.top);
                expect(newCamunda.left, 'Camunda widget should move horizontally to Jira\'s position').to.equal(initialJiraPosition.left);

                // Validate that the Jira widget moved to Team widget's position
                expect(newJira.top, 'Jira widget should move to Team\'s position').to.equal(initialTeamPosition.top);
                expect(newJira.left, 'Jira widget should move horizontally to Team\'s position').to.equal(initialTeamPosition.left);

                // Ensure the Team widget's position is changed vertically
                expect(newTeam.top, 'Team widget position should remain unchanged').to.greaterThan(initialTeamPosition.top);
                expect(newTeam.left, 'Team widget left position should remain unchanged').to.equal(initialTeamPosition.left);

                // Ensure Looker widget moved to vertically
                expect(newLooker.top, 'Looker widget should move to a new position').to.greaterThan(initialLookerPosition.top);
                expect(newLooker.left, 'Looker widget should move to a new position').to.equal(initialLookerPosition.left);
            });
        });
    });
    it('Check that widget pin cause move widget up', () => {
        // Set the initial widget positions from environment variable
        cy.window().then((win) => {
            win.localStorage.setItem('widgets', Cypress.env("standartWidgetPositions"));
            win.localStorage.setItem('grid-layouts', Cypress.env("gridPositions"));

        });
        cy.reload();
        cy.wait(2000);
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
            win.localStorage.setItem('grid-layouts', Cypress.env("gridPositions"));

        });
        cy.reload();
        cy.wait(2000);

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
            win.localStorage.setItem('grid-layouts', Cypress.env("gridPositions"));

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




})

