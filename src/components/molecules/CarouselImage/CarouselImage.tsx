import React, { FC, useRef, useState } from 'react'
import {
  Dimensions,
  FlatList,
  FlatListProps,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { AppearanceColors } from '@/theme/_config' 

interface CarouselProps {
  data: string[] 
  onDetail: (url: string) => void
}

const { width: screenWidth } = Dimensions.get('window')

const CarouselWithoutLibrary: FC<CarouselProps> = ({ data, onDetail }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const flatListRef = useRef<FlatList<string>>(null)

  const onViewableItemsChanged = useRef<
    FlatListProps<string>['onViewableItemsChanged']
  >(({ viewableItems }) => {
    setActiveIndex(viewableItems[0]?.index ?? 0)
  }).current

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  }

  const renderItem: FlatListProps<string>['renderItem'] = ({ item }) => (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.imageContainer}
      onPress={() => {
        onDetail(item) // memberikan URL gambar yang diklik
      }}
    >
      <Image source={{ uri: item }} style={styles.image} />
    </TouchableOpacity>
  )

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      {/* Pagination */}
      <View style={styles.paginationContainer}>
        <Text style={styles.paginationText}>
          {activeIndex + 1} / {data.length}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: screenWidth,
    height: screenWidth / 2,
    resizeMode: 'contain',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    paddingHorizontal: 5,
    borderWidth: 1,
    maxWidth: 50,
    marginHorizontal: 10,
    borderRadius: 5,
    borderColor: AppearanceColors.border,
  },
  paginationText: {
    fontSize: 14,
    color: AppearanceColors.border,
  },
})

export default CarouselWithoutLibrary
