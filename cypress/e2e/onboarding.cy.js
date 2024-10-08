import {googleLogin} from "../support/login";
import requestToDb from "../support/DbRequests/hasura_requests";
import {
    Onboarding,
    blackArea,
    NavigationBar,
    GlobalSearch,
    Header,
    ProfilePage, TeamPage
} from "../support/Selectors/commonElements";
import {FullPageText, NavigationText, onboardingTexts, OrgchartText} from "../support/consts/onboardingTexts";
import {HeaderIconText} from "../support/consts/meshPageTexts";

describe('Onboarding tests', () => {
    beforeEach(() => {
        googleLogin()
    })
    it('Verify 1st modal window and "Skip" button for Mesh onboarding', () => {
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        // Check that the modal window is still visible after clicking the overlay
        cy.get(Onboarding.modal).should("be.visible")
        //Verify modal text
        cy.get(Onboarding.title).eq(0).should("have.text", NavigationText.meshTitle)
        cy.get(Onboarding.meshText).eq(0).should("have.text", NavigationText.meshStart0)
        cy.get(Onboarding.meshText).eq(1).should("have.text", NavigationText.meshStart1)
        cy.get(Onboarding.meshText).eq(2).should("have.text", NavigationText.meshStart2)
        cy.get(Onboarding.stepCount).should("have.text", "1/7")
        //Verify buttons
        cy.get(Onboarding.startBtn).should("have.text", NavigationText.startBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)')
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn).click()
        cy.get(Onboarding.modal).should("not.exist")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('not.exist')

    });
    it('Verify 1st modal window "Skip" and reload page for Mesh onboarding', () => {
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        // Check that the modal window is still visible after clicking the overlay
        cy.get(Onboarding.modal).should("be.visible")
        //Verify modal text
        cy.get(Onboarding.title).eq(0).should("have.text", NavigationText.meshTitle)
        cy.get(Onboarding.meshText).eq(0).should("have.text", NavigationText.meshStart0)
        cy.get(Onboarding.meshText).eq(1).should("have.text", NavigationText.meshStart1)
        cy.get(Onboarding.meshText).eq(2).should("have.text", NavigationText.meshStart2)
        cy.get(Onboarding.stepCount).should("have.text", "1/7")
        //Verify buttons
        cy.get(Onboarding.startBtn).should("have.text", NavigationText.startBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)')
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn).click()
        cy.get(Onboarding.modal).should("not.exist")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('not.exist')
        cy.reload().then(()=>{

            //Зміни селектор на віджет!!!!!!!!!
            cy.get('.MuiTypography-root')
            cy.get(Onboarding.modal).should("not.exist")
            // Assert the overlay is visible and has the correct class
            cy.get(blackArea.blackArea)
                .should('not.exist')
        })


    });
    it('Verify 2nd modal window and "Skip" button for Mesh onboarding', () => {
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        // Check that the modal window is still visible after clicking the overlay
        cy.get(Onboarding.modal).should("be.visible")
        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.startBtn).should("have.text", NavigationText.startBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        cy.get(Onboarding.modal).should("be.visible")

        // Ensure the modal window is positioned near the target element
        cy.get(GlobalSearch.searchInput).then(($element) => {
            const elementPosition = $element[0].getBoundingClientRect();

            cy.get(Onboarding.modal).then(($modal) => {
                const modalPosition = $modal[0].getBoundingClientRect();

                // Check that the modal is positioned close to the target element
                expect(Math.abs(modalPosition.top - elementPosition.top)).to.be.lessThan(73);
                expect(Math.abs(modalPosition.left - elementPosition.left)).to.be.lessThan(59);
            });
        });

        cy.get(Onboarding.title).eq(0).should("have.text", NavigationText.globalSearchTitle)
        cy.get(Onboarding.meshText).eq(0).should("have.text", NavigationText.globalSearch)
        cy.get(Onboarding.stepCount).should("have.text", "2/7")

        //Verify buttons
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)')
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn).click()
        cy.get(Onboarding.modal).should("not.exist")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('not.exist')
    });
    it('Verify 3rd modal window and "Skip" button for Mesh onboarding', () => {
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        // Check that the modal window is still visible after clicking the overlay
        cy.get(Onboarding.modal).should("be.visible")
        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.startBtn).should("have.text", NavigationText.startBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        cy.get(Onboarding.modal).should("be.visible")

        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')

        // Ensure the modal window is positioned near the target element
        cy.get(NavigationBar.widgetsLink).then(($element) => {
            const elementPosition = $element[0].getBoundingClientRect();

            cy.get(Onboarding.modal).then(($modal) => {
                const modalPosition = $modal[0].getBoundingClientRect();

                // Check that the modal is positioned close to the target element
                expect(Math.abs(modalPosition.top - elementPosition.top)).to.be.lessThan(82);
                expect(Math.abs(modalPosition.left - elementPosition.left)).to.be.lessThan(65);
            });
        });

        cy.get(Onboarding.title).eq(0).should("have.text", NavigationText.widgetsTitle)
        cy.get(Onboarding.meshText).eq(0).should("have.text", NavigationText.widgets)
        cy.get(Onboarding.stepCount).should("have.text", "3/7")

        //Verify buttons
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)')
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn).click()
        cy.get(Onboarding.modal).should("not.exist")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('not.exist')
    });
    it('Verify 4th step modal window and "Skip" button for Mesh onboarding', () => {
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        // Check that the modal window is still visible after clicking the overlay
        cy.get(Onboarding.modal).should("be.visible")
        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.startBtn).should("have.text", NavigationText.startBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        cy.get(Onboarding.modal).should("be.visible")

        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')

        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('exist')
        cy.get(Onboarding.modal).should("be.visible")

        // Ensure the modal window is positioned near the target element
        cy.get(NavigationBar.profileLink).then(($element) => {
            const elementPosition = $element[0].getBoundingClientRect();

            cy.get(Onboarding.modal).then(($modal) => {
                const modalPosition = $modal[0].getBoundingClientRect();

                // Check that the modal is positioned close to the target element
                expect(Math.abs(modalPosition.top - elementPosition.top)).to.be.lessThan(72);
                expect(Math.abs(modalPosition.left - elementPosition.left)).to.be.lessThan(65);
            });
        });

        cy.get(Onboarding.title).eq(0).should("have.text", NavigationText.profileTitle)
        cy.get(Onboarding.meshText).eq(0).should("have.text", NavigationText.profile)
        cy.get(Onboarding.stepCount).should("have.text", "4/7")

        //Verify buttons
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)')
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn).click()
        cy.get(Onboarding.modal).should("not.exist")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('not.exist')
    });
    it('Verify 5th step modal window and "Skip" button for Mesh onboarding', () => {
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        // Check that the modal window is still visible after clicking the overlay
        cy.get(Onboarding.modal).should("be.visible")
        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.startBtn).should("have.text", NavigationText.startBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        cy.get(Onboarding.modal).should("be.visible")

        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')

        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('exist')
        cy.get(Onboarding.modal).should("be.visible")


        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        cy.get(Onboarding.modal).should("exist")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('exist')

        // Ensure the modal window is positioned near the target element
        cy.get(NavigationBar.teamLink).then(($element) => {
            const elementPosition = $element[0].getBoundingClientRect();

            cy.get(Onboarding.modal).then(($modal) => {
                const modalPosition = $modal[0].getBoundingClientRect();

                // Check that the modal is positioned close to the target element
                expect(Math.abs(modalPosition.top - elementPosition.top)).to.be.lessThan(72);
                expect(Math.abs(modalPosition.left - elementPosition.left)).to.be.lessThan(65);
            });
        });

        cy.get(Onboarding.title).eq(0).should("have.text", NavigationText.orgchartTitle)
        cy.get(Onboarding.meshText).eq(0).should("have.text", NavigationText.orgchart)
        cy.get(Onboarding.stepCount).should("have.text", "5/7")

        //Verify buttons
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)')
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn).click()
        cy.get(Onboarding.modal).should("not.exist")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('not.exist')
    });
    it('Verify 6th step modal window and "Skip" button for Mesh onboarding', () => {
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        // Check that the modal window is still visible after clicking the overlay
        cy.get(Onboarding.modal).should("be.visible")
        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.startBtn).should("have.text", NavigationText.startBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        cy.get(Onboarding.modal).should("be.visible")

        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')

        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('exist')
        cy.get(Onboarding.modal).should("be.visible")


        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('exist')

        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('exist')

        // Ensure the modal window is positioned near the target element
        cy.get(NavigationBar.slideBtn).then(($element) => {
            const elementPosition = $element[0].getBoundingClientRect();

            cy.get(Onboarding.modal).then(($modal) => {
                const modalPosition = $modal[0].getBoundingClientRect();

                // Check that the modal is positioned close to the target element
                expect(Math.abs(modalPosition.top - elementPosition.top)).to.be.lessThan(62);
                expect(Math.abs(modalPosition.left - elementPosition.left)).to.be.lessThan(65);
            });
        });

        cy.get(Onboarding.title).eq(0).should("have.text", NavigationText.slideTitle)
        cy.get(Onboarding.meshText).eq(0).should("have.text", NavigationText.menuSlide)
        cy.get(Onboarding.stepCount).should("have.text", "6/7")
        //Verify buttons
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)')
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn).click()
        cy.get(Onboarding.modal).should("not.exist")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('not.exist')
    });
    it('Verify 7th step modal window and "Done" button for Mesh onboarding', () => {
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        // Check that the modal window is still visible after clicking the overlay
        cy.get(Onboarding.modal).should("be.visible")
        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.startBtn).should("have.text", NavigationText.startBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        cy.get(Onboarding.modal).should("be.visible")

        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')

        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('exist')
        cy.get(Onboarding.modal).should("be.visible")
        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('exist')

        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('exist')
        cy.get(Onboarding.modal).should("be.visible")

        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('exist')
        cy.get(Onboarding.modal).should("be.visible")

        // Ensure the modal window is positioned near the target element
        cy.get(NavigationBar.feedbackLink).then(($element) => {
            const elementPosition = $element[0].getBoundingClientRect();

            cy.get(Onboarding.modal).then(($modal) => {
                const modalPosition = $modal[0].getBoundingClientRect();

                // Check that the modal is positioned close to the target element
                expect(Math.abs(modalPosition.top - elementPosition.top)).to.be.lessThan(161);
                expect(Math.abs(modalPosition.left - elementPosition.left)).to.be.lessThan(65);
            });
        });

        cy.get(Onboarding.title).eq(0).should("have.text", NavigationText.feedbackTitle)
        cy.get(Onboarding.meshText).eq(0).should("have.text", NavigationText.feedback)
        cy.get(Onboarding.stepCount).should("have.text", "7/7")
        //Verify buttons
        cy.get(Onboarding.skipButton).should("not.exist")
        cy.get(Onboarding.finishBtn).should("have.text", NavigationText.finishBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        cy.get(Onboarding.modal).should("not.exist")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('not.exist')
    });
    it('Return on Mesh page after Finished Mesh onboarding', () => {
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        // Check that the modal window is still visible after clicking the overlay
        cy.get(Onboarding.modal).should("be.visible")
        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.startBtn).should("have.text", NavigationText.startBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        cy.get(Onboarding.modal).should("be.visible")

        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')

        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('exist')
        cy.get(Onboarding.modal).should("be.visible")
        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('exist')

        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('exist')
        cy.get(Onboarding.modal).should("be.visible")

        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('exist')
        cy.get(Onboarding.modal).should("be.visible")

        //Verify buttons
        cy.get(Onboarding.finishBtn).should("have.text", NavigationText.finishBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        cy.get(Onboarding.modal).should("not.exist")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('not.exist')

        cy.get(NavigationBar.teamLink).click()
        cy.url().should('include', '/people/team');
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn).click()

        cy.get(NavigationBar.widgetsLink).eq(0).click()
        cy.url().should('include', '/mesh');

        cy.get(Onboarding.modal).should("not.exist")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('not.exist')

    });
    it('Verify the passed Mesh onboarding after relogin', () => {
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        // Check that the modal window is still visible after clicking the overlay
        cy.get(Onboarding.modal).should("be.visible")
        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.startBtn).should("have.text", NavigationText.startBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        cy.get(Onboarding.modal).should("be.visible")

        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')

        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('exist')
        cy.get(Onboarding.modal).should("be.visible")
        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('exist')

        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('exist')
        cy.get(Onboarding.modal).should("be.visible")

        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('exist')
        cy.get(Onboarding.modal).should("be.visible")

        //Verify buttons
        cy.get(Onboarding.finishBtn).should("have.text", NavigationText.finishBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        cy.get(Onboarding.modal).should("not.exist")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('not.exist')

        cy.get(Header.menuBtn).click()
        cy.contains(HeaderIconText.exitMenuItem).click()

        googleLogin()

        cy.get(NavigationBar.teamLink).click()
        cy.url().should('include', '/people/team');
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn).click()

        cy.get(NavigationBar.widgetsLink).eq(0).click()
        cy.url().should('include', '/mesh');

        cy.get(Onboarding.modal).should("not.exist")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('not.exist')

    });

    it('Verify 1st modal window and "Skip" button for Profile onboarding', () => {
        cy.visit( '/people/my-profile');
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        // Check that the modal window is still visible after clicking the overlay
        cy.get(Onboarding.modal).should("be.visible")
        //Verify modal text
        cy.get(Onboarding.profileText).eq(0).should("have.text", FullPageText.festProfileTitle)
        cy.get(Onboarding.profileText).eq(1).should("have.text", FullPageText.profileStart0)
        cy.get(Onboarding.profileText).eq(2).should("have.text", FullPageText.profileStart1)
        cy.get(Onboarding.stepCount).should("have.text", "1/4")
        //Verify buttons
        cy.get(Onboarding.startBtn).should("have.text", NavigationText.startBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)')
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn).click()
        cy.get(Onboarding.modal).should("not.exist")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('not.exist')

    });
    it('Verify 2nd modal window and "Skip" button for Profile onboarding', () => {
        cy.visit( '/people/my-profile');
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        // Check that the modal window is still visible after clicking the overlay
        cy.get(Onboarding.modal).should("be.visible")
        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.startBtn).should("have.text", NavigationText.startBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        cy.get(Onboarding.modal).should("be.visible")

        // Ensure the modal window is positioned near the target element
        cy.get(GlobalSearch.searchInput).then(($element) => {
            const elementPosition = $element[0].getBoundingClientRect();

            cy.get(Onboarding.modal).then(($modal) => {
                const modalPosition = $modal[0].getBoundingClientRect();

                // Check that the modal is positioned close to the target element
                expect(Math.abs(modalPosition.top - elementPosition.top)).to.be.lessThan(331);
                expect(Math.abs(modalPosition.left - elementPosition.left)).to.be.lessThan(433);
            });
        });

        cy.get(Onboarding.profileTitle).should("have.text", FullPageText.aboutUserTitle)
        cy.get(Onboarding.profileText).should("have.text", FullPageText.aboutUser)
        cy.get(Onboarding.stepCount).should("have.text", "2/4")

        //Verify buttons
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)')
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn).click()
        cy.get(Onboarding.modal).should("not.exist")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('not.exist')
    });
    it('Verify 3rd modal window and "Skip" button for Profile onboarding', () => {
        cy.visit( '/people/my-profile');
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        // Check that the modal window is still visible after clicking the overlay
        cy.get(Onboarding.modal).should("be.visible")
        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.startBtn).should("have.text", NavigationText.startBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        cy.get(Onboarding.modal).should("be.visible")

        // Ensure the modal window is positioned near the target element
        cy.get(GlobalSearch.searchInput).then(($element) => {
            const elementPosition = $element[0].getBoundingClientRect();

            cy.get(Onboarding.modal).then(($modal) => {
                const modalPosition = $modal[0].getBoundingClientRect();

                // Check that the modal is positioned close to the target element
                expect(Math.abs(modalPosition.top - elementPosition.top)).to.be.lessThan(331);
                expect(Math.abs(modalPosition.left - elementPosition.left)).to.be.lessThan(433);
            });
        });

        //Verify buttons
        cy.wait(1000)

        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        cy.get(Onboarding.modal).should("exist")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('exist')
        cy.get(Onboarding.profileTitle).should("have.text", FullPageText.teamTitle)
        cy.get(Onboarding.profileText).should("have.text", FullPageText.teamSection)
        cy.get(Onboarding.stepCount).should("have.text", "3/4")

        //Verify buttons
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)')
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn).click()
        cy.get(Onboarding.modal).should("not.exist")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('not.exist')
    });
    it('Verify 4th step modal window and "Done" button for Profile onboarding', () => {
        cy.visit( '/people/my-profile');
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        // Check that the modal window is still visible after clicking the overlay
        cy.get(Onboarding.modal).should("be.visible")
        cy.wait(500)
        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.startBtn).should("have.text", NavigationText.startBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        cy.get(Onboarding.modal).should("be.visible")

        // Ensure the modal window is positioned near the target element
        cy.get(GlobalSearch.searchInput).then(($element) => {
            const elementPosition = $element[0].getBoundingClientRect();

            cy.get(Onboarding.modal).then(($modal) => {
                const modalPosition = $modal[0].getBoundingClientRect();

                // Check that the modal is positioned close to the target element
                expect(Math.abs(modalPosition.top - elementPosition.top)).to.be.lessThan(331);
                expect(Math.abs(modalPosition.left - elementPosition.left)).to.be.lessThan(433);
            });
        });

        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        cy.get(Onboarding.modal).should("exist")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('exist')
        cy.wait(1000)

        //Verify buttons
        cy.get(Onboarding.stepCount).should("have.text", "3/4")
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        cy.get(Onboarding.modal).should("exist")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('exist')
        cy.get(Onboarding.profileTitle).should("have.text", FullPageText.positionTitle)
        cy.get(Onboarding.profileText).should("have.text", FullPageText.positionSection)
        cy.get(Onboarding.stepCount).should("have.text", "4/4")
        //Verify buttons
        cy.get(Onboarding.skipButton).should("not.exist")
        cy.get(Onboarding.finishBtn).should("have.text", NavigationText.finishBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        cy.get(Onboarding.modal).should("not.exist")

        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('not.exist')
    });
    it('Return on Profile page after Finished Mesh onboarding', () => {
        cy.visit( '/people/my-profile');
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        // Check that the modal window is still visible after clicking the overlay
        cy.get(Onboarding.modal).should("be.visible")
        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.startBtn).should("have.text", NavigationText.startBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        cy.get(Onboarding.modal).should("be.visible")

        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()

        cy.get(Onboarding.modal).should("be.visible")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('exist')
        cy.wait(500)

        //Verify buttons
        cy.get(Onboarding.stepCount).should("have.text", "3/4")
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.nextBtn).should("have.text", NavigationText.nextBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        cy.get(Onboarding.modal).should("exist")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('exist')
        cy.get(Onboarding.profileTitle).should("have.text", FullPageText.positionTitle)
        cy.get(Onboarding.profileText).should("have.text", FullPageText.positionSection)
        cy.get(Onboarding.stepCount).should("have.text", "4/4")
        //Verify buttons
        cy.get(Onboarding.skipButton).should("not.exist")
        cy.get(Onboarding.finishBtn).should("have.text", NavigationText.finishBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        cy.get(Onboarding.modal).should("not.exist")

        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('not.exist')

        cy.get(NavigationBar.widgetsLink).click()
        cy.url().should('include', '/mesh');
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn).click()


        cy.get(NavigationBar.profileLink).click()
        cy.url().should('include', '/people/my-profile');

        cy.get(Onboarding.modal).should("not.exist")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('not.exist')

    });

    it('Verify 1st modal window and "Skip" button for Orgchart onboarding', () => {
        cy.visit( '/people/team');
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        // Check that the modal window is still visible after clicking the overlay
        cy.get(Onboarding.modal).should("be.visible")
        // Ensure the modal window is positioned near the target element

            cy.get(Onboarding.modal).then(($modal) => {
                const modalPosition = $modal[0].getBoundingClientRect();

                // Check that the modal is positioned close to the target element
                expect(modalPosition.top ).to.eq(234.3359375);
                expect(modalPosition.left ).to.eq(680);
            });

        //Verify modal text
        cy.get(Onboarding.teamText).eq(0).should("have.text", OrgchartText.orgchartTitle)
        cy.get(Onboarding.teamText).eq(1).should("have.text", OrgchartText.orgchartStart0)
        cy.get(Onboarding.teamText).eq(2).should("have.text", OrgchartText.orgchartStart1)
        cy.get(Onboarding.stepCount).should("have.text", "1/2")
        //Verify buttons
        cy.get(Onboarding.startBtn).should("have.text", NavigationText.startBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)')
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn).click()
        cy.get(Onboarding.modal).should("not.exist")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('not.exist')

    });
    it('Verify 2nd modal window and "Skip" button for Orgchart onboarding', () => {
        cy.visit( '/people/team');
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        // Check that the modal window is still visible after clicking the overlay
        cy.get(Onboarding.modal).should("be.visible")
        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.startBtn).should("have.text", NavigationText.startBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        cy.get(Onboarding.modal).should("be.visible")

        // Ensure the modal window is positioned near the target element
        cy.get(GlobalSearch.searchInput).then(($element) => {
            const elementPosition = $element[0].getBoundingClientRect();

            cy.get(Onboarding.modal).then(($modal) => {
                const modalPosition = $modal[0].getBoundingClientRect();

                // Check that the modal is positioned close to the target element
                expect(Math.abs(modalPosition.top - elementPosition.top)).to.be.lessThan(129);
                expect(Math.abs(modalPosition.left - elementPosition.left)).to.be.lessThan(238);
            });
        });

        cy.get(Onboarding.teamTitle).should("have.text", OrgchartText.filterTitle)
        cy.get(Onboarding.teamText).should("have.text", OrgchartText.filters)
        cy.get(Onboarding.stepCount).should("have.text", "2/2")

        //Verify buttons
        cy.get(Onboarding.skipButton).should("not.exist")
        cy.get(Onboarding.finishBtn).should("have.text", NavigationText.finishBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        cy.get(Onboarding.modal).should("not.exist")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('not.exist')
    });
    it('Verify the passed Orgchart onboarding after relogin', () => {
        cy.visit( '/people/team');
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        // Check that the modal window is still visible after clicking the overlay
        cy.get(Onboarding.modal).should("be.visible")
        //Verify buttons
        cy.get(Onboarding.skipButton).should("have.text", NavigationText.skipBtn)
        cy.get(Onboarding.startBtn).should("have.text", NavigationText.startBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('be.visible')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.4)');
        // Try to click on the overlay (outside the modal) and assert that no action occurs
        cy.get(blackArea.blackArea).click({force: true});
        cy.get(Onboarding.modal).should("be.visible")

        //Verify buttons
        cy.get(Onboarding.skipButton).should("not.exist")
        cy.get(Onboarding.finishBtn).should("have.text", NavigationText.finishBtn).should('have.css', 'background-color', 'rgb(58, 119, 220)').click()
        cy.get(Onboarding.modal).should("not.exist")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('not.exist')

        cy.get(Header.menuBtn).click()
        cy.contains(HeaderIconText.exitMenuItem).click()

        googleLogin()

        cy.get(NavigationBar.teamLink).click()
        cy.url().should('include', '/people/team');

        cy.get(Onboarding.modal).should("not.exist")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('not.exist')

    });

})
