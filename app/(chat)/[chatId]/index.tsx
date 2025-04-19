import React, { useState, useRef, useEffect } from 'react'
import {
  Box,
  Text,
  FlatList,
  HStack,
  Input,
  InputField,
  Button,
  Avatar,
  AvatarFallbackText,
  Spinner,
  VStack,
  Image,
} from '@gluestack-ui/themed'

import FontAwesome from '@expo/vector-icons/FontAwesome'
import * as ImagePicker from 'expo-image-picker'

const mockMessages = [
  {
    id: '1',
    text: '這是一張圖片！',
    from: 'other',
    time: '10:30',
    image: 'https://www.example.com/image1.jpg',
  },
  {
    id: '2',
    text: '這是另一張圖片～',
    from: 'me',
    time: '10:31',
    image: 'https://www.example.com/image2.jpg',
  },
  {
    id: '3',
    text: '這是純文字訊息',
    from: 'other',
    time: '10:32',
  },
  {
    id: '4',
    text: '這張圖片很有趣！',
    from: 'me',
    time: '10:33',
    image: 'https://www.example.com/image3.jpg',
  },
  {
    id: '5',
    text: '再發一張圖片！',
    from: 'other',
    time: '10:34',
    image: 'https://www.example.com/image4.jpg',
  },
]

const ChatDetailScreen = () => {
  const [messages, setMessages] = useState(mockMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [imageUri, setImageUri] = useState<string | null>(null)
  const [shouldScroll, setShouldScroll] = useState(true) // Add this state to control scrolling

  const flatListRef = useRef<any>(null)

  // Scroll to the bottom if not typing and a new message is sent
  useEffect(() => {
    if (shouldScroll && flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true })
    }
  }, [messages, shouldScroll]) // Add `shouldScroll` as a dependency

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted) {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })

      if (!pickerResult.canceled) {
        setImageUri(pickerResult.assets[0].uri)
      }
    } else {
      alert('需要圖片選擇權限')
    }
  }

  const handleSend = () => {
    if (!input.trim() && !imageUri) return // If there's no input or image, don't send

    const newMessage = {
      id: String(Date.now()),
      text: input,
      from: 'me',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      image: imageUri, // Add image URI if available
    }

    setMessages((prev) => [...prev, newMessage] as any)
    setInput('')
    setImageUri(null) // Reset image after sending
    setIsTyping(true)
    setShouldScroll(true) // Allow scrolling to the bottom after sending the message

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          text: '收到～',
          from: 'other',
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ])
      setIsTyping(false)
      setShouldScroll(true) // Allow scrolling to the bottom after receiving the message
    }, 1000)
  }

  const renderMessage = ({
    item,
  }: {
    item: {
      id: string
      text: string
      from: 'me' | 'other'
      time: string
      image?: string
    }
  }) => (
    <HStack
      justifyContent={item.from === 'me' ? 'flex-end' : 'flex-start'}
      alignItems="flex-start"
      mb="$2"
      space="xs"
    >
      {item.from === 'other' && (
        <Avatar size="sm">
          <AvatarFallbackText>
            {item.from === 'other' ? 'U' : 'M'}
          </AvatarFallbackText>
        </Avatar>
      )}
      <VStack
        maxWidth="70%"
        alignItems={item.from === 'me' ? 'flex-end' : 'flex-start'}
      >
        <Box
          px="$4"
          py="$2"
          bg={item.from === 'me' ? '$blue500' : '$blue100'}
          borderRadius={16}
          borderTopRightRadius={item.from === 'me' ? 0 : 16}
          borderTopLeftRadius={item.from === 'me' ? 16 : 0}
        >
          {item.image ? (
            <Image
              source={{ uri: item.image }}
              style={{ width: 150, height: 150, borderRadius: 8 }}
            />
          ) : (
            <Text color={item.from === 'me' ? '$white' : '$black'}>
              {item.text}
            </Text>
          )}
        </Box>
        <Text fontSize={10} color="$gray500" mt={2}>
          {item.time}
        </Text>
      </VStack>
    </HStack>
  )

  return (
    <Box flex={1} bg="$white" px="$4" pt="$2">
      <FlatList
        ref={flatListRef} // Attach the ref to FlatList
        data={messages}
        keyExtractor={(item: any) => item.id}
        renderItem={renderMessage as any}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      {isTyping && (
        <HStack mb="$2" alignItems="center" space="sm">
          <Avatar size="sm">
            <AvatarFallbackText>U</AvatarFallbackText>
          </Avatar>
          <HStack space="xs">
            <Spinner size="small" color="$gray500" />
            <Text fontSize={12} color="$gray500">
              對方正在輸入…
            </Text>
          </HStack>
        </HStack>
      )}
      <HStack
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        px="$4"
        bg="$white"
        alignItems="center"
        space="sm"
      >
        <Input flex={1} size="md" variant="outline">
          <InputField
            placeholder="輸入訊息..."
            value={input}
            onChangeText={(text) => {
              setInput(text)
              setShouldScroll(false) // Prevent scrolling while typing
            }}
          />
        </Input>
        <Button size="md" onPress={pickImage}>
          <FontAwesome name="image" size={20} color="white" />
        </Button>
        <Button size="md" onPress={handleSend}>
          <FontAwesome name="send" size={20} color="white" />
        </Button>
      </HStack>
    </Box>
  )
}

export default ChatDetailScreen
