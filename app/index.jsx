import React, { useEffect, useState } from "react";
import { Redirect, router } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { getAuth } from "firebase/auth";
import images from "../constants/images";
import CustomButton from "../components/CustomButton";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Something went wrong.</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

export default function Page() {
  const auth = getAuth();
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Component mounted");

    const timeoutId = setTimeout(() => {
      if (loading) {
        console.log("Auth check timed out");
        setLoading(false);
        setError("Authentication check timed out");
      }
    }, 10000); 

    const unsubscribe = auth.onAuthStateChanged((user) => {
      try {
        console.log("Auth state changed", user ? "User logged in" : "No user");
        if (user) {
          setUser(user);
          setIsLogged(true);
        } else {
          setIsLogged(false);
        }
      } catch (error) {
        console.error("Auth error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
        clearTimeout(timeoutId);
      }
    });

    return () => {
      console.log("Component will unmount");
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, []);

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1C2120",
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1C2120",
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  if (isLogged) {
    console.log("User is logged in, will redirect to Home");
    setTimeout(() => {
      router.push("/Home");
    }, 1000);
    return null;
  }

  return (
    <ErrorBoundary>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#1C2120" }}>
        <View
          style={{
            backgroundColor: "white",
            height: "80%",
            marginTop: "20%",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <View>
            <Image
              source={images.logo}
              style={{
                width: 128,
                height: 128,
                alignSelf: "center",
                marginTop: 40,
              }}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 24,
                textAlign: "center",
                marginTop: 45,
              }}
            >
              Welcome to CricBOT
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                color: "#666",
                marginTop: 10,
                paddingHorizontal: 20,
              }}
            >
              Experience the future of cricket training with CricBOT! Our
              automated cricket practice machine is designed to help you perfect
              your skills with precision and ease. Seamlessly control the
              machine through our intuitive mobile app and take your game to the
              next level. Ready to get started?
            </Text>
          </View>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles={{
              marginTop: 40,
              width: "80%",
              alignSelf: "center",
            }}
          />
        </View>

        <StatusBar style="light" backgroundColor="#1C2120" />
      </SafeAreaView>
    </ErrorBoundary>
  );
}