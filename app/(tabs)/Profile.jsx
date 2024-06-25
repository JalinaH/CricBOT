import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  UserCircle,
  Question,
  Info,
  AddressBook,
  PencilSimple,
  ShareNetwork,
  BellSimple,
  Key,
  SignOut,
} from "phosphor-react-native";
import { auth, signOutUser } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "expo-router"; // If you're using expo-router

const Profile = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const router = useRouter(); // If you're using expo-router

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName);
        setMail(user.email);
      } else {
        console.log("User is logged out");
        setName(null);
        setMail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    Alert.alert(
      "Confirm Signout",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Signout cancelled"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await signOutUser();
              Alert.alert("Success", "User signed out successfully");
              router.replace("/sign-in"); // Redirect to sign-in page
            } catch (error) {
              Alert.alert("Error", error.message);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View className="mt-20 items-center">
            <UserCircle size={150} />
            <View className="justify-center items-center">
              <Text className="font-psemibold text-lg">{name}</Text>
              <Text className="font-plight text-[12px] text-grey-100">
                {mail}
              </Text>
            </View>
          </View>

          <View>
            <View>
              <View className="h-10 w-[100%] bg-[#EDEDED] justify-center mt-10">
                <Text className="font-pregular ml-5 text-grey-100 text-lg">
                  Account
                </Text>
              </View>

              <View className="mt-5 ml-5">
                <TouchableOpacity>
                  <View className="flex flex-row mb-2 items-center">
                    <PencilSimple size={18} className="mr-2" />
                    <Text className="font-pregular text-sm">Edit Profile</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View className="flex flex-row mb-2 items-center">
                    <Key size={18} className="mr-2" />
                    <Text className="font-pregular text-sm">
                      Change Password
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View className="flex flex-row mb-2 items-center">
                    <BellSimple size={18} className="mr-2" />
                    <Text className="font-pregular text-sm">Notification</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <View className="h-10 w-[100%] bg-[#EDEDED] justify-center mt-10">
                <Text className="font-pregular ml-5 text-grey-100 text-lg">
                  Support
                </Text>
              </View>
              <View className="mt-5 ml-5">
                <TouchableOpacity>
                  <View className="flex flex-row mb-2 items-center">
                    <Question size={18} className="mr-2" />
                    <Text className="font-pregular text-sm">Help</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View className="flex flex-row mb-2 items-center">
                    <AddressBook size={18} className="mr-2" />
                    <Text className="font-pregular text-sm">Contact Us</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View className="flex flex-row mb-2 items-center">
                    <Info size={18} className="mr-2" />
                    <Text className="font-pregular text-sm">About Us</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View className="flex flex-row mb-2 items-center">
                    <ShareNetwork size={18} className="mr-2" />
                    <Text className="font-pregular text-sm">Share App</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="ml-5">
            <TouchableOpacity onPress={handleSignOut}>
              <View className="mt-10 flex flex-row mb-2 items-center">
                <SignOut size={18} className="text-red-600 mr-2" />
                <Text className="text-sm font-pregular text-red-600">
                  SignOut
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
