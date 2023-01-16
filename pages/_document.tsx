import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="h-full bg-white">
      <Head />
      <body className="h-full overflow-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
