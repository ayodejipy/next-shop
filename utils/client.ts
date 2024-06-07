import sanityClient from "@sanity/client"
import imageUrlBuilder from '@sanity/image-url'

const client = sanityClient({
    projectId: '5pxcf7bw',
    dataset: 'production',
    apiVersion: "2021-10-21", // use current UTC date - see "specifying API version"!
    token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN, // or leave blank for unauthenticated usage
    useCdn: false, // `false` if you want to ensure fresh data
});

// generate image url from sanity images
const builder = imageUrlBuilder(client);

export const urlFor = (source: string) => builder.image(source);

export default client;