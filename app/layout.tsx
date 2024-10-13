import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ShoppingCart, User, Search } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Amazon Clone',
  description: 'An Amazon-like e-commerce platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-gray-900 text-white py-4">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold">Amazon Clone</Link>
                <div className="flex-grow mx-4 max-w-xl">
                  <form className="flex">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      className="w-full rounded-l-md"
                    />
                    <Button type="submit" className="rounded-l-none">
                      <Search className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
                <nav className="flex items-center space-x-4">
                  <Link href="/cart">
                    <Button variant="ghost" className="relative">
                      <ShoppingCart className="h-6 w-6" />
                      <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2">0</span>
                    </Button>
                  </Link>
                  <Link href="/account">
                    <Button variant="ghost">
                      <User className="h-6 w-6 mr-2" />
                      Account
                    </Button>
                  </Link>
                </nav>
              </div>
            </div>
          </header>

          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>

          <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Get to Know Us</h3>
                  <ul className="space-y-2">
                    <li><Link href="#" className="hover:underline">Careers</Link></li>
                    <li><Link href="#" className="hover:underline">About Us</Link></li>
                    <li><Link href="#" className="hover:underline">Investor Relations</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Make Money with Us</h3>
                  <ul className="space-y-2">
                    <li><Link href="#" className="hover:underline">Sell products on Amazon</Link></li>
                    <li><Link href="#" className="hover:underline">Become an Affiliate</Link></li>
                    <li><Link href="#" className="hover:underline">Advertise Your Products</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Amazon Payment Products</h3>
                  <ul className="space-y-2">
                    <li><Link href="#" className="hover:underline">Amazon Rewards Visa Signature Cards</Link></li>
                    <li><Link href="#" className="hover:underline">Amazon.com Store Card</Link></li>
                    <li><Link href="#" className="hover:underline">Amazon Business Card</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Let Us Help You</h3>
                  <ul className="space-y-2">
                    <li><Link href="#" className="hover:underline">Your Account</Link></li>
                    <li><Link href="#" className="hover:underline">Your Orders</Link></li>
                    <li><Link href="#" className="hover:underline">Shipping Rates & Policies</Link></li>
                    <li><Link href="#" className="hover:underline">Returns & Replacements</Link></li>
                    <li><Link href="#" className="hover:underline">Help</Link></li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 text-center">
                <p>&copy; {new Date().getFullYear()} Amazon Clone. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
