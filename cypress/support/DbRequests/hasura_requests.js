class requestToDb {
    static uniqUserByName(url, operationName, query, searchItem, bearerToken) {
        return cy.request({
            method: 'POST',
            url: url,
            failOnStatusCode: false,
            body: {
                operationName: operationName,
                variables: {
                    name: searchItem,
                    offset: 0,
                    not: "d0455d20-ad95-4d23-9122-80efc0d95ac4"
                },
                query: query
            },
            headers: {
                'authorization': `Bearer ${bearerToken}`, // додав формат Bearer токена
            }
        });
    }
    static profileData(url, email, bearerToken) {
        return cy.request({
            method: 'POST',
            url: url,
            failOnStatusCode: false,
            body: {
                operationName: "assignment_actual_employee_assignment",
                variables: {
                    email: email
                },
                query: "query assignment_actual_employee_assignment($email: String) {\n  assignment_actual_employee_assignment(\n    where: {employee: {WorkEmail: {_eq: $email}}}\n  ) {\n    PersonFestCloudID\n    PositionFestCloudID\n    StartDate\n    WorkgroupFestCloudID\n    workgroup {\n      FestCloudID\n      WorkgroupFestCloudID\n      Name\n      Status\n      Type\n      parent {\n        FestCloudID\n        WorkgroupFestCloudID\n        Name\n        Status\n        Type\n        parent {\n          FestCloudID\n          WorkgroupFestCloudID\n          Name\n          Status\n          Type\n          parent {\n            FestCloudID\n            WorkgroupFestCloudID\n            Name\n            Status\n            Type\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    person {\n      Birthday\n      CreatedAt\n      Email\n      MobilePhone\n      AuditCreatedAt\n      FamilyName\n      FestCloudID\n      Gender\n      MiddleName\n      Name\n      __typename\n    }\n    position {\n      AuditCreatedAt\n      FestCloudID\n      PositionName\n      __typename\n    }\n    employee {\n      CreatedAt\n      AuditCreatedAt\n      FestCloudID\n      FirstEmploymentDate\n      WorkEmail\n      WorkMobilePhone\n      WorkStationaryPhone\n      __typename\n    }\n    __typename\n  }\n}"


            },
            headers: {
                'authorization': `Bearer ${bearerToken}`, // додав формат Bearer токена
            }
        });
    }

    static insertPerson(url, bearerToken, festCloudId,familyName,name,gender,dayofbirth,birthday,middlename,mobilePhone){
        return cy.request({
            method: 'POST',
            url: url,
            body: {
                query: `mutation MyMutation4 {
                insert_people_principal(objects: {festcloudid: "${festCloudId}"}) {
    affected_rows
  }
  insert_people_person(objects: {festcloudid: "${festCloudId}", familyname: "${familyName}", name: "${name}", gender: "${gender}", dayofbirth: "${dayofbirth}", birthday: "${birthday}", middlename: "${middlename}", mobilephone: "${mobilePhone}"}) {
    affected_rows
  }
}`

            },
            headers: {
                'authorization': `Bearer ${bearerToken}`,
                'x-hasura-admin-secret': 'test-secret'
            }
        });
    }
    static insertEmployee(url, bearerToken,workEmail,festCloudId,workMobilephone ){
        return cy.request({
            method: 'POST',
            url: url,
            body: {
                query: `mutation MyMutation4 {
 
  insert_people_employee(objects: {workemail: "${workEmail}", festcloudid: "${festCloudId}", workmobilephone: "${workMobilephone}"}) {
    affected_rows
  }
}`
            },
            headers: {
                'authorization': `Bearer ${bearerToken}`,
                'x-hasura-admin-secret': 'test-secret'
            }
        });
    }
    static insertAssignment(url, bearerToken,festCloudId,positionFestCloudId,workGroupFestCloudId,employeeFestCloudId ){
        return cy.request({
            method: 'POST',
            url: url,
            body: {
                query: `mutation MyMutation4 {
  insert_people_assignment(objects: {festcloudid: "${festCloudId}", startdate: "2018-12-25T05:30:00", positionfestcloudid: "${positionFestCloudId}", workgroupfestcloudid: "${workGroupFestCloudId}", employeefestcloudid: "${employeeFestCloudId}"}) {
    affected_rows
  }
}`
    },
            headers: {
                'authorization': `Bearer ${bearerToken}`,
                'x-hasura-admin-secret': 'test-secret'
            }
        });
    }
    static getUserByEmail(url, bearerToken,workEmail ){
        return cy.request({
            method: 'POST',
            url: url,
            body: {
                    "query": `query MyQuery {
                        people_employee(where: {workemail: {_eq: "${workEmail}"}}) {
                            festcloudid
                        }
                    }`
            },
            headers: {
                'authorization': `Bearer ${bearerToken}`,
                'x-hasura-admin-secret': 'test-secret'
            }
        });
    }

    static deleteAssignment(url, bearerToken, festCloudId){
        return cy.request({
            method: 'POST',
            url: url,
            body: {
                query: `mutation MyMutation3 {
  delete_people_assignment(where: {employeefestcloudid: {_eq: "${festCloudId}"}}) {
    affected_rows
  }
}`
            },
            headers: {
                'authorization': `Bearer ${bearerToken}`,
                'x-hasura-admin-secret': 'test-secret'
            }
        });
    }
    static deletePerson(url, bearerToken, festCloudId){
        return cy.request({
            method: 'POST',
            url: url,
            body: {
                query: `mutation MyMutation3 {
    delete_people_person(where: {festcloudid: {_eq: "${festCloudId}"}}) {
        affected_rows
    }
}`
            },
            headers: {
                'authorization': `Bearer ${bearerToken}`,
                'x-hasura-admin-secret': 'test-secret'
            }
        });
    }
    static deleteEmployee(url, bearerToken, workEmail){
        return cy.request({
            method: 'POST',
            url: url,
            body: {
                query: `mutation MyMutation3 {
  delete_people_employee(where: {person: {}, workemail: {_eq: "${workEmail}"}}) {
    affected_rows
  }
}`
            },
            headers: {
                'authorization': `Bearer ${bearerToken}`,
                'x-hasura-admin-secret': 'test-secret'
            }
        });
    }
    static addWorkgroup(url, bearerToken, festCloudId,parentGroup,groupName){
        return cy.request({
            method: 'POST',
            url: url,
            body: {
                query: `mutation AddNewWorkgroupInsightOtherGroup {
  insert_people_workgroup(objects: {festcloudid: "${festCloudId}", workgroupfestcloudid: "${parentGroup}", name: "${groupName}", structuretype: "Legacy", type: "Business Unit"}) {
    affected_rows
  }
}`
            },
            headers: {
                'authorization': `Bearer ${bearerToken}`,
                'x-hasura-admin-secret': 'test-secret'
            }
        });
    }
    static changeUserToOtherWorkgroup(url, bearerToken, employeeFestCloudId,workgroupFestCloudId){
        return cy.request({
            method: 'POST',
            url: url,
            body: {
                query: `mutation ChangeUserToOtherWorkgroup {
  update_people_assignment(where: {employeefestcloudid: {_eq: "${employeeFestCloudId}"}}, _set: {workgroupfestcloudid: "${workgroupFestCloudId}"}) {
    affected_rows
  }
}`
            },
            headers: {
                'authorization': `Bearer ${bearerToken}`,
                'x-hasura-admin-secret': 'test-secret'
            }
        });
    }
    static updateWorkgroupName(url, bearerToken, workgroupFestCloudId ,newGroupName){
        return cy.request({
            method: 'POST',
            url: url,
            body: {
                query: `mutation updatePreLeveWorkgroup {
  update_people_workgroup(where: {festcloudid: {_eq: "${workgroupFestCloudId}"}}, _set: {name: "${newGroupName}"}) {
    affected_rows
  }
}`
            },
            headers: {
                'authorization': `Bearer ${bearerToken}`,
                'x-hasura-admin-secret': 'test-secret'
            }
        });
    }
    static updateWorkgroupLevel(url, bearerToken, GroupName, parenWorkgroupFestCloudId){
        return cy.request({
            method: 'POST',
            url: url,
            body: {
                query: `mutation UpdatePeopleWorkgroup {
  update_people_workgroup(where: {name: {_eq: "${GroupName}"}}, _set: {workgroupfestcloudid: "${parenWorkgroupFestCloudId}"}) {
    affected_rows
  }
}`
            },
            headers: {
                'authorization': `Bearer ${bearerToken}`,
                'x-hasura-admin-secret': 'test-secret'
            }
        });
    }
    static deleteWorkgroup(url, bearerToken, GroupName){
        return cy.request({
            method: 'POST',
            url: url,
            body: {
                query: `mutation UpdatePeopleWorkgroup {
  delete_people_workgroup(where: {name: {_eq: "${GroupName}"}}) {
    affected_rows
  }
}`
            },
            headers: {
                'authorization': `Bearer ${bearerToken}`,
                'x-hasura-admin-secret': 'test-secret'
            }
        });
    }
    static addPositionName(url, bearerToken, positionName,festCloudId){
        return cy.request({
            method: 'POST',
            url: url,
            body: {
                query: `mutation addPositionName {
  insert_people_position(objects: {positionname: "${positionName}", festcloudid: "${festCloudId}"}) {
    affected_rows
  }
}`
            },
            headers: {
                'authorization': `Bearer ${bearerToken}`,
                'x-hasura-admin-secret': 'test-secret'
            }
        });
    }
    static assignPositionName(url, bearerToken, employeeFestcloudId,positionFestcloudId){
        return cy.request({
            method: 'POST',
            url: url,
            body: {
                query: `mutation assignPositionName {
  update_people_assignment(where: {employeefestcloudid: {_eq: "${employeeFestcloudId}"}}, _set: {positionfestcloudid: "${positionFestcloudId}"}) {
    affected_rows
  }
}`
            },
            headers: {
                'authorization': `Bearer ${bearerToken}`,
                'x-hasura-admin-secret': 'test-secret'
            }
        });
    }
    static setUserToWorkgroup(url, bearerToken, employeeFestcloudId,workgroupFestcloudId){
        return cy.request({
            method: 'POST',
            url: url,
            body: {
                query: `mutation ChangeUserToOtherWorkgroup {
  update_people_assignment(where: {employeefestcloudid: {_eq: "${employeeFestcloudId}"}}, _set: {workgroupfestcloudid: "${workgroupFestcloudId}"}) {
    affected_rows
  }
}
`
            },
            headers: {
                'authorization': `Bearer ${bearerToken}`,
                'x-hasura-admin-secret': 'test-secret'
            }
        });
    }
}
export default requestToDb;
