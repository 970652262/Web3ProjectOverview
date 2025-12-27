import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Web3 项目导航',
  description: 'Dryvin Web3 项目展示平台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  )
}
