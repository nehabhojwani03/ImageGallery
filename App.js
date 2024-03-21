import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./screens/HomeScreen";
import SettingScreen from "./screens/SettingScreen";

const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerStyle: { backgroundColor: "#c6cbef" } , headerTintCOlor: 'black', drawerStyle: {
            backgroundColor: '#c6cbef',
          },}}
        />
        <Drawer.Screen
          name="Setting"
          component={SettingScreen}
          options={{ headerStyle: { backgroundColor: "#c6cbef" } , headerTintCOlor: 'black', drawerStyle: {
            backgroundColor: '#c6cbef',
          },}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
