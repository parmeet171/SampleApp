import { Stack } from "expo-router";
import store from "../store/store";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "" }} />
        <Stack.Screen name="Register" options={{ title: "Register" }} />
        <Stack.Screen name="Home" options={{ title: "Home" }} />
        <Stack.Screen name="Courses" options={{ title: "Courses" }} />
        <Stack.Screen name="UpdateCourse" options={{ title: "Update Course" }} />
      </Stack>
    </Provider>
  );
}
