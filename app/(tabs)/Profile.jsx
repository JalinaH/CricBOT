import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { UserCircle } from "phosphor-react-native";

const Profile = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="">
          <View className="mt-20 items-center">
            <UserCircle size={150} />
            <View className="justify-center items-center">
              <Text className="font-psemibold text-lg">Jalina Hirushan</Text>
              <Text className="font-plight text-[12px] text-grey-100">
                jalinahirushan2002@gmail.com
              </Text>
            </View>
          </View>

          <View>
            <View>
              <Text className="font-pbold text-lg mt-10 ml-5">Account</Text>
              <View className="mt-5">
                <Text className="font-psemibold ml-5">Edit Profile</Text>
                <Text className="font-psemibold ml-5">Change Password</Text>
                <Text className="font-psemibold ml-5">Logout</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
