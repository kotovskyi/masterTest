import {googleLogin} from "../support/login";
import {Pagination} from "../support/Selectors/pagination";
import {GlobalSearch, TeamPage} from "../support/Selectors/commonElements";


describe('Pagination tests', () => {
    beforeEach(() => {
        googleLogin()
        cy.window().then((win) => {
            win.localStorage.setItem('onboarding_team_passed', JSON.stringify(true));
            win.localStorage.setItem('onboarding_mesh_passed', JSON.stringify(true));
            win.localStorage.setItem('onboarding_profile_passed', JSON.stringify(true));
        });
    })

    it('Paginator displays correct page numbers on the first screen', () => {
        cy.visit('/people/team');
        cy.get(Pagination.prevPage).should('exist').and('be.visible').find('svg').should('have.css', 'color', 'rgb(159, 162, 168)');
        cy.get(Pagination.nextPage).should('exist').and('be.visible').find('svg').should('have.css', 'color', 'rgb(58, 119, 220)');
        cy.get(Pagination.page1).should('exist').and('be.visible').should('have.text',"1").should('have.css', 'background-color', 'rgb(227, 238, 255)');
        cy.get(Pagination.page2).should('exist').and('be.visible').should('have.text',"2")
        cy.get(Pagination.page3).should('exist').and('be.visible').should('have.text',"3")
        cy.get(Pagination.page4).should('exist').and('be.visible').should('have.text',"4")
        cy.get(Pagination.page5).should('exist').and('be.visible').should('have.text',"5")
        cy.get(Pagination.page6).should('exist').and('be.visible').should('have.text',"6")
        cy.get(Pagination.page7).should('exist').and('be.visible').should('have.text',"7")
        cy.get(Pagination.page8).should('not.exist')
        cy.get(Pagination.pointsBettwenPages).eq(8).should('exist').should('have.text',"…")
        cy.get(Pagination.allPages).find('li').eq(-2)
            .invoke('text') // Отримати текст з елемента
            .then((lastPage) => {
                // Перевірка, що остання сторінка є цифрою і більше ніж 8
                const lastPageNumber = parseInt(lastPage, 10); // Перетворити текст на число
                expect(lastPageNumber).to.be.a('number'); // Перевірка, що це число
                expect(lastPageNumber).to.be.greaterThan(8);
                cy.get(`[data-cy="page-${lastPage}"`).should('exist').and('be.visible').should('have.text',lastPage)

            });
        cy.get(Pagination.paginationInputText).should('exist').should('have.text',"Сторінка №" )
        cy.get(Pagination.paginationInput).should('have.value', '')
        cy.get(Pagination.paginationInputButton).and('not.be.disabled').should('have.text', 'Перейти')

        //Click page 5
        cy.get(Pagination.page5).should('exist').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)').click()

        cy.get(Pagination.prevPage).should('exist').and('be.visible')
        cy.get(Pagination.nextPage).should('exist').and('be.visible')
        cy.get(Pagination.paginationInput).should('have.value', '')
        cy.get(Pagination.page1).should('exist').and('be.visible').should('have.text',"1").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        cy.get(Pagination.page2).should('exist').and('be.visible').should('have.text',"2")
        cy.get(Pagination.page3).should('exist').and('be.visible').should('have.text',"3")
        cy.get(Pagination.page4).should('exist').and('be.visible').should('have.text',"4")
        cy.get(Pagination.page5).should('exist').should('have.css', 'background-color', 'rgb(227, 238, 255)')
        cy.get(Pagination.page6).should('exist').and('be.visible').should('have.text',"6")
        cy.get(Pagination.page7).should('exist').and('be.visible').should('have.text',"7")
        cy.get(Pagination.page8).should('not.exist')
        cy.get(Pagination.pointsBettwenPages).eq(8).should('exist').should('have.text',"…")
        cy.get(Pagination.allPages).find('li').eq(-2)
            .invoke('text') // Отримати текст з елемента
            .then((lastPage) => {
                cy.get(`[data-cy="page-${lastPage}"`).should('exist').and('be.visible').should('have.text',lastPage)

            });

    })
    it('Paginator correctly updates when selecting page 6', () => {
        cy.visit('/people/team');
        //Click page 6
        cy.get(Pagination.page6).should('exist').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)').click()
        cy.get(Pagination.prevPage).find('svg').should('exist').and('be.visible').should('have.css', 'color', 'rgb(58, 119, 220)');
        cy.get(Pagination.nextPage).find('svg').should('exist').and('be.visible').should('have.css', 'color', 'rgb(58, 119, 220)');
        cy.get(Pagination.paginationInput).should('have.value', '')
        cy.get(Pagination.page1).should('exist').and('be.visible').should('have.text',"1").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        cy.get(Pagination.page2).should('not.exist')
        cy.get(Pagination.pointsBettwenPages).eq(2).should('exist').should('have.text',"…")
        cy.get(Pagination.page4).should('exist').and('be.visible').should('have.text',"4")
        cy.get(Pagination.page5).should('exist').and('be.visible').should('have.text',"5")
        cy.get(Pagination.page6).should('exist').and('be.visible').should('have.text',"6").should('have.css', 'background-color', 'rgb(227, 238, 255)');
        cy.get(Pagination.page7).should('exist').and('be.visible').should('have.text',"7")
        cy.get(Pagination.page8).should('exist').and('be.visible').should('have.text',"8")
        cy.get(Pagination.pointsBettwenPages).eq(8).should('exist').should('have.text',"…")
        cy.get(Pagination.page9).should('not.exist')
        cy.get(Pagination.allPages).find('li').eq(-2)
            .invoke('text') // Отримати текст з елемента
            .then((lastPage) => {
                // Перевірка, що остання сторінка є цифрою і більше ніж 8
                const lastPageNumber = parseInt(lastPage, 10); // Перетворити текст на число
                expect(lastPageNumber).to.be.a('number'); // Перевірка, що це число
                expect(lastPageNumber).to.be.greaterThan(8);
                cy.get(`[data-cy="page-${lastPage}"`).should('exist').and('be.visible').should('have.text',lastPage)
            });
    })
    it('Paginator correctly updates when selecting last page', () => {
        cy.visit('/people/team');
        //Click last page
        cy.get(Pagination.allPages).find('li').eq(-2)
            .invoke('text') // Отримати текст з елемента
            .then((lastPage) => {
                // Перевірка, що остання сторінка є цифрою і більше ніж 8
                const lastPageNumber = parseInt(lastPage, 10); // Перетворити текст на число
                expect(lastPageNumber).to.be.a('number'); // Перевірка, що це число
                expect(lastPageNumber).to.be.greaterThan(8);
                cy.get(`[data-cy="page-${lastPage}"`).should('exist').click()
                cy.get(`[data-cy="page-${lastPage}"`).should('have.css', 'background-color', 'rgb(227, 238, 255)');
                //navigation arrow should be gray (inactive)
                cy.get(Pagination.nextPage).find('svg').should('have.css', 'color', 'rgb(159, 162, 168)');
                cy.get(Pagination.prevPage).find('svg').should('have.css', 'color', 'rgb(58, 119, 220)');

                cy.get(Pagination.prevPage).should('exist').and('be.visible')
                cy.get(Pagination.nextPage).should('exist').and('be.visible')
                cy.get(Pagination.paginationInput).should('have.value', '')
                cy.get(Pagination.page1).should('exist').and('be.visible').should('have.text', "1").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.page2).should('not.exist')
                cy.get(Pagination.pointsBettwenPages).eq(2).should('exist').should('have.text', "…")
                // Перевірка на наявність попередніх сторінок перед останньою
                for (let i = 1; i <= 6; i++) {
                    cy.get(`[data-cy="page-${lastPageNumber - i}"]`)
                        .and('be.visible')
                        .should('have.text', `${lastPageNumber - i}`);
                }
            });
    })
    it('Input accepts valid numbers and click Enter', () => {
        cy.visit('/people/team');
        //Save data from 1st page (name/email)
        cy.get(TeamPage.employeeName).then(($firstPageNames) => {
            const firstPageNames = $firstPageNames.map((index, el) => Cypress.$(el).text()).get();

            cy.get(TeamPage.employeeEmail).then(($firstPageEmails) => {
                const firstPageEmails = $firstPageEmails.map((index, el) => Cypress.$(el).text()).get();
                cy.log(JSON.stringify(firstPageNames))
                //Go to page 8
                cy.get(Pagination.paginationInput).should('have.value', '').type('8').type('{enter}');
                cy.get(Pagination.prevPage).should('exist').and('be.visible')
                cy.get(Pagination.nextPage).should('exist').and('be.visible')
                cy.get(Pagination.page1).should('exist').and('be.visible').should('have.text', "1").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.page2).should('not.exist')
                cy.get(Pagination.pointsBettwenPages).eq(2).should('exist').should('have.text', "…").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.page6).should('exist').and('be.visible').should('have.text', "6").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.page7).should('exist').and('be.visible').should('have.text', "7").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.page8).should('exist').and('be.visible').should('have.text', "8").should('have.css', 'background-color', 'rgb(227, 238, 255)');
                cy.get(Pagination.page9).should('exist').and('be.visible').should('have.text', "9").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.page10).should('exist').and('be.visible').should('have.text', "10").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.pointsBettwenPages).eq(8).should('exist').should('have.text', "…").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.page11).should('not.exist')
                cy.get(Pagination.allPages).find('li').eq(-2)
                    .invoke('text') // Отримати текст з елемента
                    .then((lastPage) => {
                        // Перевірка, що остання сторінка є цифрою і більше ніж 8
                        const lastPageNumber = parseInt(lastPage, 10); // Перетворити текст на число
                        expect(lastPageNumber).to.be.a('number'); // Перевірка, що це число
                        expect(lastPageNumber).to.be.greaterThan(8);
                        cy.get(`[data-cy="page-${lastPage}"`).should('exist').and('be.visible').should('have.text', lastPage).should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                    });
                cy.get(Pagination.paginationInput).should('have.value', '')

                //Save data from pg 8
                cy.get(TeamPage.employeeName).then(($secondPageNames) => {
                    const secondPageNames = $secondPageNames.map((index, el) => Cypress.$(el).text()).get();

                    cy.get(TeamPage.employeeEmail).then(($secondPageEmails) => {
                        const secondPageEmails = $secondPageEmails.map((index, el) => Cypress.$(el).text()).get();

                        // Compare saved data
                        expect(firstPageNames).to.not.deep.equal(secondPageNames);
                        expect(firstPageEmails).to.not.deep.equal(secondPageEmails);
                    });

                })
            })
        })
    })
    it('Input accepts valid numbers and click "Go" btn', () => {
        cy.visit('/people/team');
        //Save data from 1st page (name/email)
        cy.get(TeamPage.employeeName).then(($firstPageNames) => {
            const firstPageNames = $firstPageNames.map((index, el) => Cypress.$(el).text()).get();

            cy.get(TeamPage.employeeEmail).then(($firstPageEmails) => {
                const firstPageEmails = $firstPageEmails.map((index, el) => Cypress.$(el).text()).get();
                cy.log(JSON.stringify(firstPageNames))
                //Go to page 8
                cy.get(Pagination.paginationInput).should('have.value', '').type('8')
                cy.get(Pagination.paginationInputButton).click()

                cy.get(Pagination.prevPage).should('exist').and('be.visible')
                cy.get(Pagination.nextPage).should('exist').and('be.visible')
                cy.get(Pagination.page1).should('exist').and('be.visible').should('have.text', "1").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.page2).should('not.exist')
                cy.get(Pagination.pointsBettwenPages).eq(2).should('exist').should('have.text', "…").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.page6).should('exist').and('be.visible').should('have.text', "6").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.page7).should('exist').and('be.visible').should('have.text', "7").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.page8).should('exist').and('be.visible').should('have.text', "8").should('have.css', 'background-color', 'rgb(227, 238, 255)');
                cy.get(Pagination.page9).should('exist').and('be.visible').should('have.text', "9").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.page10).should('exist').and('be.visible').should('have.text', "10").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.pointsBettwenPages).eq(8).should('exist').should('have.text', "…").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.page11).should('not.exist')
                cy.get(Pagination.allPages).find('li').eq(-2)
                    .invoke('text') // Отримати текст з елемента
                    .then((lastPage) => {
                        // Перевірка, що остання сторінка є цифрою і більше ніж 8
                        const lastPageNumber = parseInt(lastPage, 10); // Перетворити текст на число
                        expect(lastPageNumber).to.be.a('number'); // Перевірка, що це число
                        expect(lastPageNumber).to.be.greaterThan(8);
                        cy.get(`[data-cy="page-${lastPage}"`).should('exist').and('be.visible').should('have.text', lastPage).should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                    });
                cy.get(Pagination.paginationInput).should('have.value', '')

                //Save data from pg 8
                cy.get(TeamPage.employeeName).then(($secondPageNames) => {
                    const secondPageNames = $secondPageNames.map((index, el) => Cypress.$(el).text()).get();

                    cy.get(TeamPage.employeeEmail).then(($secondPageEmails) => {
                        const secondPageEmails = $secondPageEmails.map((index, el) => Cypress.$(el).text()).get();

                        // Compare saved data
                        expect(firstPageNames).to.not.deep.equal(secondPageNames);
                        expect(firstPageEmails).to.not.deep.equal(secondPageEmails);
                    });

                })
            })
        })
    })
    it('Input accepts valid numbers and non valid symbol', () => {
        cy.visit('/people/team');
        //Save data from 1st page (name/email)
        cy.get(TeamPage.employeeName).then(($firstPageNames) => {
            const firstPageNames = $firstPageNames.map((index, el) => Cypress.$(el).text()).get();

            cy.get(TeamPage.employeeEmail).then(($firstPageEmails) => {
                const firstPageEmails = $firstPageEmails.map((index, el) => Cypress.$(el).text()).get();
                cy.log(JSON.stringify(firstPageNames))
                //Go to page 8
                cy.get(Pagination.paginationInput).should('have.value', '').type('8+test')
                cy.get(Pagination.paginationInputButton).click()

                cy.get(Pagination.prevPage).should('exist').and('be.visible')
                cy.get(Pagination.nextPage).should('exist').and('be.visible')
                cy.get(Pagination.page1).should('exist').and('be.visible').should('have.text', "1").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.page2).should('not.exist')
                cy.get(Pagination.pointsBettwenPages).eq(2).should('exist').should('have.text', "…").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.page6).should('exist').and('be.visible').should('have.text', "6").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.page7).should('exist').and('be.visible').should('have.text', "7").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.page8).should('exist').and('be.visible').should('have.text', "8").should('have.css', 'background-color', 'rgb(227, 238, 255)');
                cy.get(Pagination.page9).should('exist').and('be.visible').should('have.text', "9").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.page10).should('exist').and('be.visible').should('have.text', "10").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.pointsBettwenPages).eq(8).should('exist').should('have.text', "…").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.page11).should('not.exist')
                cy.get(Pagination.allPages).find('li').eq(-2)
                    .invoke('text') // Отримати текст з елемента
                    .then((lastPage) => {
                        // Перевірка, що остання сторінка є цифрою і більше ніж 8
                        const lastPageNumber = parseInt(lastPage, 10); // Перетворити текст на число
                        expect(lastPageNumber).to.be.a('number'); // Перевірка, що це число
                        expect(lastPageNumber).to.be.greaterThan(8);
                        cy.get(`[data-cy="page-${lastPage}"`).should('exist').and('be.visible').should('have.text', lastPage).should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                    });
                cy.get(Pagination.paginationInput).should('have.value', '')

                //Save data from pg 8
                cy.get(TeamPage.employeeName).then(($secondPageNames) => {
                    const secondPageNames = $secondPageNames.map((index, el) => Cypress.$(el).text()).get();

                    cy.get(TeamPage.employeeEmail).then(($secondPageEmails) => {
                        const secondPageEmails = $secondPageEmails.map((index, el) => Cypress.$(el).text()).get();

                        // Compare saved data
                        expect(firstPageNames).to.not.deep.equal(secondPageNames);
                        expect(firstPageEmails).to.not.deep.equal(secondPageEmails);
                    });

                })
            })
        })
    })
    it('Custom page input accepts leading zeroes', () => {
        cy.visit('/people/team');
        //Save data from 1st page (name/email)
        cy.get(TeamPage.employeeName).then(($firstPageNames) => {
            const firstPageNames = $firstPageNames.map((index, el) => Cypress.$(el).text()).get();

            cy.get(TeamPage.employeeEmail).then(($firstPageEmails) => {
                const firstPageEmails = $firstPageEmails.map((index, el) => Cypress.$(el).text()).get();
                cy.log(JSON.stringify(firstPageNames))
                //Go to page 8
                cy.get(Pagination.paginationInput).should('have.value', '').type('0007')
                cy.get(Pagination.paginationInputButton).click()

                cy.get(Pagination.prevPage).should('exist').and('be.visible')
                cy.get(Pagination.nextPage).should('exist').and('be.visible')
                cy.get(Pagination.page1).should('exist').and('be.visible').should('have.text', "1").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.page2).should('not.exist')
                cy.get(Pagination.pointsBettwenPages).eq(2).should('exist').should('have.text', "…").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.page5).should('exist').and('be.visible').should('have.text', "5").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.page6).should('exist').and('be.visible').should('have.text', "6").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.page7).should('exist').and('be.visible').should('have.text', "7").should('have.css', 'background-color', 'rgb(227, 238, 255)');
                cy.get(Pagination.page8).should('exist').and('be.visible').should('have.text', "8").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.page9).should('exist').and('be.visible').should('have.text', "9").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.pointsBettwenPages).eq(8).should('exist').should('have.text', "…").should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                cy.get(Pagination.page11).should('not.exist')
                cy.get(Pagination.allPages).find('li').eq(-2)
                    .invoke('text') // Отримати текст з елемента
                    .then((lastPage) => {
                        // Перевірка, що остання сторінка є цифрою і більше ніж 8
                        const lastPageNumber = parseInt(lastPage, 10); // Перетворити текст на число
                        expect(lastPageNumber).to.be.a('number'); // Перевірка, що це число
                        expect(lastPageNumber).to.be.greaterThan(8);
                        cy.get(`[data-cy="page-${lastPage}"`).should('exist').and('be.visible').should('have.text', lastPage).should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
                    });
                cy.get(Pagination.paginationInput).should('have.value', '')

                //Save data from pg 8
                cy.get(TeamPage.employeeName).then(($secondPageNames) => {
                    const secondPageNames = $secondPageNames.map((index, el) => Cypress.$(el).text()).get();

                    cy.get(TeamPage.employeeEmail).then(($secondPageEmails) => {
                        const secondPageEmails = $secondPageEmails.map((index, el) => Cypress.$(el).text()).get();

                        // Compare saved data
                        expect(firstPageNames).to.not.deep.equal(secondPageNames);
                        expect(firstPageEmails).to.not.deep.equal(secondPageEmails);
                    });

                })
            })
        })
    })
    it('Paginator correctly handles no results on a page', () => {
        cy.visit('/people/team');
        // Enter an employee's name in the global search input.
        cy.get(GlobalSearch.searchInput).type("Non Existing Result")
        cy.get('body').type('{enter}');

        cy.get(TeamPage.notFoundPage).should('exist')
        cy.get(TeamPage.notFoundPage).parent().find('div').should("have.text", "Такої людини не знайденоСпробуйте обрати інші опції")

        cy.get(TeamPage.filterItem).should('not.be.checked')
        cy.get(Pagination.paginationNavigation).should("not.exist")

    })
    it('Keyboard navigation for the paginator', () => {
        cy.visit('/people/team');
        cy.get(Pagination.page1).focus().realPress('Tab').realPress('Tab').realPress('Tab').realPress('Tab').realPress('Tab').realPress('Tab').realPress('Tab').realPress('Tab').realPress('Tab')
            .then(() => {
                // Переконайтеся, що фокус на інпуті
                cy.focused().should('exist').type('8').type('{enter}');
            });
        cy.get(Pagination.page8).should('exist').and('be.visible').should('have.text',"8").should('have.css', 'background-color', 'rgb(227, 238, 255)');

    })
    it('Verify one page result', () => {
        cy.visit('/people/team');
        // Enter an employee's name in the global search input.
        cy.get(GlobalSearch.searchInput).type(Cypress.env("searchedUserEmail"))
        cy.get('body').type('{enter}');

        cy.get(TeamPage.filterItem).should('not.be.checked')
        cy.get(Pagination.paginationNavigation).should("not.exist")

    })

})
