describe('Google Authentication', () => {
    it('should authenticate via Google and set Bearer token', () => {
        cy.googleAuth().then(() => {
            cy.get('@googleAccessToken').then((accessToken) => {
                cy.get('@bearerToken').then((bearerToken) => {
                    cy.get('@newRefreshToken').then((newRefreshToken) => {
                        cy.get('@scope').then((scope) => {

                            // Mocked data to be set in localStorage
                            const authAccessToken = bearerToken

                            const authRefreshToken = newRefreshToken

                            const ssoAccess = {
                                access_token: accessToken,
                                expires_in: 3599,
                                refresh_token: Cypress.env("googleRefreshToken"),
                                scope: scope,
                                token_type: "Bearer",
                                id_token: bearerToken
                            };
                            const sso_refresh_token = Cypress.env("googleRefreshToken")
                            const ssoUser = {
                                id: "103220392861419762719",
                                email: "maksym.kotovskyi@festcloud.ai",
                                verified_email: true,
                                name: "Maksym Kotovskyi",
                                given_name: "Maksym",
                                family_name: "Kotovskyi",
                                picture: "https://lh3.googleusercontent.com/a/ACg8ocKXmEluwzCZoqs-z9fL0B5ESLPKuAxI9dRXWdBgZGajZd-r8Ro=s96-c",
                                hd: "festcloud.ai"
                            };

                            cy.visit('/', {
                                onBeforeLoad(win) {
                                    // Store the whole object in localStorage as a JSON string
                                    win.localStorage.setItem('auth_access_token', authAccessToken);
                                    win.localStorage.setItem('auth_refresh_token', authRefreshToken);
                                    win.localStorage.setItem('sso_access', JSON.stringify(ssoAccess));
                                    win.localStorage.setItem('sso_refresh_token', sso_refresh_token);
                                    win.localStorage.setItem('sso_user', JSON.stringify(ssoUser));
                                    win.localStorage.setItem('ag_script_item', "");
                                }
                            });
                        })
                    })
                })
            })
        });
    });
});
