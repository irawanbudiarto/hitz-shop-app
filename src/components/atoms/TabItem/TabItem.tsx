import React from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native'

import { AppearanceColors, AppearanceFonts } from '@/theme/_config'
import IconHomeActive from '@/theme/assets/icons/ic-home-active.svg'
import IconHome from '@/theme/assets/icons/ic-home.svg'
import { IconProfile, IconProfileActive } from '@/theme/Icons'

import Gap from '../Gap/Gap'

interface TabItemProps {
  title: string
  active: boolean
  onPress: () => void
  onLongPress: () => void
}

const TabItem: React.FC<TabItemProps> = ({
  title,
  active,
  onPress,
  onLongPress,
}) => {
  const Icon = () => {
    if (title === 'Home') {
      return active ? <IconHomeActive /> : <IconHome />
    }
    if (title === 'Profile') {
      return active ? <IconProfileActive /> : <IconProfile />
    }
    return <IconHomeActive />
  }
  const dynamicStyles = StyleSheet.create({
    text: {
      fontSize: 10,
      color: active
        ? AppearanceColors.text.menuActive
        : AppearanceColors.text.menuInactive,
      fontFamily: AppearanceFonts.primary.bold,
      marginTop: 4,
    },
  })

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Gap height={7} />
      <Icon />
      <Text style={dynamicStyles.text}>{title}</Text>
      <Gap height={ Platform.OS == 'ios' ? 30 : 10} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})

export default TabItem
