import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { AppearanceColors, AppearanceFonts } from '@/theme/_config'
import { IconArrowLeft, IconFavourite } from '@/theme/Icons'

interface HeaderCartProps {
  productName: string
  favouriteCount: number
  onBackPress: () => void
  onDetailFavourite: () => void
  onOptionsPress: () => void
}

const HeaderCart: React.FC<HeaderCartProps> = ({
  productName,
  onBackPress,
  favouriteCount,
  onDetailFavourite,
  onOptionsPress
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress}>
        <IconArrowLeft />
      </TouchableOpacity>
      <Text style={styles.productName}>{productName}</Text>
      <TouchableOpacity onPress={onDetailFavourite}>
        <IconFavourite />
        {favouriteCount > 0 && (
          <View
            style={[
              styles.notificationBadge,
              favouriteCount > 99 && styles.largeBadge,
            ]}
          >
            <Text style={styles.notificationText}>
              {favouriteCount > 99 ? '99+' : favouriteCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    paddingTop: 20,
    backgroundColor: AppearanceColors.white,
  },
  productName: {
    flex: 1,
    fontFamily: AppearanceFonts.primary.bold,
    fontSize: 18,
    color: AppearanceColors.white,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  notificationBadge: {
    position: 'absolute',
    bottom: 15,
    right: 10,
    backgroundColor: 'red',
    width: 15,
    height: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeBadge: {
    width: 27,
    borderRadius: 15,
    paddingHorizontal: 5,
  },
  notificationText: {
    fontFamily: AppearanceFonts.primary.bold,
    fontSize: 10,
    color: AppearanceColors.white,
    textAlign: 'center',
  },
})

export default HeaderCart
