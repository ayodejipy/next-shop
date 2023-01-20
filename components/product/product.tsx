import type { IProduct } from "@/types/product";
import { urlFor } from "@/utils/client";

const Product = ({ product }: {product: IProduct}) => {
    return (
        <div key={product._id} className="group relative">
            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                    src={urlFor(product.images[0].asset._ref).size(150, 150).url()}
                    alt={product.images[0].alt.current}
                    className="h-full w-full object-cover object-center" />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <a href={product.href}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                        </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
            </div>
        </div>
    );
};

export default Product;
