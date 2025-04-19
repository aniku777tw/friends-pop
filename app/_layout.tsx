import 'react-native-reanimated'
import '@/i18n'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { THEME } from '@/constants/theme'
import { Button,Text, GluestackUIProvider } from '@gluestack-ui/themed'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { gluestackConfig } from '@/theme/gluestack-ui.config'
import  ScreenStack from '@/screen'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '/index',
}

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })

  
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GluestackUIProvider config={gluestackConfig} colorMode={THEME.LIGHT}>
        <ScreenStack />
      </GluestackUIProvider>
    </GestureHandlerRootView>
  )
}
