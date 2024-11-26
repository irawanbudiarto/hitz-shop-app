import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { AppearanceColors, AppearanceFonts } from '@/theme/_config'
import { IconArrowLeft, IconShoppingBag } from '@/theme/Icons'

interface HeaderProductDetailProps {
  productName: string
  notificationCount: number
  onBackPress: () => void
  onOptionsPress: () => void
}

const HeaderProductDetail: React.FC<HeaderProductDetailProps> = ({
  productName,
  onBackPress,
  notificationCount,
  onOptionsPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress}>
        <IconArrowLeft />
      </TouchableOpacity>
      <Text style={styles.productName}>{productName}</Text>
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

export default HeaderProductDetail
