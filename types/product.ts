export type Image = {
    alt: { _slug: string; current: string };
    asset: { _type: string; _ref: string };
    _key: string;
    _type: string;
}

export interface IProduct {
	_id: number;
    name: string;
    slug: string;
    description: string;
    href: string
    images: Image[];
    price: number;
    color: string;
    stocks: number;
    available: boolean;
    _createdAt: string;
    _updatedAt: string;
    _type?: string | number;
    _ref?: string | number;
}

export interface ProductOwner {
    _type: string;
    _ref: string | number;
}

export interface ICartProduct {
    item: IProduct;
    quantity: number;
}

export interface ICartObject {
    items: { _type: string; _ref: number;}[];
    owner?: ProductOwner;
    _type?: string;
}
