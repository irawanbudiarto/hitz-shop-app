import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

import { AppearanceColors, AppearanceFonts } from '@/theme/_config'
import { ILNotfound } from '@/theme/Illustrations'

import { Gap } from '@/components/atoms'
import { EmptyView } from '@/components/molecules'

import Satellite from '@/utils/Satellite'

const { width } = Dimensions.get('screen')
// Define your stack parameter list
type RootStackParamList = {
  ProductList: { category: string } // Adjust the name if different
  ProductDetail: { productId: number } // Example of another route
}

// Type for navigation prop
type ProductListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductList'
>

interface Product {
  id: number
  title: string
  thumbnail: string
  description: string
  price: string
}

const fetchProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  try {
    const response = await Satellite.get(`/products/category/${category}`)
    const productsData = await response.data
    return productsData.products
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return []
  }
}

const ProductList: React.FC<{ category: string }> = ({ category }) => {
  const navigation = useNavigation<ProductListScreenNavigationProp>()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProductsByCategory(category)
      setProducts(fetchedProducts)
      setLoading(false)
    }
    getProducts()
  }, [category])

  if (loading) {
    return (
      <SkeletonPlaceholder>
        <View style={styles.skeletonContainer}>
          <View style={styles.skeletonImage} />
          <View style={styles.skeletonTextContainer}>
            <View style={styles.skeletonTitle} />
            <Gap height={5} />
            <View style={styles.skeletonDescription} />
            <Gap height={5} />
            <View style={styles.skeletonPrice} />
          </View>
        </View>
      </SkeletonPlaceholder>
    )
  }

  return (
    <FlatList
      data={products}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={
        <EmptyView
          icon={<ILNotfound />}
          title="No products here yet."
          desc="Stay tuned for updates!"
          type="vertical"
          color={AppearanceColors.white}
        />
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.7}
          style={styles.item}
          onPress={() => {
            navigation.push('ProductDetail', { productId: item.id })
          }}
        >
          <Image
            source={{ uri: item.thumbnail }}
            style={styles.imageThumbnail}
          />
          <Gap width={10} />
          <View>
            <View style={styles.viewContent}>
              <Text numberOfLines={2} style={styles.title}>
                {item.title}
              </Text>
            </View>
            <Gap height={5} />
            <View style={styles.viewContent}>
              <Text numberOfLines={2} style={styles.description}>
                {item.description}
              </Text>
            </View>
            <Gap height={5} />
            <View style={styles.viewContent}>
              <Text numberOfLines={2} style={styles.price}>
                ${item.price}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  )
}

export default ProductList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: AppearanceColors.white,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  viewContent: { maxWidth: Dimensions.get('screen').width / 1.6 },
  item: {
    backgroundColor: AppearanceColors.white,
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    marginBottom: 5,
  },
  imageThumbnail: {
    width: 100,
    height: 100,
    backgroundColor: AppearanceColors.white,
    borderRadius: 10,
  },
  title: {
    color: AppearanceColors.text.primary,
    fontFamily: AppearanceFonts.primary.bold,
    fontSize: 14,
  },
  description: {
    color: AppearanceColors.text.subTitle,
    fontFamily: AppearanceFonts.primary.normal,
    fontSize: 14,
  },
  price: {
    color: AppearanceColors.text.subTitle,
    fontFamily: AppearanceFonts.primary.bold,
    fontSize: 16,
  },
  //skeleton
  skeletonContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  skeletonImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  skeletonTextContainer: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'space-around',
  },
  skeletonTitle: {
    width: width / 2,
    height: 20,
    borderRadius: 4,
  },
  skeletonDescription: {
    width: width / 1.6,
    height: 14,
    borderRadius: 4,
  },
  skeletonPrice: {
    width: 80,
    height: 14,
    borderRadius: 4,
  },
})
