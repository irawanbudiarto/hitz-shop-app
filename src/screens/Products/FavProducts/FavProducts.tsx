import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { AppearanceColors, AppearanceFonts } from '@/theme/_config'
import { IconFavouriteActive } from '@/theme/Icons'
import { ILNotfound } from '@/theme/Illustrations'

import { Gap } from '@/components/atoms'
import { CustomStatusBar, EmptyView, Header } from '@/components/molecules'

import { removeItemFav } from '@/store/FavouriteSlice/FavouriteSlice'
import { RootState } from '@/store/store'

type RootStackParamList = {
  FavProducts: undefined
  ProductDetail: { productId: number }
}

type DetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'FavProducts'
>

const FavProductsScreen: React.FC = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<DetailScreenNavigationProp>()
  const favouriteItems = useSelector(
    (state: RootState) => state.favourite.items
  )

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={AppearanceColors.white}
        barStyle={'dark-content'}
      />
      <Header
        type="default"
        title={'Favourite'}
        favouriteCount={0}
        notificationCount={0}
        onBackPress={() => {
          navigation.goBack()
        }}
        onDetailSearch={() => {}}
        onDetailFavourite={() => {}}
        onOptionsPress={() => {
          //
        }}
      />
      <FlatList
        data={favouriteItems}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <EmptyView
            icon={<ILNotfound />}
            title="Your favorites list is empty."
            desc="Start adding what you love!"
            type="vertical"
            color={AppearanceColors.white}
          />
        }
        renderItem={({ item, index }) => {
          const handleRemoveFavourite = () => {
            Alert.alert(
              'Remove Favourite',
              `Are you sure you want to remove "${item.title}" from favourites?`,
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Yes, Remove',
                  style: 'destructive',
                  onPress: () => dispatch(removeItemFav(item.id)),
                },
              ]
            )
          }
          return (
            <>
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
                  <TouchableOpacity
                    style={styles.iconFav}
                    onPress={handleRemoveFavourite}
                  >
                    <IconFavouriteActive />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              {favouriteItems.length - 1 > index && (
                <View style={styles.line} />
              )}
            </>
          )
        }}
      />
    </View>
  )
}

export default FavProductsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppearanceColors.white,
  },
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
  iconFav: {
    maxWidth: 30,
    alignSelf: 'flex-end',
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  line: {
    height: 2,
    backgroundColor: AppearanceColors.text.secondary,
  },
})
