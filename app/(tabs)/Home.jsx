import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Image } from "react-native";
import images from "../../constants/images";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View>
            <View className="flex flex-row items-center mt-5">
              <Image
                source={images.logo}
                className="w-20 h-20 justify-center mt-5"
                resizeMode="contain"
              />
              <View className="mt-7">
                <Text className="text-xl font-psemibold">CricBOT</Text>
                <Text className="text-lg">Smart Cricket Trainer</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;
