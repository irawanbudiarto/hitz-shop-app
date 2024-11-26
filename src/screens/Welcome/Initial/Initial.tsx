import { CommonActions, useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { AppearanceColors, AppearanceFonts } from '@/theme/_config'

import { CustomStatusBar } from '@/components/molecules'

const InitialScreen: React.FC = () => {
  const navigation = useNavigation()

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
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={AppearanceColors.white}
        barStyle={'dark-content'}
      />
      <View style={styles.content}>
        <Text style={styles.textWelcome}>Welcome to my app</Text>
      </View>
    </View>
  )
}

export default InitialScreen

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
})
