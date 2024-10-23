import requestToDb from "../support/DbRequests/hasura_requests";
import {googleLogin} from '../support/login';
import {users,  usersDel} from '../fixtures/usersData';
const uuid = () => Cypress._.random(0, 1e6)
const id = uuid()
const testname = `testname${id}`
const positionNames = {
    "ba": "8a343464-ac50-44c7-b672-ce4740648884",
    "cok": "c264d81b-d540-4298-8ae9-15206a898f23",
    "QA": "01690fbc-8d16-4b8a-8396-2ad70e763389",
    "programmer": "1cef65fa-d1c4-46bc-b444-445c33d3f111"
}
const workGroupFestCloud = {
    "qa": "4cef65fa-d1c2-46bc-b444-445c33d3feb4",
    "ux/ua": "0a76157f-791e-4a46-92ca-144011efcf7f",
    "ba": "b176157f-791e-4a46-92ca-144011efc222",
    "frontend": "7cef65fa-d1c4-46bc-b444-445c33d3feb5"
}

describe('Database Query Tests', () => {
    before(() => {
        googleLogin()
    })

    const url = Cypress.env('linkHasuraDev');
    const token = Cypress.env('bearerToken');

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
    it.skip('Insert users in devDB', () => {
        // Пройдемо по кожному користувачу в масиві
        users.forEach(user => {
            const festCloudId = generateUUID()
            let dayofbirth = generateRandomDate()
            let employeeFestCloudId = festCloudId

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
            requestToDb.insertAssignment(url, token, festCloudId, positionNames.programmer, workGroupFestCloud.frontend, employeeFestCloudId).then((response) => {
                expect(response.status).to.eq(200);
                // Verify the structure of the response
                expect(response.body).to.have.property('data');
                expect(response.body.data).to.have.property('insert_people_assignment');
                expect(response.body.data.insert_people_assignment).to.have.property('affected_rows', 1);
            });
        });
    });
    it.skip('Delete users by email fromm devDB', () => {
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
    it.skip('Add workgroup', () => {
        const festCloudId = generateUUID()
        cy.log(`festCloudId=${festCloudId}`)
        const parentGroup = "fb2592bd-1936-4e50-af81-13d6401f9be5"
        const groupName = "BusinessLevel"
        requestToDb.addWorkgroup(url, token, festCloudId,parentGroup,groupName)
            .then((response) => {
                // Verify the status code if needed
                expect(response.status).to.eq(200);
                // Verify the structure of the response
                expect(response.body).to.have.property('data');
                expect(response.body.data).to.have.property('insert_people_workgroup');
                expect(response.body.data.insert_people_workgroup).to.have.property('affected_rows', 1);
            });
        const employeeFestCloudId = "e39c60ac-699c-424c-95d5-804b5ab91e4a"
        let workgroupFestCloudId = festCloudId
        requestToDb.changeUserToOtherWorkgroup(url, token, employeeFestCloudId,workgroupFestCloudId)
            .then((response) => {
                // Verify the status code if needed
                expect(response.status).to.eq(200);
                // Verify the structure of the response
                expect(response.body).to.have.property('data');
                expect(response.body.data).to.have.property('update_people_assignment');
                expect(response.body.data.update_people_assignment).to.have.property('affected_rows', 1);
            });
    })
    it.skip('Update name of workgroup', () => {
        const workgroupFestCloudId = "66c9a63e-2071-4d5d-ae0c-046b16d5022d"
        const newGroupName = "newNanedGroup"
        requestToDb.updateWorkgroupName(url, token, workgroupFestCloudId ,newGroupName)
            .then((response) => {
                // Verify the status code if needed
                expect(response.status).to.eq(200);
                // Verify the structure of the response
                expect(response.body).to.have.property('data');
                expect(response.body.data).to.have.property('update_people_workgroup');
                expect(response.body.data.update_people_workgroup).to.have.property('affected_rows', 1);
            });
    })
    it.skip('Update workgroup level', () => {
        const parentWorkgroupFestCloudId = "0e223de9-705a-4cdc-b639-9d4b3790453c"
        const GroupName = "HighLevel"
        requestToDb.updateWorkgroupLevel(url, token, GroupName, parentWorkgroupFestCloudId)
            .then((response) => {
                // Verify the status code if needed
                expect(response.status).to.eq(200);
                // Verify the structure of the response
                expect(response.body).to.have.property('data');
                expect(response.body.data).to.have.property('update_people_workgroup');
                expect(response.body.data.update_people_workgroup).to.have.property('affected_rows', 1);
            });
    })
    it.skip('Delete workgroup', () => {
        //GROUP MUST BE WITHOUT ANY USERS. DELETE USERS BEFORE!!!
        const GroupName = "newNanedGroup"
        requestToDb.deleteWorkgroup(url, token, GroupName)
            .then((response) => {
                // Verify the status code if needed
                expect(response.status).to.eq(200);
                // Verify the structure of the response
                expect(response.body).to.have.property('data');
                expect(response.body.data).to.have.property('delete_people_workgroup');
                expect(response.body.data.delete_people_workgroup).to.have.property('affected_rows', 1);
            });
    })
    it.skip('Add position Name', () => {
        const festCloudId = generateUUID()
        cy.log(festCloudId)
        const positionName = "Бізнес Аналітик"
        requestToDb.addPositionName(url, token, positionName,festCloudId)
            .then((response) => {
                // Verify the status code if needed
                expect(response.status).to.eq(200);
                // Verify the structure of the response
                expect(response.body).to.have.property('data');
                expect(response.body.data).to.have.property('insert_people_position');
                expect(response.body.data.insert_people_position).to.have.property('affected_rows', 1);
            });
    })
    it.skip('Assign position Name', () => {
        const userForAssignment = "91decea5-5187-44ec-b792-cdd2b37846d6"
        requestToDb.assignPositionName(url, token, userForAssignment,positionNames.ba)
            .then((response) => {
                // Verify the status code if needed
                expect(response.status).to.eq(200);
                // Verify the structure of the response
                expect(response.body).to.have.property('data');
                expect(response.body.data).to.have.property('update_people_assignment');
                expect(response.body.data.update_people_assignment).to.have.property('affected_rows', 1);
            });
    })
    it.skip('Set User to other Workgroup', () => {
        const employeeFestcloudId = "d0455d20-ad95-4d23-9122-80efc0d95ac4"
        requestToDb.setUserToWorkgroup(url, token, employeeFestcloudId,workGroupFestCloud.qa)
            .then((response) => {
                // Verify the status code if needed
                expect(response.status).to.eq(200);
                // Verify the structure of the response
                expect(response.body).to.have.property('data');
                expect(response.body.data).to.have.property('update_people_assignment');
                expect(response.body.data.update_people_assignment).to.have.property('affected_rows', 1);
            });
    })

})
