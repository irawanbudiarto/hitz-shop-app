import React from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'

import { AppearanceColors, AppearanceFonts } from '@/theme/_config'

import { Gap } from '@/components/atoms'

type EmptyViewProps = {
  icon: React.ReactNode
  desc?: string
  color?: string
  type?: 'horizontal' | 'vertical'
  title: string
}

const EmptyView: React.FC<EmptyViewProps> = ({
  icon,
  desc = '',
  color = AppearanceColors.white,
  type = 'vertical',
  title,
}) => {
  const containerStyle: ViewStyle = {
    backgroundColor: color,
    padding: 16,
    borderRadius: 10,
    ...(type === 'horizontal' ? { flex: 1, marginHorizontal: 10 } : {}),
  }

  return (
    <View style={containerStyle}>
      <View
        style={[
          styles.content,
          type === 'horizontal'
            ? styles.horizontalContent
            : styles.verticalContent,
        ]}
      >
        {icon}
        {type === 'horizontal' && <Gap width={16} />}
        <View style={type === 'horizontal' ? { flex: 1 } : undefined}>
          <Text style={styles.title}>{title}</Text>
          <Gap height={5} />
          <Text style={styles.desc}>{desc}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  horizontalContent: {
    flexDirection: 'row',
  },
  verticalContent: {
    flexDirection: 'column',
  },
  title: {
    fontFamily: AppearanceFonts.primary.bold,
    fontSize: 16,
    color: AppearanceColors.text.primary,
    textAlign: 'center'
  },
  desc: {
    fontFamily: AppearanceFonts.primary.normal,
    fontSize: 14,
    color: AppearanceColors.text.secondary,
    textAlign: 'center'
  },
})

export default EmptyView
