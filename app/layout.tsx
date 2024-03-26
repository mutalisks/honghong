import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "HongHong",
  description:
    "HongHong Japanese Version"
}

export default function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest"></link>
      <meta
        name="description"
        content="HongHong Japanese Version"
      />
      <meta
        property="og:description"
        content="HongHong Japanese Version"
      />
      <meta property="og:title" content="HongHong Japanese Version" />
      
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}