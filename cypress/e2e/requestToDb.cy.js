import requestToDb from "../support/DbRequests/hasura_requests";
import {googleLogin} from '../support/login';

describe('Database Query Tests', () => {
    before(() => {
        googleLogin()
    })
    it.skip('Search an employee by employee table.', () => {
        let searchItem = '%andrushko%'
        const searchItemEmail = "dmytro.andrushko@festcloud.ai"

        cy.fixture('querries.json').then((data) => {
            const {uniqUserByName} = data;
            const token = Cypress.env('bearerToken');
            requestToDb.graphql(Cypress.env('linkHasuraDev'), 'uniq_user_by_name', uniqUserByName, searchItem, token).then((response) => {
                cy.log(JSON.stringify(response.body));
                const email = response.body.data.assignment_unique_assignment[0].WorkEmail;
                expect(searchItemEmail).to.eq(email)

            })
        });
    })
    it('Profile page - shows email and phone from the employee table.', () => {
        const profileEmail = "maksym.kotovskyi@festcloud.ai"
        const profilePhone = "444444444444"
        const token = Cypress.env('bearerToken');

        requestToDb.profileData(Cypress.env('linkHasuraDev'), profileEmail, token).then((response) => {
            cy.log(JSON.stringify(response.body));
            const email = response.body.data.assignment_actual_employee_assignment[0].employee.WorkEmail;
            const phone = response.body.data.assignment_actual_employee_assignment[0].employee.WorkMobilePhone;

            expect(profileEmail).to.eq(email)
            expect(profilePhone).to.eq(phone)

        })

    })
    it('Mesh widgets - shows email and phone from the employee table.', () => {
        const profileEmail = "maksym.kotovskyi@festcloud.ai"
        const profilePhone = "444444444444"
        const token = Cypress.env('bearerToken');

        requestToDb.profileData(Cypress.env('linkHasuraDev'), profileEmail, token).then((response) => {
            cy.log(JSON.stringify(response.body));
            const email = response.body.data.assignment_actual_employee_assignment[0].employee.WorkEmail;
            const phone = response.body.data.assignment_actual_employee_assignment[0].employee.WorkMobilePhone;

            expect(profileEmail).to.eq(email)
            expect(profilePhone).to.eq(phone)

        });
    })

})
