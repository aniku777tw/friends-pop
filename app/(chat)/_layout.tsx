import { Stack, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native'
import { Button, Text } from '@gluestack-ui/themed'
import { useRouter } from 'expo-router'

export default function Layout() {
  const { chatId } = useLocalSearchParams<{ chatId: string }>()
  const router = useRouter()

  const handleGoBack = () => {
    router.back() // Navigate back to the previous screen
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Stack>
        {/* Add Go Back Button */}
        <Stack.Screen
          name="[chatId]/index"
          options={{
            title: chatId,
            headerLeft: () => (
              <Button onPress={handleGoBack} variant="link">
                <Text>Back</Text>
              </Button>
            ),
          }}
        />
      </Stack>
    </SafeAreaView>
  )
}
