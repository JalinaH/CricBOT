import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  Image,
} from "react-native";
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
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    setSelectedValue(title);
  }, [title]);

  useEffect(() => {
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

  const increaseSpeed = () => {
    setSpeed((prevSpeed) =>
      prevSpeed + 10 <= 130 ? prevSpeed + 10 : prevSpeed
    );
  };

  const decreaseSpeed = () => {
    setSpeed((prevSpeed) =>
      prevSpeed - 10 >= 50 ? prevSpeed - 10 : prevSpeed
    );
  };

  const increaseBalls = () => {
    setBalls((prevBalls) => (prevBalls + 1 <= 20 ? prevBalls + 1 : prevBalls));
  };

  const decreaseBalls = () => {
    setBalls((prevBalls) => (prevBalls - 1 >= 1 ? prevBalls - 1 : prevBalls));
  };

  const increaseBallWaitingTime = () => {
    setBallWaitingTime((prevTime) =>
      prevTime + 5 <= 60 ? prevTime + 5 : prevTime
    );
  };

  const decreaseBallWaitingTime = () => {
    setBallWaitingTime((prevTime) =>
      prevTime - 5 >= 10 ? prevTime - 5 : prevTime
    );
  };

  const handlePress = async () => {
    if (selectedValue === "random") {
      Alert.alert(
        "This mode is still under development. Please select another mode."
      );
    } else {
      try {
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

          Alert.alert("Session data saved successfully.");
          navigation.goBack();
        }
      } catch (error) {
        console.error("Error saving session data: ", error);
        Alert.alert("Failed to save session data.");
      }
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
                  Play
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <StatusBar style="light" backgroundColor="#1C2120" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Session;
