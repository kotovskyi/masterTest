import requestToDb from "../support/DbRequests/hasura_requests";
import {googleLogin} from '../support/login';
import {users,  usersDel} from '../fixtures/usersData';

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


    it('Insert users on devDB', () => {
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

        const url = Cypress.env('linkHasuraDev');
        const token = Cypress.env('bearerToken');

        // Пройдемо по кожному користувачу в масиві
        users.forEach(user => {
            const festCloudId = generateUUID()
            let dayofbirth = generateRandomDate()
            let employeeFestCloudId = festCloudId
            let workGroupFestCloudId = "4606760a-1880-4f22-8605-12eb1261b50f"
            let positionFestCloudId = "c264d81b-d540-4298-8ae9-15206a898f23"
            let positionFestCloudIdQA="01690fbc-8d16-4b8a-8396-2ad70e763389"
            requestToDb.insertPerson(url, token, festCloudId, user.familyName, user.name, user.gender, dayofbirth, user.middlename, user.mobilePhone).then((response) => {
                    // Verify the status code if needed
                    expect(response.status).to.eq(200);
                    // Verify the structure of the response
                    expect(response.body).to.have.property('data');
                    expect(response.body.data).to.have.property('insert_people_person');
                    expect(response.body.data.insert_people_person).to.have.property('affected_rows', 1);

            });
            requestToDb.insertEmployee(url, token, user.workEmail, festCloudId, user.workMobilephone).then((response) => {
                expect(response.status).to.eq(200);
                // Verify the structure of the response
                expect(response.body).to.have.property('data');
                expect(response.body.data).to.have.property('insert_people_employee');
                expect(response.body.data.insert_people_employee).to.have.property('affected_rows', 1);

            });
            requestToDb.insertAssignment(url, token, festCloudId, positionFestCloudId, workGroupFestCloudId, employeeFestCloudId).then((response) => {
                expect(response.status).to.eq(200);
                // Verify the structure of the response
                expect(response.body).to.have.property('data');
                expect(response.body.data).to.have.property('insert_people_assignment');
                expect(response.body.data.insert_people_assignment).to.have.property('affected_rows', 1);
            });
        });
    });
    it('Delete users by email fromm devDB', () => {
        const token = Cypress.env('bearerToken');
        let FESTCloudId
        // Пройдемо по кожному користувачу в масиві
        usersDel.forEach(user => {

            requestToDb.getUserByEmail(Cypress.env('linkHasuraDev'), token, user.workEmail).then((response) => {
                cy.log(usersDel.workEmail)

                cy.log(JSON.stringify(response.body.data.people_employee[0].festcloudid))
                FESTCloudId = response.body.data.people_employee[0].festcloudid;

                // Log the festcloudid to the console

                // Now you can use festcloudId as a parameter in other requests or functions
            }).then(()=>{
                cy.log(`Festcloud ID: ${FESTCloudId}`);

                requestToDb.deleteAssignment(Cypress.env('linkHasuraDev'), token, FESTCloudId).then((response) => {
                    // Verify the status code if needed
                    expect(response.status).to.eq(200);
                    // Verify the structure of the response
                    expect(response.body).to.have.property('data');
                    expect(response.body.data).to.have.property('delete_people_assignment');
                    expect(response.body.data.delete_people_assignment).to.have.property('affected_rows', 1);

                 });
                requestToDb.deletePerson(Cypress.env('linkHasuraDev'), token, FESTCloudId).then((response) => {
                    // Verify the status code if needed
                    expect(response.status).to.eq(200);
                    // Verify the structure of the response
                    expect(response.body).to.have.property('data');
                    expect(response.body.data).to.have.property('delete_people_person');
                    expect(response.body.data.delete_people_person).to.have.property('affected_rows', 1);

                });

            })

        });
    })


})
