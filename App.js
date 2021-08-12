import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { Text } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { SafeArea } from "./src/components/utils/safe-area.component";
import { theme } from "./src/infrastructure/theme";

import { TransactionsScreen } from "./src/features/transactions/screens/transactionsScreen";
import { AddScreen } from "./src/features/add/screens/addScreen";

const Tab = createBottomTabNavigator();

const ProfileScreen = () => (
  <SafeArea>
    <Text>Profile</Text>
  </SafeArea>
);

const TAB_ICON = {
  Add: {
    name: "plus-circle",
    library: "MaterialCommunityIcons",
  },
  Transactions: {
    name: "account-balance",
    library: "MaterialIcons",
  },
  Profile: {
    name: "account-circle",
    library: "MaterialCommunityIcons",
  },
};

const tabBarIcon =
  (routeName) =>
  ({ size, color }) => {
    let iconName;
    let library;

    if (routeName === "Add") {
      iconName = TAB_ICON.Add.name;
      library = TAB_ICON.Add.library;
    } else if (routeName === "Transactions") {
      iconName = TAB_ICON.Transactions.name;
      library = TAB_ICON.Transactions.library;
    } else if (routeName === "Profile") {
      iconName = TAB_ICON.Profile.name;
      library = TAB_ICON.Profile.library;
    }

    switch (library) {
      case "MaterialIcons":
        return <MaterialIcons name={iconName} size={size} color={color} />;

      default:
        return (
          <MaterialCommunityIcons name={iconName} size={size} color={color} />
        );
    }
  };

const createScreenOptions = ({ route }) => {
  const routeName = route.name;
  return {
    headerShown: false,
    tabBarIcon: tabBarIcon(routeName),
    tabBarActiveTintColor: "orange",
    tabBarInactiveTintColor: "gray",
  };
};

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={createScreenOptions}>
            <Tab.Screen name="Transactions" component={TransactionsScreen} />
            <Tab.Screen name="Add" component={AddScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
