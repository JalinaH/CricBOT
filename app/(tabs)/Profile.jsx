import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { UserCircle, Question, Info, AddressBook } from "phosphor-react-native";
import { PencilSimple, ShareNetwork } from "phosphor-react-native";
import { BellSimple, Key } from "phosphor-react-native";

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
              <View className="h-10 w-[100%] bg-[#EDEDED] justify-center mt-10 ">
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
              <View className="h-10 w-[100%] bg-[#EDEDED] justify-center mt-10 ">
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
