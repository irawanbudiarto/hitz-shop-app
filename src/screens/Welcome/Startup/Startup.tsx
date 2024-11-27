import { CommonActions, useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'

import { AppearanceColors, AppearanceFonts } from '@/theme/_config'
import { Hitzshop } from '@/theme/Illustrations'
import getAssets from '@/theme/Images'

const StartupScreen: React.FC = () => {
  const navigation = useNavigation()
  const assets = getAssets()

  const init = async () => {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve(true)
      }, 2000)
    )
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      })
    )
  }

  useEffect(() => {
    init()
  })

  return (
    <>
      <ImageBackground
        style={styles.imageBackground}
        resizeMode="cover"
        source={assets.Background}
      >
        <View style={styles.content}>
          <Hitzshop />
        </View>
        <View style={styles.version}>
          <Text style={styles.textVersion}>
            Version {process.env.APP_VERSION}
          </Text>
          <Text style={styles.copyright}>Copyright © 2024</Text>
        </View>
      </ImageBackground>
    </>
  )
}

export default StartupScreen

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
  imageBackground: {
    flex: 1,
  },
  version: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
    justifyContent: 'flex-end',
    right: 0,
    top: 0,
    left: 0,
  },
  textVersion: {
    fontFamily: AppearanceFonts.primary.normal,
    fontSize: 14,
    color: AppearanceColors.white,
  },
  copyright: {
    fontFamily: AppearanceFonts.primary.normal,
    fontSize: 14,
    color: AppearanceColors.white,
  },
})
