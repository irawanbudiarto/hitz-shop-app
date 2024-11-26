import React from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'

interface CustomStatusBarProps {
  backgroundColor?: string
  barStyle?: 'default' | 'light-content' | 'dark-content'
  noBackground?: boolean
}

const CustomStatusBar: React.FC<CustomStatusBarProps> = ({
  backgroundColor,
  barStyle = 'light-content',
  noBackground,
}) => {
  const statusBarBackgroundColor = backgroundColor || '#fff' // default background color
  const statusBarContentColor = barStyle || 'light-content' // default content color

  if (noBackground) {
    return (
      <View style={[styles.statusBar]}>
        <StatusBar
          translucent
          backgroundColor={statusBarBackgroundColor}
          barStyle={
            Platform.OS === 'android' ? 'dark-content' : statusBarContentColor
          }
        />
      </View>
    )
  }

  return (
    <View
      style={[styles.statusBar, { backgroundColor: statusBarBackgroundColor }]}
    >
      <StatusBar
        translucent
        backgroundColor={statusBarBackgroundColor}
        barStyle={statusBarContentColor}
      />
    </View>
  )
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 30 : StatusBar.currentHeight
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    height: APPBAR_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default CustomStatusBar
