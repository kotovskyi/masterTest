declare namespace Cypress {
    interface Chainable<Subject> {
        dragAndDrop()
        should()
        customCommand(): Chainable<Subject>
    }
}
