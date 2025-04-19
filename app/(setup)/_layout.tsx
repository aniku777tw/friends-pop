import { Stack } from "expo-router"
import { useTranslation } from 'react-i18next'
  
export default function Layout() {
  const { t } = useTranslation()
  return (
    <Stack>
      <Stack.Screen
        name="profile/index"
        options={{
          title: t('profile.title'),
        }}
      />
    </Stack>
  )
}