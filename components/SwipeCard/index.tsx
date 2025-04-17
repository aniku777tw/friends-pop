// TinderCard.tsx
import React from 'react';
import { Dimensions, StyleSheet, Image, ScrollView, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Box, Text } from '@gluestack-ui/themed';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const EXIT_DISTANCE = SCREEN_WIDTH * 1.5;

type TinderCardProps = {
  text: string;
  imageUrl: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
};

const TinderCard = ({
  text,
  imageUrl,
  onSwipeLeft,
  onSwipeRight,
}: TinderCardProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0); // 用來旋轉卡片

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
      rotate.value = e.translationX / 20; // 根據滑動改變旋轉角度
    })
    .onEnd(() => {
      const shouldSwipe = Math.abs(translateX.value) > SWIPE_THRESHOLD;

      if (shouldSwipe) {
        const toRight = translateX.value > 0;
        const toX = toRight ? EXIT_DISTANCE : -EXIT_DISTANCE;

        translateX.value = withSpring(toX, { damping: 15 }, () => {
          if (toRight && onSwipeRight) {
            runOnJS(onSwipeRight)();
          } else if (!toRight && onSwipeLeft) {
            runOnJS(onSwipeLeft)();
          }
        });
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotate.value = withSpring(0);
      }
    });

  // 滑動動畫的樣式
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Box
          bg="$backgroundLight0"
          p="$5"
          rounded="$2xl"
          h={550}
          shadowColor="black"
          shadowOpacity={0.1}
          shadowRadius={12}
        >
          <ScrollView contentContainerStyle={{ paddingTop: 10 }}>
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
            <Text size="2xl" bold mb="$4">
              {text}
            </Text>
            {[...Array(10)].map((_, i) => (
              <Text key={i} mt="$2">
                Lorem ipsum {i + 1}: 一些內容會讓你滑動來查看。
              </Text>
            ))}
          </ScrollView>
        </Box>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    marginBottom: 20,
  },
});

export default TinderCard;
