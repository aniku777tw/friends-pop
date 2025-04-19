import React from 'react'
import { Platform } from 'react-native'
import { Box, VStack, Button,Text  } from '@gluestack-ui/themed'
import * as AppleAuthentication from 'expo-apple-authentication'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'
import { useRouter } from 'expo-router'

export default function LoginScreen() {
  const router = useRouter()

  const handleLogin = () => {
    // 模擬登入成功後，導到首頁
    router.replace('/(setup)/profile')
  }
  return (
    <Box
      flex={1}
      bg="$backgroundLight0"
      justifyContent="center"
      alignItems="center"
      px="$6"
    >
      <Text size="2xl" bold mb="$8">
        歡迎登入
      </Text>

      <VStack space="lg" w="$full">
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={handleLogin}
          
          style={{ width: '100%', height: 44 , borderRadius: 8}}
        />
        <Button onPress={handleLogin}><Text>Login</Text></Button>

        {Platform.OS === 'ios' && (
          <AppleAuthentication.AppleAuthenticationButton
            onPress={handleLogin}
            buttonType={
              AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
            }
            buttonStyle={
              AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
            }
            cornerRadius={8}
            style={{ width: '100%', height: 44 }}
          />
        )}
      </VStack>
    </Box>
  )
}
