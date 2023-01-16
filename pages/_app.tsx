import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import GeneralLayout from '@/layouts/general'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GeneralLayout>
      <Component {...pageProps} />
    </GeneralLayout>
  )
}
