'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import Image from 'next/image'

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
  }

  const products = [
    { id: 1, name: 'Wireless Earbuds', price: 79.99, rating: 4.5, image: '/placeholder.svg?height=200&width=200' },
    { id: 2, name: 'Smart Watch', price: 199.99, rating: 4.2, image: '/placeholder.svg?height=200&width=200' },
    { id: 3, name: 'Laptop', price: 999.99, rating: 4.8, image: '/placeholder.svg?height=200&width=200' },
    { id: 4, name: 'Smartphone', price: 699.99, rating: 4.6, image: '/placeholder.svg?height=200&width=200' },
    { id: 5, name: 'Gaming Console', price: 499.99, rating: 4.7, image: '/placeholder.svg?height=200&width=200' },
    { id: 6, name: 'Bluetooth Speaker', price: 89.99, rating: 4.3, image: '/placeholder.svg?height=200&width=200' },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Amazon Clone</h1>
          <form onSubmit={handleSearch} className="flex-grow mx-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded text-black"
              />
              <Button type="submit" className="absolute right-0 top-0 bottom-0">
                <Icons.search className="h-4 w-4" />
              </Button>
            </div>
          </form>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">
              <Icons.shoppingCart className="h-6 w-6" />
            </Button>
            <Button onClick={() => signOut()} variant="ghost">
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto mt-8 px-4">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Deals of the Day</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    width={500} 
                    height={300} 
                    layout="responsive" 
                    className="w-full h-auto"
                  />
                  <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Icons.star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">All Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    width={500} 
                    height={300} 
                    layout="responsive" 
                    className="w-full h-auto"
                  />
                  <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Icons.star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 text-white mt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Contact Us</a></li>
                <li><a href="#" className="hover:underline">Returns & Replacements</a></li>
                <li><a href="#" className="hover:underline">Shipping Rates & Policies</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Your Account</a></li>
                <li><a href="#" className="hover:underline">Your Orders</a></li>
                <li><a href="#" className="hover:underline">Wish List</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">About Amazon Clone</a></li>
                <li><a href="#" className="hover:underline">Investor Relations</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 Amazon Clone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
