import { Stack } from "expo-router";import { AppProvider } from "../src/context/AppContext";import { colors } from "../src/theme";
export default function RootLayout(){return <AppProvider><Stack screenOptions={{headerShown:false,contentStyle:{backgroundColor:colors.bg}}}/></AppProvider>}
