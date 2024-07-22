import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import images from "../../constants/images";
import icons from "../../constants/icons";

const Home = ({ user }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [sessions, setSessions] = useState(0);
  const [totalBalls, setTotalBalls] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const checkConnection = async () => {
        try {
          const response = await fetch("http://10.10.19.179/status");
          if (response.ok) {
            const text = await response.text();
            if (text === "OK") {
              setIsConnected(true);
              setConnectionStatus("Connected");
            } else {
              setIsConnected(false);
              setConnectionStatus("Disconnected");
            }
          } else {
            setIsConnected(false);
            setConnectionStatus("Disconnected");
          }
        } catch (error) {
          setIsConnected(false);
          setConnectionStatus("Disconnected");
          console.error("Connection error:", error);
        }
      };

      const fetchStats = async () => {
        setIsLoading(true);
        try {
          if (user) {
            const statsRef = doc(firestore, "PlayerStats", user.uid);
            const docSnap = await getDoc(statsRef);

            if (docSnap.exists()) {
              const data = docSnap.data();
              setSessions(data.sessions || 0);
              setTotalBalls(data.totalBalls || 0);
            }
          }
        } catch (error) {
          console.error("Error fetching stats: ", error);
        } finally {
          setIsLoading(false);
        }
      };

      checkConnection();
      fetchStats();

      const intervalId = setInterval(checkConnection, 5000);
      return () => clearInterval(intervalId);
    }, [user])
  );

  const handlePress = (title) => {
    if (isConnected) {
      navigation.navigate("Session", { title });
    } else {
      Alert.alert(
        "Not Connected",
        "Please connect to the CricBOT_Network Wi-Fi before starting a session.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex flex-row items-center mt-3 justify-between">
          <View className="flex flex-row items-center">
            <Image
              source={images.logo}
              className="w-20 h-20 justify-center mt-5"
              resizeMode="contain"
            />
            <View className="mt-7">
              <Text className="text-xl font-psemibold">CricBOT</Text>
              <Text className="text-lg font-plight">Smart Cricket Trainer</Text>
            </View>
          </View>

          <Text
            className="font-plight mr-5 mt-5"
            style={{ color: isConnected ? "green" : "red" }}
          >
            {connectionStatus}
          </Text>
        </View>

        <View className="mt-10 flex flex-row w-[100%] mx-auto">
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            <>
              <View className="flex flex-col w-[33%] items-center">
                <Text className="font-psemibold text-lg">{sessions}</Text>
                <Text className="text-grey-100">Sessions</Text>
              </View>
              <View className="flex flex-col w-[33%] items-center">
                <Text className="font-psemibold text-lg">{totalBalls}</Text>
                <Text className="text-grey-100">Balls</Text>
              </View>
              <View className="flex flex-col w-[33%] items-center">
                <Text className="font-psemibold text-lg">160</Text>
                <Text className="text-grey-100">Minutes</Text>
              </View>
            </>
          )}
        </View>

        <View className="flex flex-row justify-between items-center mt-10 mx-5">
          <Text className="font-psemibold text-[16px]">Quick Start</Text>
          <TouchableOpacity>
            <Text className="font-psemibold text-[16px]">Show All</Text>
          </TouchableOpacity>
        </View>

        <View className="flex flex-col justify-center items-center mt-5 mx-5">
          <View className="flex flex-row">
            <TouchableOpacity onPress={() => handlePress("Random")}>
              <Image
                source={images.random}
                className="w-[104px] h-[110px] mr-2"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("Bouncer Ball")}>
              <Image
                source={images.bouncer}
                className="w-[110px] h-[110px] mr-2"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("Yorker Ball")}>
              <Image
                source={images.yorker}
                className="w-[110px] h-[110px]"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View className="flex flex-row mt-2">
            <TouchableOpacity onPress={() => handlePress("Fast Ball")}>
              <Image
                source={images.fast}
                className="w-[110px] h-[110px] mr-2"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("Slow Ball")}>
              <Image
                source={images.slow}
                className="w-[110px] h-[110px] mr-2"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("Swing Ball")}>
              <Image
                source={images.swing}
                className="w-[110px] h-[110px]"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="ml-5 mt-10">
          <Text className="font-psemibold text-[16px]">LEVELS</Text>
          <View className="flex flex-row items-center mt-5 mb-2">
            <Image
              source={images.beginner}
              className="w-[70px] h-[70px] mr-5"
              resizeMode="contain"
            />
            <View>
              <Text className="font-psemibold text-lg">Beginner Plans</Text>
              <Text className="font-plight">Recommend for first use</Text>
              <View className="flex flex-row items-center">
                <Image
                  source={icons.star}
                  className="w-[15px] h-[15px] mr-1"
                  resizeMode="contain"
                />
                <Text className="font-plight text-sm">30 Sessions</Text>
              </View>
            </View>
          </View>

          <View className="flex flex-row items-center mt-5 mb-5">
            <Image
              source={images.pro}
              className="w-[70px] h-[70px] mr-5"
              resizeMode="contain"
            />
            <View>
              <Text className="font-psemibold text-lg">Advanced Plans</Text>
              <Text className="font-plight">Recommend for previous users</Text>
              <View className="flex flex-row items-center">
                <Image
                  source={icons.star}
                  className="w-[15px] h-[15px] mr-1"
                  resizeMode="contain"
                />
                <Text className="font-plight text-sm">Custom Sessions</Text>
              </View>
            </View>
          </View>
        </View>

        <StatusBar style="light" backgroundColor="#1C2120" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
