import Link from "next/link";
import Image from "next/image";
import type { IProduct } from "@/types/product";
import { urlFor } from "@/utils/client";
import { formatCurrency } from "@/hooks/useFormatCurrency";

const Product = ({ product }: { product: IProduct }) => {
    return (
        <div data-testid="product-card" className="group relative">
            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <Image
                    width={800}
                    height={800}
                    data-testid="product-image"
                    src={urlFor(product.images[0].asset._ref).size(1000, 1000).url()}
                    alt={product.images[0].alt.current} className="h-full w-full object-contain"
                />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <Link href={`/product/${product._id}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                        </Link>
                    </h3>
                    <p data-testid="color" className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p data-testid="price" className="text-sm font-medium text-gray-900">{formatCurrency(product.price)}</p>
            </div>
        </div>
    );
};

export default Product;
