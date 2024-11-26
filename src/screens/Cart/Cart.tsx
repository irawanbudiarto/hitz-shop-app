import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import {
  Alert,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { AppearanceColors, AppearanceFonts } from '@/theme/_config'
import {
  IconAdd,
  IconFavourite,
  IconFavouriteActive,
  IconMin,
  IconTrash,
} from '@/theme/Icons'
import { ILNotfound } from '@/theme/Illustrations'

import { Gap } from '@/components/atoms'
import {
  Button,
  CustomStatusBar,
  EmptyView,
  Header,
} from '@/components/molecules'

import { addItem, removeItem } from '@/store/CartSlice/CartSlice'
import {
  addItemFav,
  removeItemFav,
} from '@/store/FavouriteSlice/FavouriteSlice'
import { RootState } from '@/store/store'

type RootStackParamList = {
  Cart: undefined
  FavProducts: undefined
}

type ProductDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Cart'
>

interface Product {
  thumbnail: string | undefined
  id: number
  title: string
  description: string
  price: number
  quantity: number
}

const CartScreen = () => {
  const navigation = useNavigation<ProductDetailScreenNavigationProp>()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const dispatch = useDispatch()
  const favouriteItems = useSelector(
    (state: RootState) => state.favourite.items
  )
  //   const isFavourite = cartItems.some((cartItem) =>
  //     favouriteItems.some((favItem) => favItem.id === cartItem.id)
  //   )

  //   console.log('isFavourite', isFavourite)

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeItem(id))
  }

  const handleAddToCart = (item: Product) => {
    dispatch(addItem(item))
  }

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={AppearanceColors.white}
        barStyle={'dark-content'}
      />
      <Header
        type="cart"
        title={'Cart'}
        favouriteCount={favouriteItems?.length}
        notificationCount={0}
        onBackPress={() => {
          navigation.goBack()
        }}
        onDetailSearch={() => {}}
        onDetailFavourite={() => {
          navigation.navigate('FavProducts')
        }}
        onOptionsPress={() => {
          //
        }}
      />
      <View style={{ flex: 1 }}>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <EmptyView
              icon={<ILNotfound />}
              title="Oops! Looks like your cart is lonely."
              desc="Add some items to it!"
              type="vertical"
              color={AppearanceColors.white}
            />
          }
          renderItem={({ item, index }) => {
            const isFavourite = favouriteItems.some(
              (fav) => fav.id === item?.id
            )
            const handleRemoveFavourite = () => {
              Alert.alert(
                'Remove Product',
                `Are you sure you want to remove "${item.title}" from Cart?`,
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'Yes, Remove',
                    style: 'destructive',
                    onPress: () => handleRemoveFromCart(item.id),
                  },
                ]
              )
            }
            const handleToggleFavourite = () => {
              if (isFavourite) {
                dispatch(removeItemFav(item.id))
              } else {
                dispatch(addItemFav(item))
              }
            }
            return (
              <View>
                <View style={styles.viewContent}>
                  <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.image}
                  />
                  <Gap width={10} />
                  <View>
                    <Text style={styles.textTitle}>{item.title}</Text>
                    <Gap height={5} />
                    <Text style={styles.textPrice}>${item.price}</Text>
                    <Gap height={5} />
                    <TouchableOpacity onPress={handleToggleFavourite}>
                      {isFavourite ? (
                        <IconFavouriteActive />
                      ) : (
                        <IconFavourite />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.viewQuantity}>
                  {item.quantity == 1 ? (
                    <TouchableOpacity onPress={handleRemoveFavourite}>
                      <IconTrash />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => handleRemoveFromCart(item.id)}
                    >
                      <IconMin />
                    </TouchableOpacity>
                  )}
                  <Gap width={20} />
                  <Text>{item.quantity}</Text>
                  <Gap width={20} />
                  <TouchableOpacity
                    onPress={() => {
                      if (item) {
                        handleAddToCart(item)
                      }
                    }}
                  >
                    <IconAdd />
                  </TouchableOpacity>
                </View>
                {cartItems.length - 1 > index && <View style={styles.line} />}
              </View>
            )
          }}
        />
      </View>
      <View style={styles.stickyButtonContainer}>
        {cartItems?.length > 0 ? (
          <Button title="Buy" type="default" onPress={() => {}} />
        ) : (
          <Button title="Buy" type="disable" />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppearanceColors.white,
    flex: 1,
  },
  stickyButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    marginBottom: Platform.OS == 'ios' ? 20 : 5,
    backgroundColor: AppearanceColors.white,
    zIndex: 10,
  },
  viewContent: {
    flexDirection: 'row',
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  textTitle: {
    fontFamily: AppearanceFonts.primary.normal,
    fontSize: 14,
    color: AppearanceColors.border400,
  },
  textPrice: {
    fontFamily: AppearanceFonts.primary.bold,
    fontSize: 14,
    color: AppearanceColors.text.primary,
  },
  viewQuantity: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 5,
    borderWidth: 0.7,
    borderColor: AppearanceColors.border,
    margin: 10,
    marginTop: -30,
    maxWidth: 100,
    right: 0,
    alignSelf: 'flex-end',
    flexWrap: 'wrap',
    borderRadius: 5,
  },
  line: {
    height: 2,
    backgroundColor: AppearanceColors.text.secondary,
  },
})

export default CartScreen
