import { Link } from "expo-router";
import {  Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../constants/images";

export default function Page() {
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
      </View>
    </SafeAreaView>
  );
}


