import {googleLogin} from "../support/login";
import {GlobalSearch, ProfilePage, TeamPage, Widgets} from "../support/Selectors/commonElements";
import {FullPageText} from "../support/consts/onboardingTexts";
import {GlobalSearchText} from "../support/consts/globalSearchText";

const searchNameItem = 'dmytro'

describe('Global Search tests', () => {
    let shouldRestoreCache = false; // Флаг для контролю кешування

    before(() => {
        googleLogin()
        cy.window().then((win) => {
            win.localStorage.setItem('onboarding_team_passed', JSON.stringify(true));
            win.localStorage.setItem('onboarding_mesh_passed', JSON.stringify(true));
            win.localStorage.setItem('onboarding_profile_passed', JSON.stringify(true));
        });
        cy.saveSelectiveLocalStorage(); // Зберігаємо кеш після ініціалізації

    })
    beforeEach(() => {
        if (shouldRestoreCache) {
            cy.restoreSelectiveLocalStorage(); // Відновлюємо вибірковий кеш тільки для цього блоку
        }
    });
    it('Search and Click on Employee Name', () => {
        shouldRestoreCache = true; // Увімкнути кешування для цього тесту
        cy.visit( '/mesh');
        // Enter an employee's name in the global search input.
        cy.get(GlobalSearch.searchInput).type(searchNameItem)
        // Step 1: Get the data from Global Search results and store them
        cy.get(GlobalSearch.resultItemName).eq(0).should('contain.text',Cypress.env("searchedUser")).invoke('text').as('userName')
        cy.get(GlobalSearch.resultItemPosition).eq(0).should('exist').invoke('text').as('position');
        cy.get(GlobalSearch.resultItemPhone).eq(0).should('contain.text',Cypress.env("searchedUserPhone")).invoke('text').as('phone');
        cy.get(GlobalSearch.resultItemEmail).eq(0).should('contain.text',Cypress.env("searchedUserEmail")).invoke('text').as('email');
        cy.get(GlobalSearch.resultItemName).eq(0).click()

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
        shouldRestoreCache = true;
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
        shouldRestoreCache = true;
        cy.visit( '/people/team');
        cy.contains('.MuiTreeItem-content','!FestCloud').find('[id="chevron-down"]').click()

        cy.contains(TeamPage.teamPageFilterItem,'BusinessLevel').find('[type="checkbox"]')
            .should('not.be.checked').click();
        cy.contains(TeamPage.teamPageFilterItem,'BusinessLevel').find('[type="checkbox"]')
            .should('be.checked');
        cy.contains(TeamPage.teamPageFilterItem,'HighLevel').find('[type="checkbox"]')
            .should('be.checked')
        cy.contains(TeamPage.teamPageFilterItem,'MiddleLevel').find('[type="checkbox"]')
            .should('be.checked')
        cy.contains(TeamPage.teamPageFilterItem,'lowLevel').find('[type="checkbox"]')
            .should('be.checked')

        cy.url().should('include', `workgroupIds=${Cypress.env("businessWorkgroup")}%2C${Cypress.env("firstDepartmentWorkgroup")}%2C${Cypress.env("secondDepartmentWorkgroup")}%2C${Cypress.env("thirdDepartmentWorkgroup")}`);
    });
    it('Filter Employees by Department on Organization Chart', () => {
        shouldRestoreCache = true;
        cy.visit( '/people/team');
        cy.contains('.MuiTreeItem-content','!FestCloud').find('[id="chevron-down"]').click()
        cy.contains('.MuiTreeItem-content','BusinessLevel').find('[id="chevron-down"]').click()
        cy.contains('.MuiTreeItem-content','HighLevel').find('[id="chevron-down"]').click()
        cy.contains('.MuiTreeItem-content','MiddleLevel').find('[id="chevron-down"]').click()

        cy.contains(TeamPage.teamPageFilterItem,'lowLevel').find('[type="checkbox"]')
            .should('not.be.checked').click();
        cy.contains(TeamPage.teamPageFilterItem,'BusinessLevel').find('[type="checkbox"]')
            .should('be.checked');
        cy.contains(TeamPage.teamPageFilterItem,'HighLevel').find('[type="checkbox"]')
            .should('be.checked')
        cy.contains(TeamPage.teamPageFilterItem,'MiddleLevel').find('[type="checkbox"]')
            .should('be.checked')
        cy.contains(TeamPage.teamPageFilterItem,'lowLevel').find('[type="checkbox"]')
            .should('be.checked')
            cy.url().should('include', `workgroupIds=${Cypress.env("thirdDepartmentWorkgroup")}%2C${Cypress.env("secondDepartmentWorkgroup")}%2C${Cypress.env("firstDepartmentWorkgroup")}%2C${Cypress.env("businessWorkgroup")}`);

    });
    it('Verify Group ID is Removed from URL When Department Filter is Unselected', () => {
        shouldRestoreCache = true;
        cy.visit( '/people/team');
        cy.contains('.MuiTreeItem-content','!FestCloud').find('[id="chevron-down"]').click()
        cy.contains(TeamPage.teamPageFilterItem,'!FestCloud').find('[type="checkbox"]')
            .should('not.be.checked')
        cy.contains(TeamPage.teamPageFilterItem,'BusinessLevel').eq(0).find('[type="checkbox"]')
            .should('not.be.checked').click()
        cy.contains(TeamPage.teamPageFilterItem,'HighLevel').find('[type="checkbox"]')
            .should('be.checked')
        cy.contains(TeamPage.teamPageFilterItem,'MiddleLevel').find('[type="checkbox"]')
            .should('be.checked')
        cy.contains(TeamPage.teamPageFilterItem,'lowLevel').find('[type="checkbox"]')
            .should('be.checked')
        cy.url().should('not.include', `workgroupIds=${Cypress.env("firstDepartmentWorkgroup")}%2C${Cypress.env("secondDepartmentWorkgroup")}%2C${Cypress.env("thirdDepartmentWorkgroup")}%2C${Cypress.env("businessWorkgroup")}`);

    });
    it('Verify URL Retains Correct Group IDs After Page Refresh', () => {
        shouldRestoreCache = true;
        cy.visit( '/people/team');
        cy.contains('.MuiTreeItem-content','!FestCloud').find('[id="chevron-down"]').click()

        cy.contains(TeamPage.teamPageFilterItem,'BusinessLevel').eq(0).find('[type="checkbox"]')
            .should('not.be.checked').click()
        cy.contains(TeamPage.teamPageFilterItem,'HighLevel').find('[type="checkbox"]')
            .should('be.checked')
        cy.contains(TeamPage.teamPageFilterItem,'MiddleLevel').find('[type="checkbox"]')
            .should('be.checked')
        cy.contains(TeamPage.teamPageFilterItem,'lowLevel').find('[type="checkbox"]')
            .should('be.checked')
        cy.contains(TeamPage.teamPageFilterItem,'!FestCloud').find('[type="checkbox"]').eq(0)
            .should('not.be.checked')

        cy.url().should('include', `workgroupIds=${Cypress.env("businessWorkgroup")}%2C${Cypress.env("firstDepartmentWorkgroup")}%2C${Cypress.env("secondDepartmentWorkgroup")}%2C${Cypress.env("thirdDepartmentWorkgroup")}`);
        cy.reload()
        cy.url().should('include', `workgroupIds=${Cypress.env("businessWorkgroup")}%2C${Cypress.env("firstDepartmentWorkgroup")}%2C${Cypress.env("secondDepartmentWorkgroup")}%2C${Cypress.env("thirdDepartmentWorkgroup")}`);
        cy.contains(TeamPage.teamPageFilterItem,'BusinessLevel').eq(0).find('[type="checkbox"]')
            .should('be.checked')
        cy.contains(TeamPage.teamPageFilterItem,'HighLevel').find('[type="checkbox"]')
            .should('be.checked')
        cy.contains(TeamPage.teamPageFilterItem,'MiddleLevel').find('[type="checkbox"]')
            .should('be.checked')
        cy.contains(TeamPage.teamPageFilterItem,'lowLevel').find('[type="checkbox"]')
            .should('be.checked')
        cy.contains(TeamPage.teamPageFilterItem,'!FestCloud').find('[type="checkbox"]').eq(0)
            .should('not.be.checked')

    });
    it('Verify Last 5 Search Queries Are Displayed in Search History', () => {
        shouldRestoreCache = true;
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
    it('Verify Search Query Can Be Deleted from History', () => {
        cy.visit( '/');
        cy.get(GlobalSearch.searchInput).type(Cypress.env("searchedUser"))
        cy.get(GlobalSearch.resultItemName).find('span').should('have.text', Cypress.env("searchedUser")).and('have.css', 'background-color', 'rgb(255, 233, 156)');
        cy.get(GlobalSearch.searchClearBtn).click()
        cy.get(GlobalSearch.searchInput).type(`${Cypress.env("searchedUser")}2`)
        cy.get(GlobalSearch.notFoundText).should('have.text',GlobalSearchText.notFound)
        cy.get(GlobalSearch.searchClearBtn).click()
        cy.get(GlobalSearch.clearHistoryBtn).realClick()
        cy.get(GlobalSearch.searchDropdown).should('have.text',`Раніше ви шукали${Cypress.env("searchedUser")}`)

    });
    it('Verify Search Results Disappear When "Clear" Button is Clicked After Invalid Search', () => {
        cy.visit( '/');
        cy.get(GlobalSearch.searchInput).type(`InvalidTermXYZ`)
        cy.get(GlobalSearch.notFoundText).should('have.text',GlobalSearchText.notFound)
        cy.get(GlobalSearch.searchClearBtn).click()
        cy.get(GlobalSearch.searchDropdown).should('have.text',`Раніше ви шукалиInvalidTermXYZ`)
        cy.get(GlobalSearch.clearHistoryBtn).realClick()
        cy.get(GlobalSearch.searchInput).click()
        cy.get(GlobalSearch.searchDropdown).should('not.exist')
    });
    it('Click on Widget Position icon must redirect to orgchart filtered by person’s workgroup', () => {
        shouldRestoreCache = true;
        cy.visit( '/mesh');
        let chipText;
        cy.get(Widgets.profileWidget).find('.MuiChip-label').eq(3).then(($label) => {
            chipText = $label.text();
        cy.get(Widgets.positionTeamLink).trigger('mouseover',{force: true});
        cy.get(Widgets.positionTeamLink).click({force: true})
        cy.contains(TeamPage.teamPageFilterItem, chipText).find('[type="checkbox"]').should('be.checked')
        cy.contains(TeamPage.teamPageFilterItem,'meta4').find('[type="checkbox"]').eq(0).should('not.be.checked')
        cy.contains(TeamPage.teamPageFilterItem,'UX/UI').find('[type="checkbox"]').eq(0).should('not.be.checked')
        cy.contains(TeamPage.teamPageFilterItem,'frontend').find('[type="checkbox"]').eq(0).should('not.be.checked')
        cy.contains(TeamPage.teamPageFilterItem,'BA').find('[type="checkbox"]').eq(0).should('not.be.checked')

            cy.url().should('match', new RegExp(`/people/team\\?workgroupIds=${Cypress.env("metaLastDepartment")}$`));
        });
    });

})
