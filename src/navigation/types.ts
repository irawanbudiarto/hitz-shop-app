import type { StackScreenProps } from '@react-navigation/stack'

import { Paths } from './paths'

export type RootStackParamList = {
  [Paths.Startup]: undefined
  [Paths.Initial]: undefined
  [Paths.Home]: undefined
  [Paths.Main]: undefined
  [Paths.Profile]: undefined
  [Paths.ProductDetail]: undefined
  [Paths.Cart]: undefined
  [Paths.FavProducts]: undefined
  [Paths.SearchProducts]: undefined
}

export type RootScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList
> = StackScreenProps<RootStackParamList, S>
