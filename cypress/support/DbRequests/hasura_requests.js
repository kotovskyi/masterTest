class requestToDb {
    static graphql(url, operationName, query, searchItem, bearerToken) {
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
}

export default requestToDb;
