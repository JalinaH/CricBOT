import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import images from "../../constants/images";
import { MinusCircle } from "phosphor-react-native";
import { PlusCircle } from "phosphor-react-native";
import RNPickerSelect from "react-native-picker-select";

const Session = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");

  useEffect(() => {
    const [selectedValue, setSelectedValue] = useState(null);

    const items = [
      { label: "Random", value: "random" },
      { label: "Bouncer Ball", value: "bouncer" },
      { label: "Yorker Ball", value: "yorker" },
      { label: "Fast Ball", value: "fast" },
      { label: "Slow Ball", value: "slow" },
    ];

    const checkConnection = async () => {
      try {
        const response = await fetch("http://192.168.126.73/status");
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
              <Text className="text-lg font-plight">Smart Cricket Trainer</Text>
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

        <View className="mt-10 ml-5">
          <Text className="font-psemibold text-lg">Random</Text>
          <View className="border border-black mt-5 mr-5 mb-5 p-5 rounded-lg">
            <Text className="font-pregular mx-auto mb-1">Speed</Text>
            <View className="mx-auto mb-5">
              <View className="w-[60%] flex flex-row justify-between items-center">
                <TouchableOpacity>
                  <MinusCircle size={30} />
                </TouchableOpacity>
                <View className="bg-grey-200 rounded-md w-[80%]">
                  <Text className="font-pbold text-white mx-auto pt-1 pb-1">
                    100 KMH
                  </Text>
                </View>
                <TouchableOpacity>
                  <PlusCircle size={30} />
                </TouchableOpacity>
              </View>
            </View>

            <Text className="font-pregular mx-auto mb-1">Number of Balls</Text>
            <View className="mx-auto mb-5">
              <View className="w-[60%] flex flex-row justify-between items-center">
                <TouchableOpacity>
                  <MinusCircle size={30} />
                </TouchableOpacity>
                <View className="bg-grey-200 rounded-md w-[80%]">
                  <Text className="font-pbold text-white mx-auto pt-1 pb-1">
                    10
                  </Text>
                </View>
                <TouchableOpacity>
                  <PlusCircle size={30} />
                </TouchableOpacity>
              </View>
            </View>

            <Text className="font-pregular mx-auto mb-1">
              Ball Waiting Time
            </Text>
            <View className="mx-auto">
              <View className="w-[60%] flex flex-row justify-between items-center">
                <TouchableOpacity>
                  <MinusCircle size={30} />
                </TouchableOpacity>
                <View className="bg-grey-200 rounded-md w-[80%]">
                  <Text className="font-pbold text-white mx-auto pt-1 pb-1">
                    10 sec
                  </Text>
                </View>
                <TouchableOpacity>
                  <PlusCircle size={30} />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity>
              <View className="bg-grey-200 rounded-3xl mt-10 p-2 w-[40%] mx-auto mb-2">
                <Text className="font-psemibold text-white mx-auto">Play</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <RNPickerSelect>
            onValueChange={(value) => setSelectedValue(value)}
            items={items}
            placeholder=
            {{
              label: "Select an option...",
              value: null,
            }}
          </RNPickerSelect>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Session;
