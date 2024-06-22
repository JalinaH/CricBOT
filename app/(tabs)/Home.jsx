import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import images from "../../constants/images";
import icons from "../../constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { NetworkInfo } from "react-native-network-info";
import { useNavigation } from "expo-router";

const Home = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch("http://192.168.1.14/status");
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

    const intervalId = setInterval(checkConnection, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const navigation = useNavigation();

  const handlePress = (title) => {
    navigation.navigate("Session", { title });
  };

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
              <TouchableOpacity onPress={() => handlePress("Random")}>
                <Image
                  source={images.random}
                  className="w-[103px] h-[110px] mr-2 mt-[-px]"
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress("Bouncer Ball")}>
                <Image
                  source={images.bouncer}
                  className="w-[110px] h-[110px]"
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress("Yorker Ball")}>
                <Image
                  source={images.yorker}
                  className="w-[110px] h-[110px] ml-3"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View className="ml-5 mt-5 flex flex-row mx-auto">
              <TouchableOpacity onPress={() => handlePress("Fast Ball")}>
                <Image
                  source={images.fast}
                  className="w-[110px] h-[110px]"
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress("Slow Ball")}>
                <Image
                  source={images.slow}
                  className="w-[110px] h-[110px] ml-3"
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress("Swing Ball")}>
                <Image
                  source={images.swing}
                  className="w-[110px] h-[110px] ml-3"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="mt-10 ml-5">
            <Text className="font-pmedium text-[15px]">LEVELS</Text>
            <View className="mt-5 flex flex-row items-center">
              <Image
                source={images.beginner}
                className="w-[70px] h-[70px] mr-2"
                resizeMode="contain"
              />
              <View>
                <Text className="font-psemibold text-lg">Beginner Plans</Text>
                <Text className="font-plight">Recommend for first use </Text>
                <View className="flex flex-row items-center gap-1">
                  <Image
                    source={icons.star}
                    className="w-[15px] h-[15px]"
                    resizeMode="contain"
                  />
                  <Text className="font-plight">30 Sessions</Text>
                </View>
              </View>
            </View>

            <View className="mt-7 flex flex-row items-center mb-5">
              <Image
                source={images.pro}
                className="w-[70px] h-[70px] mr-2"
                resizeMode="contain"
              />
              <View>
                <Text className="font-psemibold text-lg">Advanced Plans</Text>
                <Text className="font-plight">
                  Recommend for previous users{" "}
                </Text>
                <View className="flex flex-row items-center gap-1">
                  <Image
                    source={icons.star}
                    className="w-[15px] h-[15px]"
                    resizeMode="contain"
                  />
                  <Text className="font-plight">Custom Sessions</Text>
                </View>
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
