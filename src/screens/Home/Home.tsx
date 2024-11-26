import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { TabBar, TabView } from 'react-native-tab-view'
import { useSelector } from 'react-redux'

import { AppearanceColors, AppearanceFonts } from '@/theme/_config'

import { Gap } from '@/components/atoms'
import { CustomStatusBar, Header } from '@/components/molecules'

import ProductList from '@/components/@screen/ProductList/ProductList'
import { RootState } from '@/store/store'
import Satellite from '@/utils/Satellite'

const { width } = Dimensions.get('screen')

type RootStackParamList = {
  Cart: undefined
  SearchProducts: undefined
  FavProducts: undefined
}

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cart'>

interface Route {
  key: string
  title: string
}

const fetchCategories = async (): Promise<string[]> => {
  const response = await Satellite.get(`/products/category-list`)
  const categories = await response.data
  return categories
}

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>()
  const [categories, setCategories] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const [routes, setRoutes] = useState<Route[]>([])
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
  const favouriteItems = useSelector(
    (state: RootState) => state.favourite.items
  )

  useEffect(() => {
    // Capitalize title categories
    const capitalizeFirstLetter = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1)

    const loadCategories = async () => {
      const categoryList = await fetchCategories()
      const formattedCategories = categoryList.map(capitalizeFirstLetter)
      setCategories(formattedCategories)
      setRoutes(
        formattedCategories.map((category, idx) => ({
          key: idx.toString(),
          title: category,
        }))
      )
    }
    loadCategories()
  }, [])

  const renderScene = ({ route }: { route: Route }) => {
    return <ProductList category={categories[parseInt(route.key, 10)]} />
  }

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={{ backgroundColor: AppearanceColors.primary }}
      style={{ backgroundColor: AppearanceColors.white }}
      activeColor={AppearanceColors.primary}
      inactiveColor={AppearanceColors.border}
      tabStyle={{
        width: 'auto', // Adjusts width of each tab to its content
        marginHorizontal: 10, // Adds spacing between tabs,
        paddingBottom: -20,
      }}
      contentContainerStyle={{
        paddingHorizontal: 10, // Adds padding to the container of the tabs
      }}
    />
  )

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={AppearanceColors.white}
        barStyle={'dark-content'}
      />
      {categories.length === 0 ? (
        <>
          <Header
            type="homescreen"
            title={''}
            favouriteCount={favouriteItems?.length}
            notificationCount={totalItems}
            onBackPress={() => {
              // navigation.goBack()
            }}
            onDetailFavourite={() => {
              //
            }}
            onDetailSearch={() => {
              //
            }}
            onOptionsPress={() => {
              navigation.navigate('Cart')
            }}
          />
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
        </>
      ) : (
        <>
          <Header
            type="homescreen"
            title={''}
            favouriteCount={favouriteItems?.length}
            notificationCount={totalItems}
            onBackPress={() => {
              // navigation.goBack()
            }}
            onDetailSearch={() => {
              navigation.navigate('SearchProducts')
            }}
            onDetailFavourite={() => {
              navigation.navigate('FavProducts')
            }}
            onOptionsPress={() => {
              navigation.navigate('Cart')
            }}
          />
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            swipeEnabled
            initialLayout={{ width: Dimensions.get('window').width }}
            renderTabBar={renderTabBar}
          />
        </>
      )}
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: AppearanceColors.white,
  },
  viewContent: {
    backgroundColor: AppearanceColors.white,
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWording: {
    fontSize: 18,
    fontFamily: AppearanceFonts.primary.bold,
    color: AppearanceColors.text.primary,
  },
  textWordingBlue: {
    fontSize: 18,
    fontFamily: AppearanceFonts.primary.bold,
    color: AppearanceColors.text.menuActive,
  },
  //product
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  item: {
    backgroundColor: AppearanceColors.white,
    flexDirection: 'row',
    // marginHorizontal: 10,
    // marginTop: 10,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    marginBottom: 5,
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
