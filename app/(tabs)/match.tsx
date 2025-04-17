import React, { useState } from 'react'
import {  StyleSheet } from 'react-native'
import SwipeCard from '@/components/SwipeCard'
import { Button, Text, Box } from '@gluestack-ui/themed'

export default function TinderStackScreen() {
  const [cards, setCards] = useState([
    {
      text: 'John Doe, 25',
      imageUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
    },
    {
      text: 'Jane Smith, 29',
      imageUrl: 'https://randomuser.me/api/portraits/women/48.jpg',
    },
  ])

  const [currentIndex, setCurrentIndex] = useState(0)

  const handleSwipeLeft = () => {
    console.log('Swiped Left')
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length)
  }

  const handleSwipeRight = () => {
    console.log('Swiped Right')
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length)
  }

  const handleLike = () => {
    console.log('Liked')
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length) // 觸發右滑
  }

  const handleNope = () => {
    console.log('Nope')
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length) // 觸發左滑
  }

  return (
    <Box marginTop='$4' flex={1} bg="$background">
      <Button
        size="sm"
        margin="auto"
        onPress={() =>
          setCards([
            {
              text: `John Doe, ${Math.floor(Math.random() * 100)}`,
              imageUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
            },
            {
              text: `Jane Smith, ${Math.floor(Math.random() * 100)}`,
              imageUrl: 'https://randomuser.me/api/portraits/women/48.jpg',
            },
          ])
        }
      >
        <Text color="$white">reset for testing</Text>
      </Button>
      {cards
        .map((card, index) => (
          <SwipeCard
            key={card.text}
            text={card.text}
            imageUrl={card.imageUrl}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
          />
        ))
        .reverse()}
      <Box style={styles.buttonsContainer}>
        <Button bgColor='$rose300' onPress={handleNope}><Text>Nope</Text></Button>
        <Button bgColor='$blue300' onPress={handleLike}><Text>Like</Text></Button>
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  buttonsContainer: {
    position: 'absolute',
    bottom: 20,
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});