import Product from "@/components/product/product";
import { IProduct } from "@/types/product";
import { formatCurrency } from "@/hooks/useFormatCurrency";


const DEFAULT_PROPS = {
    _id: "5fae833b-6380-4d54-94f7-ecf92e52c3d9",
    color: "White and black",
    name: "Nike Air Jordan 4 Retro PS White Black Military Grey BQ7669-111 PS Sz 11C-3Y",
    price: 135,
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
    ],
};

describe("Decribe the Product component", () => {
    beforeEach(() => 
        cy.mount(<Product product={DEFAULT_PROPS as any} />)
    )

    it("product card mounts correctly with props", () => {
        cy.get('[data-testid=product-card]')
    });

    it('shows product details correctly', () => {
        cy.get('[data-testid=product-image]').should("have.attr", "alt").and("equal", DEFAULT_PROPS.images[0].alt.current);
        cy.get('h3').contains(DEFAULT_PROPS.name);
        cy.get('[data-testid=color]').first().contains(DEFAULT_PROPS.color);
        cy.get('[data-testid=price]').contains(formatCurrency(DEFAULT_PROPS.price));
    });
});
