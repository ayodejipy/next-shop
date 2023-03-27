import CartItems from "@/components/product/CartItems";
import { Provider } from "react-redux";
import { store, AppStore } from "@/store";
import { configureStore } from "@reduxjs/toolkit";
import { addToCart } from "@/store/user";
import { formatCurrency } from "@/hooks/useFormatCurrency";


type Props = {
    open: boolean;
    toggle: (args: boolean) => void;
};

const DEFAULT_PROPS = {
    open: true,
    toggle: () => {},
};

const CART_ITEMS = {
    1: {
        _createdAt: "2023-01-31T12:18:56Z",
        _id: "5fae833b-6380-4d54-94f7-ecf92e52c3d9",
        _rev: "0mmgc4CDWeXHLRG7Wcj3m9",
        _type: "product",
        _updatedAt: "2023-01-31T12:18:56Z",
        available: true,
        color: "White and black",
        description: "Nike Air Jordan 4 Retro White/Black-Neutral Grey",
        name: "Nike Air Jordan 4 Retro PS White Black Military Grey BQ7669-111 PS Sz 11C-3Y",
        price: 135,
        stocks: 5,
        images: [
            {
                _key: "19450a761f88",
                _type: "image",
                alt: {
                    _type: "slug",
                    current: "nike-air-jordan-4-retro-ps-white-black-military-grey-bq7669-111-ps-sz-11c-3y",
                },
                asset: {
                    _ref: "image-18b3991cef3f5120c80a590d8ba161f841502af1-600x801-jpg",
                    _type: "reference",
                },
            },
            {
                _key: "13604ae1382b",
                _type: "image",
                alt: {
                    _type: "slug",
                    current: "nike-air-jordan-4-retro-ps-white-black-military-grey-bq7669-111-ps-sz-11c-3y",
                },
                asset: {
                    _ref: "image-fa9732aa4ac0279e139a146a9d3b702c2bfe6476-600x801-jpg",
                    _type: "reference",
                },
            },
            {
                _key: "d6b82c4b4f98",
                _type: "image",
                alt: {
                    _type: "slug",
                    current: "nike-air-jordan-4-retro-ps-white-black-military-grey-bq7669-111-ps-sz-11c-3y",
                },
                asset: {
                    _ref: "image-18b3991cef3f5120c80a590d8ba161f841502af1-600x801-jpg",
                    _type: "reference",
                },
            },
        ],
        slug: {
            _type: "slug",
            current: "nike-air-jordan-4-retro-ps-white-black-military-grey-bq7669-111-ps-sz-11c-3y",
        }
    },
    2: {
        _createdAt: "2023-01-20T08:51:28Z",
        _id: "631c9195-b925-49dc-89af-539c02a2009e",
        _rev: "HLRbTPDWeyNzNr31RlNlsQ",
        _type: "product",
        _updatedAt: "2023-01-24T10:13:27Z",
        available: true,
        color: "Green and blue",
        description: "Steel Toe Shoes Upper: Our larger steel toe cap widening 2 mm lets you enjoy the barefoot feel and gives your feet extra protection against the heavy force of rolling or falling object * Puncture Prevent: The sole with 4.0 Kevlar midsole and shock absorbing double insole protects your feet from being punctured by sharp objects like nails and steel bars while working",
        images: [
            {
                _key: "4d8dac8a763e",
                _type: "image",
                alt: {
                    _type: "slug",
                    current: "debonsapt-steel-toe-shoes",
                },
                asset: {
                    _ref: "image-9d6c8cd814b37aa7e5b52f5203a37cef8758547a-695x695-jpg",
                    _type: "reference",
                },
            },
            {
                _key: "b1e529eec537",
                _type: "image",
                alt: {
                    _type: "slug",
                    current: "debonsapt-steel-toe-shoes",
                },
                asset: {
                    _ref: "image-bf1bd1a26b2715ab144d0042e268d7eef36eb812-667x695-jpg",
                    _type: "reference",
                },
            },
        ],
        name: "DEBONSAPT Steel Toe Shoes",
        price: 48,
        slug: {
            _type: "slug",
            current: "debonsapt-steel-toe-shoes",
        },
        stocks: 98,
    },
    empty_cart: "Cart is currently empty",
 };

describe("Describe Cart component", () => {
    let newStore: AppStore;
    newStore = store();

    beforeEach(() => {
        cy.mount(
            <Provider store={newStore}>
                <CartItems open={DEFAULT_PROPS.open} toggle={DEFAULT_PROPS.toggle} />
            </Provider>
        );
    });

    it("shows empty cart when state is empty", () => {
        cy.get("[data-testid=empty-cart] p").contains(CART_ITEMS.empty_cart);
    });

    it("should contain items when cart is not empty", () => {
        newStore.dispatch(addToCart(CART_ITEMS[1]));

        cy.get('[data-testid=cart-product]').should('have.length', 1)
    });

    it('shows correct product data & subtotal info', () => {
        const product = CART_ITEMS[1];

        cy.get('[data-testid=product-image]').should('have.attr', 'alt')
            .and('equal', product.images[0].alt.current);

        cy.get('[data-testid=name]').contains(product.name)
        cy.get('[data-testid=price]').contains(formatCurrency(product.price))
        cy.get('[data-testid=color]').contains(product.color)
        cy.get('[data-testid=subtotal]').contains(formatCurrency(product.price))
    })

    it('reacting to increase/decrease events', () => {
        cy.get('[data-testid=increase-qnt]').click()
        cy.get('[data-testid=quantity]').should('have.text', '2')

        cy.get('[data-testid=decrease-qnt]').click()
        cy.get('[data-testid=quantity]').should('have.text', '1')
        
        cy.get('[data-testid=remove-product]').click()
        // cy.get('[data-testid=cart-product]').should('have.length', 0)

        cy.get("[data-testid=empty-cart] p").contains(CART_ITEMS.empty_cart);

    })

    it('call function & hide modal', () => {
        const onToggleSpy = cy.spy().as('onToggleSpy');
        cy.mount(
            <Provider store={newStore}>
                <CartItems open={DEFAULT_PROPS.open} toggle={onToggleSpy} />
            </Provider>
        );

        cy.get('[data-testid=close]').click()

        cy.get('@onToggleSpy').should('have.been.calledOnce');
    })
});
