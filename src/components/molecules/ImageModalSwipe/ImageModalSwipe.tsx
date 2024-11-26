import React from 'react'
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import Modal from 'react-native-modal'
import Swiper from 'react-native-swiper'

import { AppearanceColors } from '@/theme/_config'
import { IconArrowLeftWhite } from '@/theme/Icons'

const { width, height } = Dimensions.get('window')

interface ImageModalSwipeProps {
  isVisibleImages: boolean
  setIsVisibleImages: (visible: boolean) => void
  data: string[]
  initialIndex?: number
  onClose: () => void
}

const ImageModalSwipe: React.FC<ImageModalSwipeProps> = ({
  isVisibleImages,
  setIsVisibleImages,
  data,
  initialIndex = 0,
  onClose,
}) => {
  return (
    <Modal
      testID="modal"
      useNativeDriver={true}
      isVisible={isVisibleImages}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      onBackButtonPress={() => setIsVisibleImages(false)}
      style={styles.modal}
    >
      <View style={styles.overlay}>
        <View style={styles.contentPin}>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <IconArrowLeftWhite />
            </TouchableOpacity>
          </View>
          <View style={styles.swiperContainer}>
            <Swiper
              loop={false}
              index={initialIndex}
              showsPagination={false}
              style={styles.wrapper}
              dotStyle={{
                backgroundColor: 'rgba(255,255,255,.3)',
                width: 8,
                height: 8,
              }}
              activeDotStyle={{
                backgroundColor: '#fff',
                width: 8,
                height: 8,
              }}
            >
              {data.map((url, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Image
                    source={{ uri: url }}
                    resizeMode="contain"
                    style={styles.image}
                  />
                </View>
              ))}
            </Swiper>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
    backgroundColor: AppearanceColors.white,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 40 : 0,
  },
  contentPin: {
    flex: 1,
  },
  closeButtonContainer: {
    padding: 10,
  },
  closeButton: {
    alignItems: 'flex-start',
  },
  swiperContainer: {
    flex: 1,
  },
  wrapper: {},
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width,
    height,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})

export default ImageModalSwipe
