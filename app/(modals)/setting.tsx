import { Box, Button,Text } from '@gluestack-ui/themed'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Platform } from 'react-native'

export default function ModalScreen() {
  const router = useRouter()
  
  const handleLogout = () => {
    // 模擬登入成功後，導到首頁
    router.replace('/')
  }
  return (
    <>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Box  justifyContent="center" alignItems="center">
      <Button onPress={handleLogout} bg="$primary500" px="$4" py="$2">
        <Text color="$white"> logout</Text>
      </Button>
    </Box>
    </>
  )
}
