import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'

import BottomNavigator from '@/components/molecules/BottomNavigator/BottomNavigator'
import { Home, Profile } from '@/screens'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIconStyle: { display: 'none' },
          tabBarLabelPosition: 'beside-icon',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIconStyle: { display: 'none' },
          tabBarLabelPosition: 'beside-icon',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
