import React from 'react'
import {
  Box,
  Text,
  Image,
  FlatList,
  Tabs,
  TabsTab,
  TabsTabList,
  TabsTabPanels,
  TabsTabPanel,
  Pressable,
} from '@gluestack-ui/themed'

// 定義數據的型別
type LikedItem = {
  id: string
  name: string
  image: string
}

const likedByOthers: LikedItem[] = Array.from({ length: 6 }).map((_, i) => ({
  id: `liked-${i}`,
  name: `喜歡你 ${i + 1}`,
  image: `https://placekitten.com/200/${200 + i}`,
}))

const youLiked: LikedItem[] = Array.from({ length: 4 }).map((_, i) => ({
  id: `you-liked-${i}`,
  name: `你按讚的 ${i + 1}`,
  image: `https://placekitten.com/201/${200 + i}`,
}))

// 定義卡片網格的顯示組件
const CardGrid = ({ data }: { data: LikedItem[] }) => (
  <FlatList
    data={data}
    numColumns={2}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <Pressable
        flex={1}
        margin={4}
        backgroundColor="$gray100"
        borderRadius={8}
        overflow="hidden"
        onPress={() => alert(`Clicked on ${item.name}`)} // 點擊事件，這裡可以替換成需要的功能
      >
        <Image
          source={{ uri: item.image }}
          alt={item.name}
          height={120}
          w="100%" // 確保圖片寬度正確
        />
        <Box px={8} py={4}>
          <Text textAlign="center">{item.name}</Text>
        </Box>
      </Pressable>
    )}
  />
)

export default function LikeScreen() {
  return (
    <Box flex={1} backgroundColor="$white">
      <Tabs>
        <TabsTabList width="100%">
          <TabsTab flex={1} alignItems="center">
            <Text>誰喜歡你</Text>
          </TabsTab>
          <TabsTab flex={1} alignItems="center">
            <Text>你按讚的對象</Text>
          </TabsTab>
        </TabsTabList>

        <TabsTabPanels>
          <TabsTabPanel>
            <CardGrid data={likedByOthers} />
          </TabsTabPanel>
          <TabsTabPanel>
            <CardGrid data={youLiked} />
          </TabsTabPanel>
        </TabsTabPanels>
      </Tabs>
    </Box>
  )
}
