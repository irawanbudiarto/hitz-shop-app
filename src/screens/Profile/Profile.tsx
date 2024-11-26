import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { AppearanceColors, AppearanceFonts } from '@/theme/_config'
import { ILogoHs } from '@/theme/Illustrations'

import { Gap } from '@/components/atoms'
import { CustomStatusBar } from '@/components/molecules'

const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={AppearanceColors.white}
        barStyle={'dark-content'}
      />
      <View style={styles.content}>
        <ILogoHs />
        <Gap height={10} />
        <Text style={styles.textWelcome}>Welcome to my app</Text>
        <Gap height={10} />
        <Text style={styles.version}>Version {process.env.APP_VERSION}</Text>
        <Text style={styles.copyright}>Copyright © 2024 Irawan Budiarto</Text>
      </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppearanceColors.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWelcome: {
    fontFamily: AppearanceFonts.primary.bold,
    fontSize: 16,
    color: AppearanceColors.text.primary,
  },
  version: {
    fontFamily: AppearanceFonts.primary.normal,
    fontSize: 16,
    color: AppearanceColors.border,
  },
  copyright: {
    fontFamily: AppearanceFonts.primary.normal,
    fontSize: 16,
    color: AppearanceColors.border,
  },
})
