
export const googleLogin = () => {
    cy.googleAuth().then(() => {
        cy.get('@googleAccessToken').then((accessToken) => {
            cy.get('@bearerToken').then((bearerToken) => {
                cy.get('@newRefreshToken').then((newRefreshToken) => {
                    cy.get('@scope').then((scope) => {
                        const ssoAccess = {
                            access_token: accessToken,
                            expires_in: 3599,
                            refresh_token: Cypress.env("googleRefreshToken"),
                            scope: scope,
                            token_type: "Bearer",
                            id_token: bearerToken
                        };

                        const ssoUser = {
                            id: Cypress.env('userId'),
                            email: Cypress.env('userEmail'),
                            verified_email: true,
                            name: Cypress.env('userName'),
                            given_name: Cypress.env('givenName'),
                            family_name: Cypress.env('familyName'),
                            picture: "https://lh3.googleusercontent.com/a/ACg8ocKXmEluwzCZoqs-z9fL0B5ESLPKuAxI9dRXWdBgZGajZd-r8Ro=s96-c",
                            hd: "festcloud.ai"
                        };
                        cy.window().then((win) => {
                            win.localStorage.setItem('auth_access_token', bearerToken);
                            win.localStorage.setItem('auth_refresh_token', newRefreshToken);
                            win.localStorage.setItem('sso_access', JSON.stringify(ssoAccess));
                            win.localStorage.setItem('sso_refresh_token', Cypress.env("googleRefreshToken"));
                            win.localStorage.setItem('sso_user', JSON.stringify(ssoUser));
                            win.localStorage.setItem('ag_script_item', "");
                        });
                        // Store the Bearer token in Cypress environment for use in other tests
                        Cypress.env('bearerToken', bearerToken);
                    });
                });
            });
        });
    });
};
