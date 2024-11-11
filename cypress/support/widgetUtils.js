
// Function to capture the initial position of a widget
export const captureWidgetPosition = (widgetLocator) => {
    return cy.get(widgetLocator).then(($widget) => {
        const { top, left } = $widget[0].getBoundingClientRect();
        return { top, left };
    });
};
