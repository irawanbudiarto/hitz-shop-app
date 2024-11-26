import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { AppearanceColors, AppearanceFonts } from '@/theme/_config'
import { IconArrowLeft } from '@/theme/Icons'

import HeaderHome from './HeaderHome'
import HeaderProductDetail from './HeaderProductDetail'
import HeaderCart from './HeaderCart'

interface HeaderContentProps {
  type: 'default' | 'productDetail' | 'homescreen' | 'cart'
  title: string
  favouriteCount: number
  notificationCount: number
  onBackPress: () => void
  onDetailSearch: () => void
  onDetailFavourite: () => void
  onOptionsPress: () => void
}

const HeaderContent: React.FC<HeaderContentProps> = ({
  type,
  title,
  notificationCount,
  favouriteCount,
  onBackPress,
  onDetailSearch,
  onDetailFavourite,
  onOptionsPress,
}) => {
  if (type == 'homescreen') {
    return (
      <View>
        <HeaderHome
          productName={title}
          onBackPress={onBackPress}
          onDetailSearch={onDetailSearch}
          onDetailFavourite={onDetailFavourite}
          onOptionsPress={onOptionsPress}
          notificationCount={notificationCount}
          favouriteCount={favouriteCount}
        />
      </View>
    )
  }
  if (type == 'productDetail') {
    return (
      <View>
        <HeaderProductDetail
          productName={title}
          onBackPress={onBackPress}
          onOptionsPress={onOptionsPress}
          notificationCount={notificationCount}
        />
      </View>
    )
  }
  if (type == 'cart') {
    return (
      <View>
        <HeaderCart
          productName={title}
          onBackPress={onBackPress}
          onOptionsPress={onOptionsPress}
          onDetailFavourite={onDetailFavourite}
          favouriteCount={favouriteCount}
        />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ paddingLeft: 10, paddingRight: 20 }}
        onPress={onBackPress}
      >
        <IconArrowLeft />
      </TouchableOpacity>
      <View>
        <Text style={styles.textTitle}>{title}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 5,
    backgroundColor: AppearanceColors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitle: {
    fontFamily: AppearanceFonts.primary.bold,
    fontSize: 18,
    color: AppearanceColors.text.primary,
  },
  iconsContainer: {
    paddingRight: 10,
    flexDirection: 'row',
  },
  notificationBadge: {
    position: 'absolute',
    bottom: 15,
    right: 10,
    backgroundColor: 'red',
    paddingHorizontal: 1,
    borderRadius: 10,
  },
  notificationText: {
    fontFamily: AppearanceFonts.primary.bold,
    fontSize: 12,
    color: AppearanceColors.white,
  },
})

export default HeaderContent
