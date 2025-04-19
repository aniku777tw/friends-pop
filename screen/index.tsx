import { Stack } from 'expo-router'
import { useTranslation } from 'react-i18next'

const ScreenStack = () => {
  const { t } = useTranslation()
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/setting"
        options={{
          presentation: 'modal',
          title: t('setting.title'),
        }}
      />
      <Stack.Screen
        name="setup/profile/index"
        options={{
          presentation:'containedTransparentModal' ,
          title: t('profile.title'),
          
        }}
      />
    </Stack>
  )
}
export default ScreenStack
