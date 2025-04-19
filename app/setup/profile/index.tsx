import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import {
  Box,
  Text,
  VStack,
  Input,
  InputField,
  Textarea,
  TextareaInput,
  Button,
  ButtonText,
  ScrollView,
  Pressable,
  View,
  Image,
} from '@gluestack-ui/themed'
import { useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'

const MAX_IMAGES = 6

const ProfileSetupScreen = () => {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])

  const handleComplete = () => {
    router.replace('/match')
  }

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      alert('我們需要相片權限來選擇圖片')
      return
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    })

    if (!result.canceled && result.assets.length > 0) {
      setImages((prev) => [...prev, result.assets[0].uri].slice(0, MAX_IMAGES))
    }
  }

  const renderImageSlots = () => {
    const slots = []
    for (let i = 0; i < MAX_IMAGES; i++) {
      const imageUri = images[i]
      if (imageUri) {
        slots.push(
          <Image key={i} source={{ uri: imageUri }} style={styles.imageSlot} />
        )
      } else if (i === images.length) {
        // 下一個可以加圖片的位置，顯示 +
        slots.push(
          <Pressable
            key={i}
            style={[styles.imageSlot, styles.plusSlot]}
            onPress={pickImage}
          >
            <Text fontSize="$2xl" color="$gray600">
              ＋
            </Text>
          </Pressable>
        )
      } else {
        // 空白框
        slots.push(<View key={i} style={styles.imageSlot} />)
      }
    }
    return slots
  }

  return (
    <ScrollView p="$4" bg="$backgroundLight0" flex={1} >
      <VStack space="md">
        <Text fontSize="$2xl" fontWeight="bold" mb="$4">
          自我介紹
        </Text>
        <Box>
          <Text mb="$1">暱稱</Text>
          <Input>
            <InputField placeholder="輸入你的名字" />
          </Input>
        </Box>

        <Box>
          <Text mb="$1">年齡</Text>
          <Input>
            <InputField placeholder="輸入你的年齡" keyboardType="numeric" />
          </Input>
        </Box>

        <Box>
          <Text mb="$1">職業</Text>
          <Input>
            <InputField placeholder="例如：工程師、設計師…" />
          </Input>
        </Box>

        <Box>
          <Text mb="$1">興趣與自我介紹</Text>
          <Textarea>
            <TextareaInput
              placeholder="寫下你喜歡的事物或是想讓對方知道的事～"
              numberOfLines={5}
              textAlignVertical="top"
            />
          </Textarea>
        </Box>

        <Box mt="$4">
          <Text mb="$2">照片（最多 6 張）</Text>
          <View style={styles.imageContainer}>{renderImageSlots()}</View>
        </Box>

        <Button mb='$16' onPress={handleComplete}>
          <ButtonText>完成設定</ButtonText>
        </Button>
      </VStack>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  imageSlot: {
    width: '48%',
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
  },
  plusSlot: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default ProfileSetupScreen
