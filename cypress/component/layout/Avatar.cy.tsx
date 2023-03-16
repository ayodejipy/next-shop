import { Provider } from "react-redux";
import { store } from "@/store";
import UserAvatar from "@/components/user/Avatar";

const DEFAULT_PROPS = {
  _type: 'user',
  _id:"6709876543q234fda",
  avatar:"https://lh3.googleusercontent.com/a/AEdFTp4OoaKVV8KretmY6mg8djDKaIVZcE8CYP_y1eNmLg=s96-c",
  email:"jwebdeveloper@gmail.com",
  name:"Jegede Ayodeji",
}

describe('describe the Avatar component, mounts correctly with props', () => {
  beforeEach(() => {
        cy.mount(
            <Provider store={store()}>
                <UserAvatar user={DEFAULT_PROPS} />
            </Provider>
        );
  });
  
  it('contains an image tag with user name', () => {
    cy.get('[data-testid=user-avatar]')
      .find('.user-icon')
      .children('img')
      .should('have.attr', 'alt')
      .and('equal', DEFAULT_PROPS.name)
  })

  it('shows logout button', () => {
    cy.get('[data-testid=user-avatar]').find('.user-icon').click()

    cy.get('[data-testid=logout-btn]').should('be.visible')
  })
})