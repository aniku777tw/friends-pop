import { Stack } from 'expo-router'
import { useTranslation } from 'react-i18next'

export default function Layout() {
  const { t } = useTranslation()
  return (
    <Stack>
      <Stack.Screen
        name="setting"
        options={{
          title: t('setting.title'),
        }}
      />
    </Stack>
  )
}
