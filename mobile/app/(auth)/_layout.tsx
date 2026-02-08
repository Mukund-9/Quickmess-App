import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

const AuthLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  if (isSignedIn) return <Redirect href={"/(tabs)" as any} />;

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthLayout;