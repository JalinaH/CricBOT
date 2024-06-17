import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "react-native";
import images from "../../constants/images";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View>
            <View className="flex flex-row items-center mt-3">
              <Image
                source={images.logo}
                className="w-20 h-20 justify-center mt-5"
                resizeMode="contain"
              />
              <View className="mt-7">
                <Text className="text-xl font-psemibold">CricBOT</Text>
                <Text className="text-lg font-plight">
                  Smart Cricket Trainer
                </Text>
              </View>
            </View>
          </View>

          <View className="mt-10 flex flex-row w-[100%] mx-auto">
            <View className="flex flex-col w-[33%] items-center">
              <Text className="font-psemibold text-lg">2</Text>
              <Text className="text-grey-100">Sessions</Text>
            </View>
            <View className="flex flex-col w-[33%] items-center">
              <Text className="font-psemibold text-lg">100</Text>
              <Text className="text-grey-100">Balls</Text>
            </View>
            <View className="flex flex-col w-[33%] items-center">
              <Text className="font-psemibold text-lg">160</Text>
              <Text className="text-grey-100">Minutes</Text>
            </View>
          </View>

          <View className="flex flex-row justify-between ml-5 mr-5 mt-10">
            <Text className="text-[15px] font-pmedium">Quick Start</Text>
            <TouchableOpacity>
              <Text className="text-[15px] font-pmedium">Show All</Text>
            </TouchableOpacity>
          </View>

          <View>
            <View className="ml-5 mt-5 flex flex-row w-[100%]">
              <TouchableOpacity>
                <Image
                  source={images.bouncer}
                  className="w-[120px] h-[120px]"
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={images.yorker}
                  className="w-[120px] h-[120px] ml-3"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View>

            </View>
          </View>

          <StatusBar style="light" backgroundColor="#1C2120" />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;
