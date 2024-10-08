import requestToDb from "../support/DbRequests/hasura_requests";
import {googleLogin} from '../support/login';
import { users } from '../fixtures/usersData';

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


// Example usage in Cypress test
    it.only('should insert a new person record into the database', () => {
        function generateUUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        function generateRandomDate() {
            const day = Math.floor(Math.random() * 31) + 1; // Випадковий день від 1 до 31
            const month = Math.floor(Math.random() * 12) + 1; // Випадковий місяць від 1 до 12

            // Додаємо нулі перед числами, якщо день або місяць складається з одного символу
            const formattedDay = day < 10 ? '0' + day : day;
            const formattedMonth = month < 10 ? '0' + month : month;

            return `${formattedDay}-${formattedMonth}`;
        }

        const url = 'https://hasura-dev.srv.festcloud.ai/v1/graphql';
        const token = Cypress.env('bearerToken');

        // Пройдемо по кожному користувачу в масиві
        users.forEach(user => {
            const festCloudId = generateUUID()
            let dayofbirth = generateRandomDate()
            let employeeFestCloudId = festCloudId
            let workGroupFestCloudId = "4606760a-1880-4f22-8605-12eb1261b50f"
            let positionFestCloudId = "c264d81b-d540-4298-8ae9-15206a898f23"

            requestToDb.insertPerson(url, token, festCloudId, user.familyName, user.name, user.gender, dayofbirth, user.middlename, user.mobilePhone).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body); // Check that one row was inserted
            });
            requestToDb.insertEmployee(url, token, user.workEmail, festCloudId).then((response) => {
                expect(response.status).to.eq(200);
            });
            requestToDb.insertAssignment(url, token, festCloudId, positionFestCloudId, workGroupFestCloudId, employeeFestCloudId).then((response) => {
                expect(response.status).to.eq(200);
            });
        });
    });

})
