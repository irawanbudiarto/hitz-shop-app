import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Product = {
  thumbnail: string | undefined
  id: number
  title: string
  description: string
  price: number
  quantity: number
}

type FavouriteState = {
  items: Product[]
}

const initialState: FavouriteState = {
  items: [],
}

const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addItemFav: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      )
      if (!existingItem) {
        state.items.push(action.payload) // Tambahkan item jika belum ada
      }
    },
    removeItemFav: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload) // Hapus item berdasarkan ID
    },
  },
})

export const { addItemFav, removeItemFav } = favouriteSlice.actions
export default favouriteSlice.reducer
