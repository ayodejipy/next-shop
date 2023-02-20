export default {
  name: 'carts',
  title: 'Cart',
  type: 'document',
  fields: [
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of:  [{type: 'cartItem'}],
    },
    {
      name: 'owner',
      title: 'Owner',
      type: 'reference',
      to: [{type: 'users'}],
    },
  ],
}
