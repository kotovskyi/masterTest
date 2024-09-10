
import requestToDb from "../support/DbRequests/hasura_requests";
import { googleLogin } from '../support/login';

describe('Database Query Tests', () => {
    before(() => {
        googleLogin()
    })
        it('should fetch user data from the database', () => {
            let searchItem = '%andrushko%'
            const searchItememail = "dmytro.andrushko@festcloud.ai"

            cy.fixture('querries.json').then((data) => {
                const {uniqUserByName} = data;
                cy.get('@bearerToken').then((token) => {
                    requestToDb.graphql(Cypress.env('linkHasuraDev'), 'uniq_user_by_name', uniqUserByName, searchItem, token).then((response) => {
                        cy.log(JSON.stringify(response.body));
                        const email = response.body.data.assignment_unique_assignment[0].WorkEmail;
                        expect(searchItememail).to.eq(email)

                    });
                })
            });
        })
})
