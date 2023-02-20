export default {
  name: 'cartItem',
  type: 'object',
  fields: [
    {
      name: 'product',
      type: 'reference',
      to: [{type: 'product'}],
    },
    {
      name: 'quantity',
      type: 'number',
    },
  ],
}