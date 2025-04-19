import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Box, Text, VStack, Pressable } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';

const ChatListScreen = () => {
  const router = useRouter();

  const chats = [
    { id: '1', name: 'Alice', lastMessage: 'Hey, how are you?' },
    { id: '2', name: 'Bob', lastMessage: 'Can we meet tomorrow?' },
    { id: '3', name: 'Charlie', lastMessage: 'Let\'s catch up soon!' },
    { id: '4', name: 'David', lastMessage: 'What\'s up?' },
  ];

  const handleChatPress = (chatId: string) => {
    router.push(`/(chat)/${chatId}`);
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <Pressable onPress={() => handleChatPress(item.id)} style={styles.chatItem}>
        <VStack space="sm">
          <Text fontSize="$lg" fontWeight="bold">{item.name}</Text>
          <Text fontSize="$sm" color="$gray600">{item.lastMessage}</Text>
        </VStack>
      </Pressable>
    );
  };

  return (
    <Box flex={1} bg="$white">
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  chatItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginHorizontal: 0,
  },
});

export default ChatListScreen;
