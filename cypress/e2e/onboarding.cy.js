import {googleLogin} from "../support/login";
import requestToDb from "../support/DbRequests/hasura_requests";
import {Onboarding, blackArea, NavigationBar, GlobalSearch, Header} from "../support/Selectors/commonElements";
import {NavigationText, onboardingTexts} from "../support/consts/onboardingTexts";
import {HeaderIconText} from "../support/consts/meshPageTexts";

describe('Onboarding tests', () => {
    before(() => {
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
    it('Verify 7th step modal window and "Skip" button for Mesh onboarding', () => {
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
    it('Refresh page when onboarding', () => {
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

        //Reload page
        cy.reload();

        //Verify first modal window
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

        cy.get(NavigationBar.widgetsLink).click()
        cy.url().should('include', '/mesh');

        cy.get(Onboarding.modal).should("not.exist")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('not.exist')

    });
    it('Verify the passed onboarding after relogin', () => {
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

        cy.get(NavigationBar.widgetsLink).click()
        cy.url().should('include', '/mesh');

        cy.get(Onboarding.modal).should("not.exist")
        // Assert the overlay is visible and has the correct class
        cy.get(blackArea.blackArea)
            .should('not.exist')

    });


})
