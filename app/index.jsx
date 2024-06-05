import { Link, Redirect, router } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../constants/images";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { getAuth } from "firebase/auth";

export default function Page() {
  const auth = getAuth();
  if (auth.currentUser) {
    console.log("User is already signed in");
    <Redirect href="/Home" />;
    return null;
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
