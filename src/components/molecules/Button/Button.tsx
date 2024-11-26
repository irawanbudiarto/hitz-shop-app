import React from 'react'
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { AppearanceColors, AppearanceFonts } from '@/theme/_config'

interface ButtonProps {
  type: 'buy' | 'default' | 'fill' | 'disable'
  title: string
  onPress?: (event: GestureResponderEvent) => void
}

const Button: React.FC<ButtonProps> = ({ title, type, onPress }) => {
  const styles = StyleSheet.create({
    button: {
      padding: 10,
      borderRadius: 8,
      flex: 1,
    },
    buy: {
      backgroundColor: AppearanceColors.border,
    },
    disable: {
      backgroundColor: AppearanceColors.border,
    },
    default: {
      backgroundColor: AppearanceColors.primary,
    },
    fill: {
      backgroundColor: AppearanceColors.white,
      borderWidth: 1,
      borderColor: AppearanceColors.primary,
    },
    text: {
      fontFamily: AppearanceFonts.primary.medium,
      fontSize: 14,
      textAlign: 'center',
    },
    textBuy: {
      color: AppearanceColors.white,
    },
    textdisable: {
      color: AppearanceColors.white,
    },
    textdefault: {
      color: AppearanceColors.white,
    },
    textFill: {
      color: AppearanceColors.primary,
    },
  })

  // Menentukan gaya berdasarkan tipe tombol
  let buttonStyle = styles.button
  let textStyle = styles.text

  if (type === 'buy') {
    buttonStyle = { ...buttonStyle, ...styles.buy }
    textStyle = { ...textStyle, ...styles.textBuy }
  } else if (type === 'default') {
    buttonStyle = { ...buttonStyle, ...styles.default }
    textStyle = { ...textStyle, ...styles.textdefault }
  } else if (type === 'fill') {
    buttonStyle = { ...buttonStyle, ...styles.fill }
    textStyle = { ...textStyle, ...styles.textFill }
  } else if (type === 'disable') {
    buttonStyle = { ...buttonStyle, ...styles.disable }
    textStyle = { ...textStyle, ...styles.textdisable }
  }

  return (
    <>
      {type == 'disable' ? (
        <View style={buttonStyle}>
          <Text style={textStyle}>{title}</Text>
        </View>
      ) : (
        <TouchableOpacity style={buttonStyle} onPress={onPress}>
          <Text style={textStyle}>{title}</Text>
        </TouchableOpacity>
      )}
    </>
  )
}

export default Button
