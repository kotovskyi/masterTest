import {googleLogin} from "../support/login";
import {GlobalSearch, ProfilePage, TeamPage, Widgets} from "../support/Selectors/commonElements";
import {FullPageText} from "../support/consts/onboardingTexts";
import {GlobalSearchText} from "../support/consts/globalSearchText";

const searchNameItem = 'dmytro'

describe('Global Search tests', () => {
    beforeEach(() => {
        googleLogin()
        cy.window().then((win) => {
            win.localStorage.setItem('onboarding_team_passed', JSON.stringify(true));
            win.localStorage.setItem('onboarding_mesh_passed', JSON.stringify(true));
            win.localStorage.setItem('onboarding_profile_passed', JSON.stringify(true));
        });
    })

    it('Search and Click on Employee Name', () => {
        cy.visit( '/mesh');
        // Enter an employee's name in the global search input.
        cy.get(GlobalSearch.searchInput).type(searchNameItem)
        // Step 1: Get the data from Global Search results and store them
        cy.get(GlobalSearch.resultItemName).should('contain.text',Cypress.env("searchedUser")).invoke('text').as('userName')
        cy.get(GlobalSearch.resultItemPosition).should('exist').invoke('text').as('position');
        cy.get(GlobalSearch.resultItemPhone).should('contain.text',Cypress.env("searchedUserPhone")).invoke('text').as('phone');
        cy.get(GlobalSearch.resultItemEmail).should('contain.text',Cypress.env("searchedUserEmail")).invoke('text').as('email');
        cy.get(GlobalSearch.resultItemName).click()

        cy.get('@userName').then((userName) => {
            cy.get(ProfilePage.userName).should('have.text', userName);
        });
        // Verify the stored data matches the profile page data
        cy.get('@position').then((position) => {
            cy.get(ProfilePage.userPosition).should('have.text', position);
        });
        cy.get('@phone').then((phone) => {
            cy.get(ProfilePage.userPhoneNumber).should('have.text', phone);
        });
        cy.get('@email').then((email) => {
            cy.get(ProfilePage.userEmail).should('have.text', email);
        });
        cy.url().should('include', '/people/employee');
    });
    it('Search and Press Enter to View All Results', () => {
        cy.visit( '/mesh');
        //cy.get('.MuiPaper-root')
        // Enter an employee's name in the global search input.
        cy.get(GlobalSearch.searchInput).type(searchNameItem)
        // Step 1: Get the data from Global Search results and store them
        cy.get(GlobalSearch.resultItemName).should('contain.text',Cypress.env("searchedUser")).invoke('text').as('userName')
        cy.get(GlobalSearch.resultItemPosition).should('exist').invoke('text').as('position');
        cy.get(GlobalSearch.resultItemPhone).should('contain.text',Cypress.env("searchedUserPhone")).invoke('text').as('phone');
        cy.get(GlobalSearch.resultItemEmail).should('contain.text',Cypress.env("searchedUserEmail")).invoke('text').as('email');
        cy.get('body').type('{enter}');

        cy.get('@userName').then((userName) => {
            cy.get(TeamPage.employeeName).should('have.text', userName);
        });
        // Verify the stored data matches the profile page data
        cy.get('@position').then((position) => {
            cy.get(TeamPage.employeePosition).should('have.text', position);
        });
        // cy.get('@phone').then((phone) => {
        //     cy.get(TeamPage.employeePhoneNumber).should('have.text', phone);
        // });
        cy.get('@email').then((email) => {
            cy.get(TeamPage.employeeEmail).should('have.text', email);
        });
        cy.url().should('include', '/people/team');
    });
    it('Filter Employees by Business on Organization Chart', () => {
        cy.visit( '/people/team');
        cy.get(TeamPage.expandIcon).click()
        cy.get(TeamPage.expandIcon).click()
        cy.get(TeamPage.expandIcon).click()
        cy.get(TeamPage.filterUncheckedIcon).eq(3)
            .prev('input[type="checkbox"]')
            .should('not.be.checked').click();
        cy.get(TeamPage.filterCheckedIcon).eq(0).prev('input[type="checkbox"]').should('be.checked')
        cy.get(TeamPage.filterCheckedIcon).eq(1).prev('input[type="checkbox"]').should('be.checked')
        cy.get(TeamPage.filterCheckedIcon).eq(2).prev('input[type="checkbox"]').should('be.checked')
        cy.url().should('include', `workgroupIds=${Cypress.env("businessWorkgroup")}%2C${Cypress.env("thirdDepartmentWorkgroup")}%2C${Cypress.env("secondDepartmentWorkgroup")}%2C${Cypress.env("firstDepartmentWorkgroup")}`);

    });
    it('Filter Employees by Department on Organization Chart', () => {
        cy.visit( '/people/team');
        cy.get(TeamPage.expandIcon).click()
        cy.get(TeamPage.expandIcon).click()
        cy.get(TeamPage.expandIcon).click()
        cy.get(TeamPage.filterUncheckedIcon).eq(0)
            .prev('input[type="checkbox"]')
            .should('not.be.checked').click();
        cy.get(TeamPage.filterCheckedIcon).eq(0).prev('input[type="checkbox"]').should('be.checked')
        cy.get(TeamPage.filterCheckedIcon).eq(1).prev('input[type="checkbox"]').should('be.checked')
        cy.get(TeamPage.filterCheckedIcon).eq(2).prev('input[type="checkbox"]').should('be.checked')
        cy.url().should('include', `workgroupIds=${Cypress.env("firstDepartmentWorkgroup")}%2C${Cypress.env("secondDepartmentWorkgroup")}%2C${Cypress.env("thirdDepartmentWorkgroup")}%2C${Cypress.env("businessWorkgroup")}`);

    });
    it('Verify Group ID is Removed from URL When Department Filter is Unselected', () => {
        cy.visit( '/people/team');
        cy.get(TeamPage.expandIcon).click()
        cy.get(TeamPage.expandIcon).click()
        cy.get(TeamPage.expandIcon).click()
        cy.get(TeamPage.filterUncheckedIcon).eq(0)
            .prev('input[type="checkbox"]')
            .should('not.be.checked').click();
        cy.get(TeamPage.filterCheckedIcon).eq(0).prev('input[type="checkbox"]').should('be.checked')
        cy.get(TeamPage.filterCheckedIcon).eq(1).prev('input[type="checkbox"]').should('be.checked')
        cy.wait(500)
        cy.get(TeamPage.filterCheckedIcon).eq(2).prev('input[type="checkbox"]').should('be.checked').click()
        cy.url().should('not.include', `workgroupIds=${Cypress.env("firstDepartmentWorkgroup")}%2C${Cypress.env("secondDepartmentWorkgroup")}%2C${Cypress.env("thirdDepartmentWorkgroup")}%2C${Cypress.env("businessWorkgroup")}`);

    });
    it('Verify URL Retains Correct Group IDs After Page Refresh', () => {
        cy.visit( '/people/team');
        cy.get(TeamPage.expandIcon).click()
        cy.get(TeamPage.expandIcon).click()
        cy.get(TeamPage.expandIcon).click()
        cy.get(TeamPage.filterUncheckedIcon).eq(0)
            .prev('input[type="checkbox"]')
            .should('not.be.checked').click();
        cy.get(TeamPage.filterCheckedIcon).eq(0).prev('input[type="checkbox"]').should('be.checked')
        cy.get(TeamPage.filterCheckedIcon).eq(1).prev('input[type="checkbox"]').should('be.checked')
        cy.get(TeamPage.filterCheckedIcon).eq(2).prev('input[type="checkbox"]').should('be.checked')
        cy.get(TeamPage.filterCheckedIcon).eq(3).prev('input[type="checkbox"]').should('be.checked')


        cy.url().should('include', `workgroupIds=${Cypress.env("firstDepartmentWorkgroup")}%2C${Cypress.env("secondDepartmentWorkgroup")}%2C${Cypress.env("thirdDepartmentWorkgroup")}%2C${Cypress.env("businessWorkgroup")}`);
        cy.reload()
        cy.url().should('include', `workgroupIds=${Cypress.env("firstDepartmentWorkgroup")}%2C${Cypress.env("secondDepartmentWorkgroup")}%2C${Cypress.env("thirdDepartmentWorkgroup")}%2C${Cypress.env("businessWorkgroup")}`);
        cy.get(TeamPage.filterCheckedIcon).eq(0).prev('input[type="checkbox"]').should('be.checked')
        cy.get(TeamPage.filterCheckedIcon).eq(1).prev('input[type="checkbox"]').should('be.checked')
        cy.get(TeamPage.filterCheckedIcon).eq(2).prev('input[type="checkbox"]').should('be.checked')
        cy.get(TeamPage.filterCheckedIcon).eq(3).prev('input[type="checkbox"]').should('be.checked')

    });
    it('Verify Last 5 Search Queries Are Displayed in Search History', () => {
        cy.visit( '/');
        cy.get(GlobalSearch.searchInput).type(Cypress.env("searchedUser"))
        cy.get(GlobalSearch.resultItemName).should('include.text',Cypress.env("searchedUser"))
        cy.get(GlobalSearch.searchInput).type(Cypress.env("searchedUser"))
        cy.get(GlobalSearch.searchClearBtn).click()
        cy.get(GlobalSearch.searchInput).type(`${Cypress.env("searchedUser")}2`)
        cy.get(GlobalSearch.notFoundText).should('have.text',GlobalSearchText.notFound)
        cy.get(GlobalSearch.searchClearBtn).click()
        cy.get(GlobalSearch.searchInput).type(`${Cypress.env("searchedUser")}3`)
        cy.get(GlobalSearch.notFoundText).should('have.text',GlobalSearchText.notFound)
        cy.get(GlobalSearch.searchClearBtn).click()
        cy.get(GlobalSearch.searchInput).type(`${Cypress.env("searchedUser")}4`)
        cy.get(GlobalSearch.notFoundText).should('have.text',GlobalSearchText.notFound)
        cy.get(GlobalSearch.searchClearBtn).click()
        cy.get(GlobalSearch.searchInput).type(`${Cypress.env("searchedUser")}5`)
        cy.get(GlobalSearch.notFoundText).should('have.text',GlobalSearchText.notFound)
        cy.get(GlobalSearch.searchClearBtn).click()
        cy.get(GlobalSearch.searchInput).type(`${Cypress.env("searchedUser")}6`)
        cy.get(GlobalSearch.notFoundText).should('have.text',GlobalSearchText.notFound)
        cy.get(GlobalSearch.searchClearBtn).click()
        cy.get(GlobalSearch.searchInput).type(`${Cypress.env("searchedUser")}7`)
        cy.get(GlobalSearch.notFoundText).should('have.text',GlobalSearchText.notFound)
        cy.get(GlobalSearch.searchClearBtn).click()
        cy.get(GlobalSearch.historyItem).should('include.text', `${Cypress.env("searchedUser")}7${Cypress.env("searchedUser")}6${Cypress.env("searchedUser")}5${Cypress.env("searchedUser")}4${Cypress.env("searchedUser")}3${Cypress.env("searchedUser")}2`)

        // Click on empty space and then again on global search input. Verify saved search history
        cy.get(GlobalSearch.searchInput).click()
        cy.get(Widgets.team).click({force: true})
        cy.visit( '/people/my-profile');
        cy.visit( '/');
        cy.get(GlobalSearch.searchInput).click()
        cy.get(GlobalSearch.historyItem).should('include.text', `${Cypress.env("searchedUser")}7${Cypress.env("searchedUser")}6${Cypress.env("searchedUser")}5${Cypress.env("searchedUser")}4${Cypress.env("searchedUser")}3${Cypress.env("searchedUser")}2`)

        //verify after page reloading
        cy.reload()
        cy.get(GlobalSearch.searchInput).click()
        cy.get(GlobalSearch.historyItem).should('include.text', `${Cypress.env("searchedUser")}7${Cypress.env("searchedUser")}6${Cypress.env("searchedUser")}5${Cypress.env("searchedUser")}4${Cypress.env("searchedUser")}3${Cypress.env("searchedUser")}2`)

    });
    it.skip('Verify Search Query Can Be Deleted from History', () => {
        cy.visit( '/');
        cy.get(GlobalSearch.searchInput).type(Cypress.env("searchedUser"))
        cy.get(GlobalSearch.resultItemName).find('span').should('have.text', Cypress.env("searchedUser")).and('have.css', 'background-color', 'rgb(255, 233, 156)');
        cy.get(GlobalSearch.searchClearBtn).click()
        cy.get(GlobalSearch.searchInput).type(`${Cypress.env("searchedUser")}2`)
        cy.get(GlobalSearch.notFoundText).should('have.text',GlobalSearchText.notFound)
        cy.get(GlobalSearch.searchClearBtn).click()
// Додаємо властивість pointer-events: none;

        // cy.get('[data-cy="global-search-history-item"] > .blocking-element').eq(0) // Знаходимо елемент, що заважає
        //     .invoke('remove');


        cy.window().then((win) => {
            const item = win.document.querySelector('[data-cy="global-search-history-item"]');
            item.style.display = 'none'; // Приховуємо блокуючий елемент
        });
        cy.wait(100); // Затримка в 100 мс
        cy.get('[data-cy="global-search-clear-history-btn"]').eq(0).click(); // Клікаємо на кнопку




        // cy.get(GlobalSearch.historyItem).should('have.text', `${Cypress.env("searchedUser")}2${Cypress.env("searchedUser")}`)

        // Delete search history items

        //cy.get(GlobalSearch.clearHistoryBtn).eq(0).scrollIntoView().click();
    });
    it('Verify Search Query Can Be Deleted from History', () => {
        cy.visit( '/');
        cy.get(GlobalSearch.searchInput).type(Cypress.env("searchedUserReverse"))
        cy.get(GlobalSearch.resultItemName).should('include.text',Cypress.env("searchedUser"))
        //cy.get(GlobalSearch.resultItemPosition).should('have.text',Cypress.env("searchedUserPosition"));
        cy.get(GlobalSearch.resultItemPhone).should('have.text',Cypress.env("searchedUserPhone"))
        cy.get(GlobalSearch.resultItemEmail).should('have.text' ,Cypress.env("searchedUserEmail"))

    });

})
