// TinderCard.tsx
import React, { forwardRef, useImperativeHandle } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import {
  Box,
  Text,
  Image,
  ScrollView,
  LinearGradient,
} from '@gluestack-ui/themed'

const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25
const EXIT_DISTANCE = SCREEN_WIDTH * 1.5

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const CARD_HEIGHT = SCREEN_HEIGHT * 0.9

export type TinderCardRef = {
  swipeLeft: () => void
  swipeRight: () => void
}

type CardItem = {
  introduction: string
  imageUrls: string[]
  name: string
}

type TinderCardProps = {
  card: CardItem
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
}

const TinderCard = forwardRef<TinderCardRef, TinderCardProps>(
  ({ card, onSwipeLeft, onSwipeRight }, ref) => {
    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)
    const rotate = useSharedValue(0)

    const swipe = (direction: 'left' | 'right') => {
      const toX = direction === 'right' ? EXIT_DISTANCE : -EXIT_DISTANCE
      translateX.value = withSpring(toX, { damping: 15 }, () => {
        if (direction === 'right' && onSwipeRight) {
          runOnJS(onSwipeRight)()
        } else if (direction === 'left' && onSwipeLeft) {
          runOnJS(onSwipeLeft)()
        }
      })
    }

    useImperativeHandle(ref, () => ({
      swipeLeft: () => swipe('left'),
      swipeRight: () => swipe('right'),
    }))

    const panGesture = Gesture.Pan()
      .onUpdate((e) => {
        translateX.value = e.translationX
        translateY.value = e.translationY
        rotate.value = e.translationX / 20
      })
      .onEnd(() => {
        const shouldSwipe = Math.abs(translateX.value) > SWIPE_THRESHOLD

        if (shouldSwipe) {
          const toRight = translateX.value > 0
          swipe(toRight ? 'right' : 'left')
        } else {
          translateX.value = withSpring(0)
          translateY.value = withSpring(0)
          rotate.value = withSpring(0)
        }
      })

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate.value}deg` },
      ],
    }))

    const { introduction, imageUrls, name } = card

    return (
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <Box bg="$backgroundLight0" p="$4" h={CARD_HEIGHT}>
            <ScrollView borderRadius={20}>
              <Box position="relative">
                <Image
                  alt={imageUrls[0]}
                  source={{ uri: imageUrls[0] }}
                  w="$full"
                  h={CARD_HEIGHT - 64 - 48}
                  borderRadius={20}
                  resizeMode="cover"
                />
                <LinearGradient
                  start='auto'
                  end='auto'
                />
                <Text
                  color="$white"
                  size="2xl"
                  position="absolute"
                  bold
                  m="$4"
                  bottom="$10"
                >
                  {name}
                </Text>
              </Box>
              <Text mt="$2">{introduction}</Text>
            </ScrollView>
          </Box>
        </Animated.View>
      </GestureDetector>
    )
  }
)

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: '100%',
    height: CARD_HEIGHT,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    height: 100,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
})

export default TinderCard
