import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { AppearanceColors, AppearanceFonts } from '@/theme/_config'
import { IconFavourite, IconSearch, IconShoppingBag } from '@/theme/Icons'

import { Gap } from '@/components/atoms'

interface HeaderHomeProps {
  productName: string
  notificationCount: number
  favouriteCount: number
  onBackPress: () => void
  onDetailSearch: () => void
  onDetailFavourite: () => void
  onOptionsPress: () => void
}

const HeaderHome: React.FC<HeaderHomeProps> = ({
  notificationCount,
  favouriteCount,
  onDetailSearch,
  onDetailFavourite,
  onOptionsPress,
}) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: AppearanceFonts.primary.normal,
          fontSize: 14,
          color: AppearanceColors.white,
          backgroundColor: AppearanceColors.primary,
          padding: 10,
          paddingRight: 20,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        Good Evening,{' '}
        <Text
          style={{
            fontFamily: AppearanceFonts.primary.bold,
            fontSize: 16,
            color: AppearanceColors.white,
          }}
        >
          Iera.
        </Text>
      </Text>
      <View style={styles.containerRightIcon}>
        <TouchableOpacity onPress={onDetailSearch}>
          <IconSearch />
        </TouchableOpacity>
        <Gap width={10} />
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
        <Gap width={10} />
        <TouchableOpacity onPress={onOptionsPress}>
          <IconShoppingBag />
          {notificationCount > 0 && (
            <View
              style={[
                styles.notificationBadge,
                notificationCount > 99 && styles.largeBadge,
              ]}
            >
              <Text style={styles.notificationText}>
                {notificationCount > 99 ? '99+' : notificationCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: AppearanceColors.white,
    paddingTop: 20,
    paddingRight: 10,
  },
  containerRightIcon: {
    flexDirection: 'row',
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

export default HeaderHome
