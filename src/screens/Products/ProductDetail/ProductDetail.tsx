import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { useDispatch, useSelector } from 'react-redux'

import { AppearanceColors, AppearanceFonts } from '@/theme/_config'
import { IconFavourite, IconFavouriteActive } from '@/theme/Icons'

import { Gap } from '@/components/atoms'
import {
  Button,
  CarouselImage,
  CustomStatusBar,
  Header,
  ImageModalSwipe,
} from '@/components/molecules'

import { addItem } from '@/store/CartSlice/CartSlice'
import {
  addItemFav,
  removeItemFav,
} from '@/store/FavouriteSlice/FavouriteSlice'
import { RootState } from '@/store/store'

const { width: screenWidth } = Dimensions.get('window')

// Define your stack parameter list
type RootStackParamList = {
  ProductDetail: { productId: number }
  Cart: undefined
}

type ProductDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProductDetail'
>

type ProductDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductDetail'
>

interface Product {
  id: number
  title: string
  description: string
  price: number
  quantity: number
  thumbnail: string
  images: string[]
  // other item properties like price, image, etc.
}

const ProductDetailScreen: React.FC = () => {
  const route = useRoute<ProductDetailScreenRouteProp>()
  const navigation = useNavigation<ProductDetailScreenNavigationProp>()
  const { productId } = route.params
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [isVisible, setIsVisible] = useState(false)
  const favouriteItems = useSelector(
    (state: RootState) => state.favourite.items
  )
  const isFavourite = favouriteItems.some((item) => item.id === product?.id)

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${productId}`
        )
        const data = await response.json()
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProductData()
  }, [productId])

  const handleToggleFavourite = () => {
    if (isFavourite) {
      if (product) {
        dispatch(removeItemFav(product.id))
      }
    } else {
      if (product) {
        dispatch(addItemFav(product))
      }
    }
  }

  const handleOpenModal = () => {
    setIsVisible(true)
  }

  const handleCloseModal = () => {
    setIsVisible(false)
  }

  const handleAddToCart = (product: Product) => {
    dispatch(addItem(product))
  }

  const handleDetail = (url: string) => {
    handleOpenModal()
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <CustomStatusBar
          backgroundColor={AppearanceColors.white}
          barStyle={'dark-content'}
        />
        <Header
          type="productDetail"
          title={''}
          favouriteCount={favouriteItems?.length}
          notificationCount={totalItems}
          onBackPress={() => {
            navigation.goBack()
          }}
          onDetailSearch={() => {
            //
          }}
          onDetailFavourite={() => {
            //
          }}
          onOptionsPress={() => {
            //
          }}
        />
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            width={screenWidth}
            height={screenWidth / 2}
            borderRadius={8}
          />
        </SkeletonPlaceholder>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={AppearanceColors.white}
        barStyle={'dark-content'}
      />
      <Header
        type="productDetail"
        title={''}
        favouriteCount={totalItems}
        notificationCount={totalItems}
        onBackPress={() => {
          navigation.goBack()
        }}
        onDetailSearch={() => {
          //
        }}
        onDetailFavourite={() => {
          //
        }}
        onOptionsPress={() => {
          navigation.navigate('Cart')
        }}
      />
      <ScrollView style={styles.content}>
        {product ? (
          <>
            <CarouselImage data={product.images} onDetail={handleDetail} />
            <View style={styles.viewContent}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.textPrice}>${product.price}</Text>
                </View>
                <TouchableOpacity onPress={handleToggleFavourite}>
                  {isFavourite ? <IconFavouriteActive /> : <IconFavourite />}
                </TouchableOpacity>
              </View>
              <Gap height={10} />
              <Text style={styles.textTitle}>{product.title}</Text>
              <Gap height={10} />
              <Text style={styles.textDescription}>{product.description}</Text>
            </View>
            <ImageModalSwipe
              isVisibleImages={isVisible}
              setIsVisibleImages={setIsVisible}
              data={product?.images}
              initialIndex={0}
              onClose={handleCloseModal}
            />
          </>
        ) : (
          <Text style={styles.textTitle}>Product not found</Text>
        )}
      </ScrollView>

      <View
        style={{
          paddingBottom: Platform.OS == 'ios' ? 20 : 5,
          margin: 10,
          flexDirection: 'row',
        }}
      >
        <Button
          title="Buy"
          type="buy"
          onPress={() => {
            //
          }}
        />
        <Gap width={10} />
        <Button
          title="+ Add to cart"
          type="default"
          onPress={() => {
            if (product) {
              handleAddToCart(product)
            }
          }}
        />
      </View>
    </View>
  )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppearanceColors.white,
  },
  content: {
    flex: 1,
  },
  viewContent: {
    padding: 10,
  },
  textTitle: {
    fontFamily: AppearanceFonts.primary.bold,
    fontSize: 16,
    color: AppearanceColors.text.primary,
  },
  textPrice: {
    fontFamily: AppearanceFonts.primary.bold,
    fontSize: 16,
    color: AppearanceColors.text.primary,
  },
  textDescription: {
    fontFamily: AppearanceFonts.primary.normal,
    fontSize: 14,
    color: AppearanceColors.text.primary,
  },
  productId: {
    fontFamily: AppearanceFonts.primary.normal,
    fontSize: 14,
    color: AppearanceColors.text.primary,
  },
})
