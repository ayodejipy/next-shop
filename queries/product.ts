export const productQuery = '*[_type == "product" ]'

// fetch single product, by id
export const getProduct = '*[_type == "product" && _id == $productId][0]'