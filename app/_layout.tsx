import 'react-native-reanimated'
import '@/i18n'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { THEME } from '@/constants/theme'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { gluestackConfig } from '@/theme/gluestack-ui.config'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })

  if (!fontsLoaded) return null

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GluestackUIProvider config={gluestackConfig} colorMode={THEME.LIGHT}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(modals)/modal"
            options={{ presentation: 'modal' }}
          />
        </Stack>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  )
}
