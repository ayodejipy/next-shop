import Navbar from "@/components/layouts/general/Navbar";
import { Provider } from "react-redux";
import { store } from "@/store";

describe("Navbar component: Navbar.cy.tsx", () => {
    beforeEach(() => {
        cy.mount(
            <Provider store={store()}>
                <Navbar />
            </Provider>
        );
    });
  
  it("mounts component & import store correctly", () => {
      cy.get('[data-testid=topnav]').should('be.visible')
  });
  
  it('should have cart and be empty', () => {
    cy.get('[data-testid=cart-wrapper]').should('be.visible')
    cy.get('[data-testid=cart-value]').contains(0)
  })
});
