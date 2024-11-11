// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const axios = require('axios');

Cypress.Commands.add('dragAndDrop', (dragLocator, dropLocator) => {
    cy.get(dragLocator)
        .realMouseDown({ button: 'left', position: 'center' }) // Press down on the element
        .realMouseMove(0, 100, { position: 'center' })         // Move mouse down slightly to initiate drag
        .wait(200);                                            // Wait for smooth dragging

    cy.get(dropLocator)
        .realMouseMove(1, 1, { position: 'center' })           // Move mouse to the target element
        .realMouseUp();                                        // Release mouse
});

Cypress.Commands.add('googleAuth', () => {
    cy.log('Authenticating with Google...');

    // First request to Google OAuth to get access_token and id_token
    cy.request({
        method: 'POST',
        url: 'https://oauth2.googleapis.com/token',
        body: {
            client_id: Cypress.env('googleClientId'),
            client_secret: Cypress.env('googleClientSecret'),
            refresh_token: Cypress.env('googleRefreshToken'),
            grant_type: 'refresh_token'
        }
    }).then(({ body }) => {
        const { access_token, id_token,scope } = body; // Extract both tokens
        cy.log(body)
        cy.wrap(access_token).as('googleAccessToken'); // Store access_token as an alias
        cy.wrap(id_token).as('googleIdToken');         // Store id_token as an alias
        cy.wrap(scope).as('scope');
        // Second request to get the refreshToken
        cy.request({
            method: 'POST',
            url: 'https://jwt-issuer-dev.api.festcloud.ai/hasura/token',
            headers: {
               Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json',
                Origin: Cypress.env('linkDev'),
                Referer: Cypress.env('linkDev'),
            },
            body: {
                id_token: id_token
            }
        }).then(({ body }) => {
            const { refreshToken, token } = body; // Extract both tokens
            cy.log(JSON.stringify(body))
            cy.wrap(refreshToken).as('newRefreshToken'); // Store refreshToken as an alias
            cy.wrap(token).as('bearerToken'); // Store refreshToken as an alias

        });
    });
});

