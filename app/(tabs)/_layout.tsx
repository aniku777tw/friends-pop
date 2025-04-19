import React from 'react'
import { useTranslation } from 'react-i18next'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function Icon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={24} {...props} />
}

export default function TabLayout() {
  const { t } = useTranslation()
  return (
    <Tabs>
      <Tabs.Screen
        name="profile"
        options={{
          animation: 'shift',
          title: t('profile.title'),
          tabBarIcon: ({ color }) => <Icon name="user" color={color} />,
          headerRight: () => (
            <Link href="/setting" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="cog"
                    size={25}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="match"
        options={{
          animation: 'shift',
          title: t('match.title'),
          tabBarIcon: ({ color }) => <Icon name="heartbeat" color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          animation: 'shift',
          title: t('chat.title'),
          tabBarIcon: ({ color }) => <Icon name="comments" color={color} />,
        }}
      />
      <Tabs.Screen
        name="like"
        options={{
          animation: 'shift',
          title: t('like.title'),
          tabBarIcon: ({ color }) => <Icon name="heart" color={color} />,
        }}
      />
    </Tabs>
  )
}
