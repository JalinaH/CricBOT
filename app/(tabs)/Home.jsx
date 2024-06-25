import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import images from "../../constants/images";
import icons from "../../constants/icons";

const Home = ({ user }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [sessions, setSessions] = useState(0);
  const [totalBalls, setTotalBalls] = useState(0);

  const navigation = useNavigation();

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

  const handlePress = (title) => {
    navigation.navigate("Session", { title });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Image
              source={images.logo}
              style={{
                width: 100,
                height: 100,
                justifyContent: "center",
                marginTop: 10,
              }}
              resizeMode="contain"
            />
            <View style={{ marginTop: 15 }}>
              <Text style={{ fontSize: 24, fontWeight: "600" }}>CricBOT</Text>
              <Text style={{ fontSize: 18, fontWeight: "300" }}>
                Smart Cricket Trainer
              </Text>
            </View>
            <Text
              style={{
                fontWeight: "300",
                marginLeft: 10,
                marginTop: 10,
                color: isConnected ? "green" : "red",
              }}
            >
              {connectionStatus}
            </Text>
          </View>
        </View>

        <View
          style={{ flexDirection: "row", width: "100%", marginVertical: 20 }}
        >
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontWeight: "600", fontSize: 18 }}>{sessions}</Text>
            <Text style={{ color: "#888888" }}>Sessions</Text>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontWeight: "600", fontSize: 18 }}>
              {totalBalls}
            </Text>
            <Text style={{ color: "#888888" }}>Balls</Text>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontWeight: "600", fontSize: 18 }}>160</Text>
            <Text style={{ color: "#888888" }}>Minutes</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "500" }}>Quick Start</Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Show All</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{ flexDirection: "column", marginLeft: 20, marginTop: 10 }}
        >
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <TouchableOpacity onPress={() => handlePress("Random")}>
              <Image
                source={images.random}
                style={{ width: 110, height: 110, marginRight: 10 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("Bouncer Ball")}>
              <Image
                source={images.bouncer}
                style={{ width: 110, height: 110 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("Yorker Ball")}>
              <Image
                source={images.yorker}
                style={{ width: 110, height: 110, marginLeft: 10 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <TouchableOpacity onPress={() => handlePress("Fast Ball")}>
              <Image
                source={images.fast}
                style={{ width: 110, height: 110 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("Slow Ball")}>
              <Image
                source={images.slow}
                style={{ width: 110, height: 110, marginLeft: 10 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("Swing Ball")}>
              <Image
                source={images.swing}
                style={{ width: 110, height: 110, marginLeft: 10 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginLeft: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>LEVELS</Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={images.beginner}
              style={{ width: 70, height: 70, marginRight: 10 }}
              resizeMode="contain"
            />
            <View>
              <Text style={{ fontWeight: "600", fontSize: 18 }}>
                Beginner Plans
              </Text>
              <Text style={{ fontWeight: "300" }}>Recommend for first use</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <Image
                  source={icons.star}
                  style={{ width: 15, height: 15 }}
                  resizeMode="contain"
                />
                <Text style={{ fontWeight: "300", marginLeft: 5 }}>
                  30 Sessions
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Image
              source={images.pro}
              style={{ width: 70, height: 70, marginRight: 10 }}
              resizeMode="contain"
            />
            <View>
              <Text style={{ fontWeight: "600", fontSize: 18 }}>
                Advanced Plans
              </Text>
              <Text style={{ fontWeight: "300" }}>
                Recommend for previous users
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <Image
                  source={icons.star}
                  style={{ width: 15, height: 15 }}
                  resizeMode="contain"
                />
                <Text style={{ fontWeight: "300", marginLeft: 5 }}>
                  Custom Sessions
                </Text>
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
