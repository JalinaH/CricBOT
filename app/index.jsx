import { Link, Redirect, router } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../constants/images";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Page() {
  const auth = getAuth();
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []); 

  if (loading) {
    return (
      <SafeAreaView className="bg-primary h-full flex justify-center items-center">
        <Text className="text-white text-lg">Loading...</Text>
      </SafeAreaView>
    );
  }

  if (isLogged) {
    return <Redirect href="/Home" />;
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="bg-white h-[80vh] mt-[20vh] rounded-3xl">
        <View>
          <Image
            source={images.logo}
            className="w-32 h-32 justify-center mx-auto mt-10"
            resizeMode="contain"
          />
        </View>
        <View>
          <Text className="font-pbold text-3xl text-center mt-[45px]">
            Welcome to CricBOT
          </Text>
          <Text className="font-pregular text-center text-lg text-grey-200 mt-[10px]">
            Experience the future of cricket training with CricBOT! Our
            automated cricket practice machine is designed to help you perfect
            your skills with precision and ease. Seamlessly control the machine
            through our intuitive mobile app and take your game to the next
            level. Ready to get started?
          </Text>
        </View>

        <CustomButton
          title="Continue with Email"
          handlePress={() => router.push("/sign-in")}
          containerStyles="mt-[40px] w-[80%]"
        />
      </View>

      <StatusBar style="light" backgroundColor="#1C2120" />
    </SafeAreaView>
  );
}
