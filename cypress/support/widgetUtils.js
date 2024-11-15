
// Function to capture the initial position of a widget
import {Widgets} from "./Selectors/commonElements";

export const captureWidgetPosition = (widgetLocator) => {
    return cy.get(widgetLocator).then(($widget) => {
        const { top, left } = $widget[0].getBoundingClientRect();
        return { top, left };
    });
};

export const getWidgetPositions = () => {
    return cy.get('[data-cy="global-search"]').then(($parent) => {
        const positions = {};

        // Для кожного віджету використовуємо getBoundingClientRect() для точних позицій
        cy.get(Widgets.jiraWidget).then(($jira) => {
            const { top, left } = $jira[0].getBoundingClientRect();
            positions.jira = { top, left };
            return cy.get(Widgets.calendarWidget).then(($calendar) => {
                const { top, left } = $calendar[0].getBoundingClientRect();
                positions.calendar = { top, left };
                return cy.get(Widgets.positionWidget).then(($position) => {
                    const { top, left } = $position[0].getBoundingClientRect();
                    positions.position = { top, left };
                    return cy.get(Widgets.chatWidget).then(($chat) => {
                        const { top, left } = $chat[0].getBoundingClientRect();
                        positions.chat = { top, left };
                        return cy.get(Widgets.camundaWidget).then(($camunda) => {
                            const { top, left } = $camunda[0].getBoundingClientRect();
                            positions.camunda = { top, left };
                            return cy.get(Widgets.lookerWidget).then(($looker) => {
                                const { top, left } = $looker[0].getBoundingClientRect();
                                positions.looker = { top, left };
                                return cy.get(Widgets.profileWidget).then(($profile) => {
                                    const { top, left } = $profile[0].getBoundingClientRect();
                                    positions.profile = { top, left };
                                    return cy.get(Widgets.teamWidget).then(($team) => {
                                        const { top, left } = $team[0].getBoundingClientRect();
                                        positions.team = { top, left };
                                        return positions;
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
};


export const assertWidgetPositionEquality = (initialPositions, newPositions, widgetsToCheck) => {
    widgetsToCheck.forEach((widget) => {
        expect(newPositions[widget].top, `${widget} widget's top position should not change`).to.equal(initialPositions[widget].top);
        expect(newPositions[widget].left, `${widget} widget's left position should not change`).to.equal(initialPositions[widget].left);
    });
};
