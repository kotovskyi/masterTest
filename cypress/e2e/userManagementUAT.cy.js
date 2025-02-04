import requestToUatDb from "../support/DbRequests/uat_requests";
import {googleLogin} from '../support/login';
import {users,  usersDel} from '../fixtures/usersData';
const uuid = () => Cypress._.random(0, 1e6)
const id = uuid()
const testname = `testname${id}`
import {generateRandomDate,generateUUID } from '../support/utils';

const positionNames = {
    "ba": "",
    "cok": "",
    "QA": "",
    "programmer": "f7b04d31-24fe-4666-8e4b-8279e00c2c00",
    "designer": ""
}
const workGroupFestCloud = {

    "meta4":"54df5a6b-62cb-443b-920a-d8c9b212f912"
}

describe('Database Query Tests', () => {
    before(() => {
        //googleLogin()
    })

    const url = "https://hasura-uat.srv.festcloud.ai/v1/graphql";
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJwZW9wbGUtZGV2IiwieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJwZW9wbGUtZGV2Il19fQ.uasv9WhJVZDlbHGFxj8QLSIofalFuqUAnnO96a5baTA';

    it.only('Insert users in devDB', () => {

        // Пройдемо по кожному користувачу в масиві
        users.forEach(user => {
            const festCloudId = generateUUID()
            const randomDate = generateRandomDate();
            let dayofbirth = randomDate.date
            let employeeFestCloudId = festCloudId
            let birthday = randomDate.birthday
            requestToUatDb.insertPerson(url, token, festCloudId, user.familyName, user.name, user.gender, birthday, user.middlename, user.mobilePhone, user.workEmail).then((response) => {
                // Verify the status code if needed
                expect(response.status).to.eq(200);
                // Verify the structure of the response
                expect(response.body).to.have.property('data');
                expect(response.body.data).to.have.property('insert_people_person');
                expect(response.body.data.insert_people_person).to.have.property('affected_rows', 1);

            });
            requestToUatDb.insertEmployee(url, token, user.workEmail, festCloudId, user.workMobilephone).then((response) => {
                expect(response.status).to.eq(200);
                // Verify the structure of the response
                expect(response.body).to.have.property('data');
                expect(response.body.data).to.have.property('insert_people_employee');
                expect(response.body.data.insert_people_employee).to.have.property('affected_rows', 1);

            });
            requestToUatDb.insertAssignment(url, token, festCloudId, positionNames.programmer, workGroupFestCloud.meta4, employeeFestCloudId).then((response) => {
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
        const parentGroup = ""
        const groupName = "meta4"
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
        const workgroupFestCloudId = "0cef00fa-d1c3-00bc-b444-445c33d3feb1"
        const newGroupName = "Test"
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
        const positionName = "programmer"
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
        const employeeFestcloudId = "a4f02698-79d7-452e-a74d-2b7101b07f96"
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
    it.skip('Create 10 tasks for user', () => {
        // Функції для генерації випадкових значень
        function generateRandomTenDigitNumber() {
            return Math.floor(Math.random() * 9000000000) + 1000000000;
        }

        const priority = ['Low', 'Medium', 'High'];
        function getRandomPriority() {
            const randomIndex = Math.floor(Math.random() * priority.length);
            return priority[randomIndex];
        }

        const status = ['To Do', 'In Progress'];
        function getRandomStatus() {
            const randomIndex = Math.floor(Math.random() * status.length);
            return status[randomIndex];
        }
        const aplicationType = ['JIRA', 'CAMUNDA'];

        // Функція для отримання випадкового елемента з масиву
        function getRandomApplicationType() {
            const randomIndex = Math.floor(Math.random() * aplicationType.length);
            return aplicationType[randomIndex];
        }

        // Функція для додавання одного дня до дати
        function addOneDay(date) {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() + 1); // Додаємо один день
            return newDate.toISOString().slice(0, 19) + "Z"; // Повертаємо дату у форматі ISO без мілісекунд
        }

        // Початкова дата
        let currentDate = new Date(); // Поточна дата

        // Генерація 10 тасок
        for (let i = 0; i < 20; i++) {
            const festCloudId = generateUUID(); // Генерація UUID для кожного таска
            const title = `Title${i}`; // Унікальний заголовок для кожної задачі
            const taskid = generateRandomTenDigitNumber(); // Генерація випадкового 10-значного ID
            const priorityValue = getRandomPriority(); // Рандомний пріоритет
            const statusValue = getRandomStatus(); // Рандомний статус
            const aplicationTypeValue = getRandomApplicationType(); // Рандомний тип аплікації

            // Генерація нової дати, додаючи один день до поточної
            const createDate = addOneDay(currentDate);

            // Виконання запиту для кожної задачі
            requestToDb.insertPeopleTask(url, token, createDate, festCloudId, title, aplicationTypeValue, taskid, priorityValue, statusValue)
                .then((response) => {
                    // Перевірки на правильність відповіді
                    expect(response.status).to.eq(200);
                    expect(response.body).to.have.property('data');
                    expect(response.body.data).to.have.property('insert_people_task');
                    expect(response.body.data.insert_people_task).to.have.property('affected_rows', 1);
                });

            // Оновлюємо поточну дату для наступної ітерації
            currentDate = createDate; // Встановлюємо поточну дату на дату цього таска
        }
    });




})
