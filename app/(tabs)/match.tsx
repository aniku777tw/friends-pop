import React, { useRef, useState } from 'react'
import SwipeCard, { TinderCardRef } from '@/components/SwipeCard'
import { Button, Text, Center } from '@gluestack-ui/themed'

export default function TinderStackScreen() {
  const [cards, setCards] = useState([
    {
      name: 'John Doe, 25',
      introduction: 'Hello, I am John Doe', 
      imageUrls: ['https://randomuser.me/api/portraits/men/48.jpg'],
    },
    {
      name: 'Jane Smith, 29',
      introduction: 'Hi, I am Jane Smith',
      imageUrls: ['https://randomuser.me/api/portraits/women/48.jpg'],
    },
  ])

  const cardRefs = useRef<TinderCardRef[]>([])

  return (
    <Center marginTop="$4" flex={1} bg="$background">
      <Button
        size="sm"
        margin="auto"
        onPress={() =>
          setCards([
            {
              name: `John Doe, ${Math.floor(Math.random() * 100)}`,
              introduction: 'Hello, I am John Doe', 
              imageUrls: ['https://randomuser.me/api/portraits/men/48.jpg'],
            },
            {
              name: `John we, ${Math.floor(Math.random() * 100)}`,
              introduction: 'Hi, I am Jane Smith',
              imageUrls: ['https://randomuser.me/api/portraits/women/48.jpg'],
            },
          ])
        }
      >
        <Text color="$white">reset for testing</Text>
      </Button>
      {cards.map((card, index) => (
        <SwipeCard
          ref={(el) => (cardRefs.current[index] = el!)}
          key={card.name}
          card={card}
        />
      ))}
    </Center>
  )
}
