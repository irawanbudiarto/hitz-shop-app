// CartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Product = {
  thumbnail: string | undefined
  id: number
  title: string
  description: string
  price: number
  quantity: number
}

type CartState = {
  items: Product[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload)
      if (itemIndex !== -1) {
        if (state.items[itemIndex].quantity > 1) {
          state.items[itemIndex].quantity -= 1
        } else {
          state.items.splice(itemIndex, 1)
        }
      }
    },
  },
})

export const { addItem, removeItem } = cartSlice.actions
export default cartSlice.reducer
