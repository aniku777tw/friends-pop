import React from 'react'
import { View } from 'react-native'
import {
  Box,
  Text,
  VStack,
  Divider,
  ScrollView,
  Image,
  Button,
} from '@gluestack-ui/themed'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useRouter } from 'expo-router'

const ProfileScreen = () => {
  const router = useRouter()

  const handleEditPress = () => {
    // 點擊編輯按鈕時，導航到 ProfileSetupScreen
    router.push('/(setup)/profile')
  }

  // 假資料
  const profile = {
    name: '小明',
    age: 25,
    job: '工程師',
    about: '喜歡登山、攝影，也喜歡看 Netflix 🍿\n希望認識真誠、有趣的朋友！',
    images: [
      'https://randomuser.me/api/portraits/women/48.jpg',
      'https://randomuser.me/api/portraits/women/50.jpg',
      'https://randomuser.me/api/portraits/women/51.jpg',
      'https://randomuser.me/api/portraits/women/52.jpg',
      'https://randomuser.me/api/portraits/women/53.jpg',
      'https://randomuser.me/api/portraits/women/54.jpg',
    ],
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView flex={1} bg="$backgroundLight0">
        <Box p="$6" bg="$backgroundLight0" flex={1}>
          <Text fontSize="$2xl" fontWeight="bold" mb="$4">
            我的資料
          </Text>

          {/* 顯示圖片 */}
          <VStack space="sm" mb="$4">
            <Box
              flexDirection="row"
              flexWrap="wrap"
              justifyContent="space-between"
            >
              {profile.images.map((image, index) => (
                <Image
                  alt={index.toString()}
                  key={index}
                  source={{ uri: image }}
                  style={{
                    width: '48%',
                    height: 150,
                    borderRadius: 10,
                    marginBottom: 10,
                  }}
                />
              ))}
            </Box>
          </VStack>

          {/* 顯示資料區塊 */}
          <VStack space="md">
            <Box>
              <Text fontWeight="bold" fontSize="$lg">
                暱稱
              </Text>
              <Text>{profile.name}</Text>
            </Box>

            <Divider />

            <Box>
              <Text fontWeight="bold" fontSize="$lg">
                年齡
              </Text>
              <Text>{profile.age} 歲</Text>
            </Box>

            <Divider />

            <Box>
              <Text fontWeight="bold" fontSize="$lg">
                職業
              </Text>
              <Text>{profile.job}</Text>
            </Box>

            <Divider />

            <Box>
              <Text fontWeight="bold" fontSize="$lg">
                關於我
              </Text>
              <Text>{profile.about}</Text>
            </Box>
          </VStack>
        </Box>
      </ScrollView>

      {/* 編輯按鈕 */}

      <Button
        p="$2"
        position="absolute"
        bottom={20}
        right={20}
        alignItems="center"
        justifyContent="center"
        rounded="$full"
        onPress={handleEditPress}
      >
        <FontAwesome name="edit" size={20} color="white" />
      </Button>
    </View>
  )
}

export default ProfileScreen
