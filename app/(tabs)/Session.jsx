import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { MinusCircle, PlusCircle } from "phosphor-react-native";
import { getAuth } from "firebase/auth";
import { firestore } from "../../firebase/firebase";
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";
import { getCurrentDate } from "../../utils/dateUtils";
import images from "../../constants/images";

const Session = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { title } = route.params || { title: "Random" };

  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [selectedValue, setSelectedValue] = useState(title);
  const [speed, setSpeed] = useState(70);
  const [balls, setBalls] = useState(10);
  const [ballWaitingTime, setBallWaitingTime] = useState(10);
  const [sessions, setSessions] = useState(0);
  const [totalBalls, setTotalBalls] = useState(0);
  const [hasConnected, setHasConnected] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    setSelectedValue(title);
  }, [title]);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        console.log("Checking connection...");
        const response = await fetch("http://192.168.216.73/status");
        if (response.ok) {
          const text = await response.text();
          console.log("Status response:", text);
          if (text === "OK") {
            setIsConnected(true);
            setConnectionStatus("Connected");
            console.log("Connection established");

            // Only send CONNECT command if we haven't connected before
            if (!hasConnected) {
              console.log("Sending CONNECT command...");
              const connectResponse = await fetch(
                "http://192.168.216.73/connect"
              );
              if (connectResponse.ok) {
                const connectText = await connectResponse.text();
                console.log("CONNECT command response:", connectText);
                setHasConnected(true);
              } else {
                console.error(
                  "Failed to send CONNECT command, status:",
                  connectResponse.status
                );
                const errorText = await connectResponse.text();
                console.error("Error details:", errorText);
              }
            }
          } else {
            setIsConnected(false);
            setConnectionStatus("Disconnected");
            setHasConnected(false);
            console.log("Unexpected status response");
          }
        } else {
          setIsConnected(false);
          setConnectionStatus("Disconnected");
          setHasConnected(false);
          console.log("Status check failed, status:", response.status);
        }
      } catch (error) {
        setIsConnected(false);
        setConnectionStatus("Disconnected");
        setHasConnected(false);
        console.error("Connection error:", error);
      }
    };

    checkConnection();

    const intervalId = setInterval(checkConnection, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
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
      }
    };

    fetchStats();
  }, [user]);

  const increaseSpeed = () =>
    setSpeed((prevSpeed) => Math.min(prevSpeed + 10, 130));
  const decreaseSpeed = () =>
    setSpeed((prevSpeed) => Math.max(prevSpeed - 10, 50));
  const increaseBalls = () =>
    setBalls((prevBalls) => Math.min(prevBalls + 1, 20));
  const decreaseBalls = () =>
    setBalls((prevBalls) => Math.max(prevBalls - 1, 1));
  const increaseBallWaitingTime = () =>
    setBallWaitingTime((prevTime) => Math.min(prevTime + 5, 60));
  const decreaseBallWaitingTime = () =>
    setBallWaitingTime((prevTime) => Math.max(prevTime - 5, 10));

  const handlePress = async () => {
    if (!isConnected) {
      Alert.alert(
        "Not Connected",
        "Please connect to the CricBOT_Network Wi-Fi before starting a session.",
        [{ text: "OK" }]
      );
      return;
    }

    if (selectedValue.toLowerCase() === "random") {
      Alert.alert(
        "Under Development",
        "This mode is still under development. Please select another mode."
      );
      return;
    }

    try {
      // Send session data to ESP8266
      const mode = selectedValue.toLowerCase();
      const response = await fetch(
        `http://192.168.216.73/start?mode=${mode}&balls=${balls}&delay=${ballWaitingTime}`
      );

      if (response.ok) {
        Alert.alert("Session Started", "Machine started.");

        // Save session data to Firestore
        if (user) {
          const statsRef = doc(firestore, "PlayerStats", user.uid);
          const currentDate = getCurrentDate();
          const docSnap = await getDoc(statsRef);

          const newSessions = sessions + 1;
          const newTotalBalls = totalBalls + balls;

          if (docSnap.exists()) {
            await updateDoc(statsRef, {
              balls: arrayUnion({ date: currentDate, count: balls }),
              sessions: newSessions,
              totalBalls: newTotalBalls,
            });
          } else {
            await setDoc(statsRef, {
              balls: [{ date: currentDate, count: balls }],
              sessions: 1,
              totalBalls: balls,
            });
          }

          setSessions(newSessions);
          setTotalBalls(newTotalBalls);
        }

        navigation.goBack();
      } else {
        throw new Error("Failed to start the machine");
      }
    } catch (error) {
      console.error("Error starting machine: ", error);
      Alert.alert("Error", "Failed to start the machine.");
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
        </View>

        <View className="mt-10 ml-5">
          <Text className="font-psemibold text-lg">{selectedValue}</Text>
          <View className="border border-black mt-5 mr-5 mb-5 p-5 rounded-lg">
            <Text className="font-pregular mx-auto mb-1">Speed</Text>
            <View className="mx-auto mb-5">
              <View className="w-[60%] flex flex-row justify-between items-center">
                <TouchableOpacity onPress={decreaseSpeed}>
                  <MinusCircle size={30} />
                </TouchableOpacity>
                <View className="bg-grey-200 rounded-md w-[80%]">
                  <Text className="font-pbold text-white mx-auto pt-1 pb-1">
                    {speed} KMH
                  </Text>
                </View>
                <TouchableOpacity onPress={increaseSpeed}>
                  <PlusCircle size={30} />
                </TouchableOpacity>
              </View>
            </View>

            <Text className="font-pregular mx-auto mb-1">Number of Balls</Text>
            <View className="mx-auto mb-5">
              <View className="w-[60%] flex flex-row justify-between items-center">
                <TouchableOpacity onPress={decreaseBalls}>
                  <MinusCircle size={30} />
                </TouchableOpacity>
                <View className="bg-grey-200 rounded-md w-[80%]">
                  <Text className="font-pbold text-white mx-auto pt-1 pb-1">
                    {balls} Balls
                  </Text>
                </View>
                <TouchableOpacity onPress={increaseBalls}>
                  <PlusCircle size={30} />
                </TouchableOpacity>
              </View>
            </View>

            <Text className="font-pregular mx-auto mb-1">
              Ball Waiting Time
            </Text>
            <View className="mx-auto">
              <View className="w-[60%] flex flex-row justify-between items-center">
                <TouchableOpacity onPress={decreaseBallWaitingTime}>
                  <MinusCircle size={30} />
                </TouchableOpacity>
                <View className="bg-grey-200 rounded-md w-[80%]">
                  <Text className="font-pbold text-white mx-auto pt-1 pb-1">
                    {ballWaitingTime} sec
                  </Text>
                </View>
                <TouchableOpacity onPress={increaseBallWaitingTime}>
                  <PlusCircle size={30} />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={handlePress}>
              <View className="bg-grey-200 rounded-3xl mt-10 p-2 w-[40%] mx-auto mb-2">
                <Text className="font-pbold text-white mx-auto pt-1 pb-1">
                  {isConnected ? "Play" : "Connect"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {!isConnected && (
          <View className="mt-5 mx-5 p-3 bg-yellow-100 rounded-md">
            <Text className="text-yellow-800">
              Please connect to the CricBOT_Network Wi-Fi to use the app.
            </Text>
          </View>
        )}

        <StatusBar style="light" backgroundColor="#1C2120" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Session;
