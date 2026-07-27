"use client"

import { useState, useReducer } from "react"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
}

const products: Product[] = [
  { id: 1, name: "Wireless Headphones", price: 2499, image: "https://picsum.photos/id/1/400/400", category: "electronics" },
  { id: 2, name: "Cotton T-Shirt", price: 799, image: "https://picsum.photos/id/20/400/400", category: "clothing" },
  { id: 3, name: "Running Shoes", price: 3999, image: "https://picsum.photos/id/30/400/400", category: "footwear" },
]

interface CartItem {
  productId: number
  name: string
  price: number
  image: string
  quantity: number
}

type Page = "store" | "detail" | "checkout" | "confirmed"

function Total({ items }: { items: CartItem[] }) {
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)
  return <>{total}</>
}

export function EcommerceDemo() {
  const [page, setPage] = useState<Page>("store")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cart, dispatch] = useReducer(
    (state: CartItem[], action: any) => {
      switch (action.type) {
        case "ADD": {
          const existing = state.find(i => i.productId === action.product.id)
          if (existing) return state.map(i =>
            i.productId === action.product.id ? { ...i, quantity: i.quantity + 1 } : i
          )
          return [...state, { ...action.product, productId: action.product.id, quantity: 1 }]
        }
        case "REMOVE": return state.filter(i => i.productId !== action.productId)
        case "UPDATE_QTY": return state.map(i =>
          i.productId === action.productId ? { ...i, quantity: action.quantity } : i
        )
        case "PLACE_ORDER": return []
        default: return state
      }
    },
    []
  )

  const totalPrice = cart.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <div className="border border-border rounded-xl bg-card shadow-soft dark:shadow-navy overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
        <button
          onClick={() => { setPage("store"); setSelectedProduct(null) }}
          className="text-base font-bold text-foreground hover:text-primary transition-colors"
        >
          E-Commerce Store
        </button>
        <button
          onClick={() => setPage(page === "checkout" ? "store" : "checkout")}
          className="relative text-sm px-3 py-1.5 rounded-md border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors text-foreground"
        >
          Cart ({cart.length})
        </button>
      </div>

      <div className="p-5">
        {page === "store" && (
          <>
            {/* Store notice */}
            <div className="text-sm text-muted-foreground italic mb-5 bg-muted/20 rounded-lg px-4 py-2.5 border border-border/30">
              🏪 Click any product to see details. Add to cart from there, or use the cart button above.
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => { setSelectedProduct(product); setPage("detail") }}
                  className="group cursor-pointer rounded-lg border border-border/60 hover:border-border hover:shadow-md transition-all bg-background"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{product.category}</p>
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{product.name}</h3>
                    <p className="text-base font-bold text-green-600 dark:text-green-400 mt-1">₹{product.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Sidebar Toggle */}
            {cart.length > 0 && (
              <div className="mt-6 rounded-lg border border-border/50 bg-muted/20 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground font-medium">Cart Summary</span>
                  <span className="text-sm text-muted-foreground">{cart.length} items — <span className="font-bold text-foreground">₹<Total items={cart} /></span></span>
                </div>
                <div className="mt-3 space-y-2">
                  {cart.map(item => (
                    <div key={item.productId} className="flex items-center justify-between text-sm bg-background rounded-md px-3 py-2 border border-border/30">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-8 h-8 rounded object-cover" />
                        <span className="text-foreground">{item.name} × {item.quantity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">₹{item.price * item.quantity}</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); dispatch({ type: "REMOVE", productId: item.productId }) }}
                          className="text-xs text-muted-foreground hover:text-destructive px-1.5 py-0.5 rounded hover:bg-destructive/10"
                        >✕</button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setPage("checkout")}
                  className="mt-3 w-full py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </>
        )}

        {page === "detail" && selectedProduct && (
          <div>
            <button
              onClick={() => { setPage("store"); setSelectedProduct(null) }}
              className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block transition-colors"
            >
              &larr; Back to Store
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full rounded-lg" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{selectedProduct.category}</p>
                <h2 className="text-xl font-bold text-foreground mt-1">{selectedProduct.name}</h2>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-4">₹{selectedProduct.price}</p>
                <button
                  onClick={() => { dispatch({ type: "ADD", product: selectedProduct }); setPage("store") }}
                  className="mt-6 w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {page === "checkout" && (
          <CheckoutForm
            cart={cart}
            totalPrice={totalPrice}
            onPlaceOrder={() => dispatch({ type: "PLACE_ORDER" })}
            onConfirm={() => setPage("confirmed")}
            onBack={() => setPage("store")}
          />
        )}

        {page === "confirmed" && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">&#10003;</div>
            <h2 className="text-xl font-bold text-foreground mb-2">Order Confirmed!</h2>
            <p className="text-sm text-muted-foreground mb-6">Your order has been placed successfully.</p>
            <button
              onClick={() => setPage("store")}
              className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:opacity-90 transition-opacity"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function CheckoutForm({
  cart, totalPrice, onPlaceOrder, onConfirm, onBack,
}: {
  cart: CartItem[]
  totalPrice: number
  onPlaceOrder: () => void
  onConfirm: () => void
  onBack: () => void
}) {
  const [form, setForm] = useState({ name: "", email: "", address: "", pincode: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = "Name required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email"
    if (!form.address.trim()) errs.address = "Address required"
    if (!/^\d{6}$/.test(form.pincode)) errs.pincode = "Enter 6-digit pincode"
    return errs
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      onPlaceOrder()
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">&#10003;</div>
        <h2 className="text-lg font-bold text-foreground mb-2">Order Placed!</h2>
        <p className="text-sm text-muted-foreground mb-4">Check console for order details.</p>
        <button
          onClick={() => { onConfirm(); setSubmitted(false) }}
          className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors"
        >
          View Confirmation
        </button>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-8 text-sm text-muted-foreground">
        Cart is empty.{' '}
        <button onClick={onBack} className="text-primary underline">Continue Shopping</button>
      </div>
    )
  }

  return (
    <div>
      <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block transition-colors">
        &larr; Back to Store
      </button>
      <h2 className="text-lg font-bold text-foreground mb-6">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-5 max-w-md" noValidate>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
          <input
            value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 rounded-md border border-border/60 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Email</label>
          <input
            value={form.email} onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 rounded-md border border-border/60 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Address</label>
          <textarea
            rows={3}
            value={form.address} onChange={e => setForm(prev => ({ ...prev, address: e.target.value }))}
            className="w-full px-3 py-2 rounded-md border border-border/60 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Pincode</label>
          <input
            value={form.pincode} onChange={e => setForm(prev => ({ ...prev, pincode: e.target.value }))}
            maxLength={6}
            className="w-full px-3 py-2 rounded-md border border-border/60 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>}
        </div>
        <div className="border-t border-border/50 pt-4">
          <div className="flex justify-between text-sm font-medium text-foreground mb-4">
            <span>Total</span>
            <span className="text-green-600 dark:text-green-400 font-bold">₹{totalPrice}</span>
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  )
}
