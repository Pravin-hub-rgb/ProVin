"use client"

import { useState } from "react"

interface Product {
  id: number
  name: string
  price: number
}

const products: Product[] = [
  { id: 1, name: "React Mug", price: 12 },
  { id: 2, name: "Dev Sticker Pack", price: 5 },
  { id: 3, name: "TypeScript Tote", price: 15 },
  { id: 4, name: "Node.js Cap", price: 10 },
]

export function ShoppingCartDemo() {
  const [cartItems, setCartItems] = useState<string[]>([])

  const handleAddToCart = (name: string) => {
    setCartItems((prev) => [...prev, name])
  }

  const handleRemoveFromCart = (name: string) => {
    setCartItems((prev) => prev.filter((item) => item !== name))
  }

  const totalItems = cartItems.length
  const totalPrice = cartItems.reduce((sum, item) => {
    const product = products.find((p) => p.name === item)
    return sum + (product?.price ?? 0)
  }, 0)

  return (
    <div className="border border-border rounded-xl p-5 bg-card shadow-soft dark:shadow-navy">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        🛒 Shopping Cart — Live Demo
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Products List */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
            Products
          </h4>
          <div className="space-y-2">
            {products.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-muted/30 border border-border/50"
              >
                <div>
                  <span className="text-sm font-medium text-foreground">{p.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">${p.price}</span>
                </div>
                <button
                  onClick={() => handleAddToCart(p.name)}
                  className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-md hover:opacity-90 transition-opacity"
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Summary */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
            Cart Summary
          </h4>
          <div className="bg-muted/30 border border-border/50 rounded-lg p-4">
            {cartItems.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">
                Cart is empty. Add products!
              </p>
            ) : (
              <>
                <div className="space-y-2 mb-4">
                  {cartItems.map((name, i) => (
                    <div
                      key={`${name}-${i}`}
                      className="flex items-center justify-between px-3 py-2 rounded-md bg-background border border-border/50"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-foreground">{name}</span>
                        {(() => {
                          const product = products.find((p) => p.name === name)
                          return (
                            <span className="text-xs text-muted-foreground">
                              ${product?.price}
                            </span>
                          )
                        })()}
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(name)}
                        className="text-xs text-muted-foreground hover:text-destructive transition-colors px-2 py-1 rounded hover:bg-destructive/10"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border/50 pt-3 mt-3">
                  <div className="flex items-center justify-between text-sm font-medium text-foreground mb-1">
                    <span>Items:</span>
                    <span>{totalItems}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-medium text-foreground">
                    <span>Total:</span>
                    <span className="text-primary">${totalPrice}</span>
                  </div>
                </div>

                {cartItems.length > 0 && (
                  <button
                    onClick={() => setCartItems([])}
                    className="w-full mt-3 px-3 py-2 text-xs font-medium text-destructive border border-destructive/30 rounded-md hover:bg-destructive/10 transition-colors"
                  >
                    Clear Cart
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}