
import Sidebar from '@/components/Sidebar'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Voyage',
  description: 'Fly Easy, Fly Smart: Your Journey, Our Priority',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
    
        {children}</body>
    </html>
  )
}
