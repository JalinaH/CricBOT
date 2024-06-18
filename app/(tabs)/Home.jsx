import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import images from "../../constants/images";
import icons from "../../constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch("http://10.10.8.39/status"); 
        if (response.ok) {
          setIsConnected(true);
          setConnectionStatus("Connected");
        } else {
          setIsConnected(false);
          setConnectionStatus("Disconnected");
        }
      } catch (error) {
        setIsConnected(false);
        setConnectionStatus("Disconnected");
      }
    };
    checkConnection();

    // const intervalId = setInterval(checkConnection, 5000); 
    // return () => clearInterval(intervalId); 
  }, []);

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
              <Text
                className="font-plight ml-10 mt-5"
                style={{ color: isConnected ? "green" : "red" }}
              >
                {connectionStatus}
              </Text>
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

          <View className="flex flex-col">
            <View className="ml-5 mt-5 flex flex-row mx-auto">
              <TouchableOpacity>
                <Image
                  source={images.bouncer}
                  className="w-[110px] h-[110px]"
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={images.yorker}
                  className="w-[110px] h-[110px] ml-3"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View className="ml-5 mt-5 flex flex-row mx-auto">
              <TouchableOpacity>
                <Image
                  source={images.fast}
                  className="w-[110px] h-[110px]"
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={images.slow}
                  className="w-[110px] h-[110px] ml-3"
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={images.swing}
                  className="w-[110px] h-[110px] ml-3"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text>Levels</Text>
            <View>
              <Image
                source={images.beginner}
                className="w-[110px] h-[110px]"
                resizeMode="contain"
              />
              <Text>Beginner</Text>
              <Text>Recommend for first use </Text>
              <View>
                <Image
                  source={icons.star}
                  className="w-[100px] h-[100px]"
                  resizeMode="contain"
                />
                <Text>30 Sessions</Text>
              </View>
            </View>
          </View>

          <StatusBar style="light" backgroundColor="#1C2120" />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;
