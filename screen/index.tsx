import { Stack } from 'expo-router'
import { useTranslation } from 'react-i18next'

const ScreenStack = () => {
  const { t } = useTranslation()
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(chat)" options={{ headerShown: false }} />
      <Stack.Screen name="(setup)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)"
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Stack>
  )
}
export default ScreenStack
