import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useCallback, useState } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { AppearanceColors, AppearanceFonts } from '@/theme/_config'
import { IconArrowLeft, IconClear } from '@/theme/Icons'
import { ILNotfound } from '@/theme/Illustrations'

import { Gap } from '@/components/atoms'
import { CustomStatusBar, EmptyView } from '@/components/molecules'

import Satellite from '@/utils/Satellite'

type RootStackParamList = {
  SearchProducts: { initialSearchText?: string }
  ProductDetail: { productId: number }
}

type DetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SearchProducts'
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

const SearchProductsScreen: React.FC = () => {
  const navigation = useNavigation<DetailScreenNavigationProp>()
  const [searchText, setSearchText] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchDataSearch = useCallback(
    async (query: string, pageNumber: number = 1) => {
      if (!hasMore && pageNumber > 1) return

      setLoading(true)
      try {
        const response = await Satellite.get(
          `https://dummyjson.com/products/search?q=${query}&limit=10&skip=${
            (pageNumber - 1) * 10
          }`
        )
        const searchResults = response.data.products || []

        if (pageNumber === 1) {
          setProducts(searchResults)
        } else {
          setProducts((prevProducts) => [...prevProducts, ...searchResults])
        }

        // Jika jumlah hasil kurang dari limit, hentikan pagination
        setHasMore(searchResults.length >= 10)
      } catch (error) {
        console.error('Error fetching search results:', error)
      } finally {
        setLoading(false)
      }
    },
    [hasMore]
  )

  const handleChangeText = (text: string) => {
    setSearchText(text)
  }

  const handleSearch = () => {
    if (searchText.trim()) {
      setPage(1)
      setHasMore(true)
      fetchDataSearch(searchText, 1)
    }
  }

  const handleClear = () => {
    setSearchText('')
    setProducts([])
    setPage(1)
    setHasMore(true)
  }

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchDataSearch(searchText, nextPage)
    }
  }

  const renderProduct = ({ item, index }: { item: Product; index: number }) => (
    <>
      <TouchableOpacity
        key={item.id}
        activeOpacity={0.7}
        style={styles.item}
        onPress={() => {
          navigation.push('ProductDetail', { productId: item.id })
        }}
      >
        <Image source={{ uri: item.thumbnail }} style={styles.imageThumbnail} />
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
      {products.length - 1 > index && <View style={styles.line} />}
    </>
  )

  const renderFooter = () => {
    if (!loading) return null
    return <ActivityIndicator style={{ marginVertical: 10 }} />
  }

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={AppearanceColors.white}
        barStyle={'dark-content'}
      />
      <View style={styles.searchBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        >
          <IconArrowLeft />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <TextInput
            selectionColor={AppearanceColors.primary}
            onChangeText={handleChangeText}
            onSubmitEditing={handleSearch}
            value={searchText}
            placeholder="Search"
            autoFocus={true}
            style={styles.inputStyle}
          />
          {searchText.length >= 1 && (
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <IconClear />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.resultContainer}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProduct}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={
            searchText.trim() && !loading ? (
              <EmptyView
                icon={<ILNotfound />}
                title="No results found."
                desc="Try searching for something else!"
                type="vertical"
                color={AppearanceColors.white}
              />
            ) : null
          }
        />
      </View>
    </View>
  )
}

export default SearchProductsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppearanceColors.white,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: AppearanceColors.border,
    borderBottomWidth: 1,
    paddingTop: Platform.OS == 'ios' ? 20 : 10,
  },
  iconButton: {
    padding: 10,
  },
  inputStyle: {
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    fontSize: 16,
    color: AppearanceColors.text.primary,
  },
  clearButton: {
    position: 'absolute',
    right: 5,
    bottom: 10,
  },
  resultContainer: {
    flex: 1,
  },
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: AppearanceColors.border,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    color: AppearanceColors.text.secondary,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: AppearanceColors.text.secondary,
  },
  //item
  viewContent: { maxWidth: Dimensions.get('screen').width / 1.7 },
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
  line: {
    height: 0.5,
    backgroundColor: AppearanceColors.text.secondary,
  },
})
