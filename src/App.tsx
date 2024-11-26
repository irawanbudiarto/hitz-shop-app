import 'react-native-gesture-handler'

import { GestureHandlerRootView } from 'react-native-gesture-handler'

import ApplicationNavigator from './navigation/Application'
import ReduxProvider from './store'

function App() {
  return (
    <ReduxProvider>
      <GestureHandlerRootView>
        <ApplicationNavigator />
      </GestureHandlerRootView>
    </ReduxProvider>
  )
}

export default App
