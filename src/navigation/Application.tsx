import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import {
  Cart,
  FavProducts,
  Home,
  Initial,
  ProductDetail,
  Profile,
  SearchProducts,
  Startup,
} from '@/screens'

import MainNavigator from './Main'
import { Paths } from './paths'
import { RootStackParamList } from './types'

const Stack = createStackNavigator<RootStackParamList>()

function ApplicationNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen component={Startup} name={Paths.Startup} />
          <Stack.Screen component={Initial} name={Paths.Initial} />
          <Stack.Screen component={MainNavigator} name={Paths.Main} />
          <Stack.Screen component={Home} name={Paths.Home} />
          <Stack.Screen component={Profile} name={Paths.Profile} />
          <Stack.Screen component={ProductDetail} name={Paths.ProductDetail} />
          <Stack.Screen component={Cart} name={Paths.Cart} />
          <Stack.Screen component={FavProducts} name={Paths.FavProducts} />
          <Stack.Screen
            component={SearchProducts}
            name={Paths.SearchProducts}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default ApplicationNavigator
