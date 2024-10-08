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

    static insertPerson(url, bearerToken, festCloudId,familyName,name,gender,dayofbirth,middlename,mobilePhone){
        return cy.request({
            method: 'POST',
            url: url,
            body: {
                query: `mutation MyMutation4 {
  insert_people_person(objects: {festcloudid: "${festCloudId}", familyname: "${familyName}", name: "${name}", gender: "${gender}", dayofbirth: "${dayofbirth}", middlename: "${middlename}", mobilephone: "${mobilePhone}"}) {
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
    static insertEmployee(url, bearerToken,workEmail,festCloudId ){
        return cy.request({
            method: 'POST',
            url: url,
            body: {
                query: `mutation MyMutation4 {
 
  insert_people_employee(objects: {workemail: "${workEmail}", festcloudid: "${festCloudId}"}) {
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
}

export default requestToDb;
