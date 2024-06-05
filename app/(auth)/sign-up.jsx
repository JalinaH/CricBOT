import { View, Text, SafeAreaView, Image, ScrollView } from "react-native";
import React from "react";

import images from "../../constants/images";
import FormField from "../../components/FormField";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";

const Signin = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="bg-white h-[90vh] rounded-3xl mt-[20vh]">
          <Text className="font-pbold text-3xl text-center mt-10">
            Sign Up to CricBOT
          </Text>
          <View className="">
            <Text className="font-pregular text-center text-m text-grey-200 mt-[10px]">
              Already have an account?{" "}
              <Link href="sign-in" className="font-psemibold">
                Sign In
              </Link>
            </Text>
          </View>

          <FormField
            title={"Username"}
            placeholder={"Enter your username"}
            otherStyles={"mt-5"}
          />
          <FormField title={"Email"} placeholder={"Enter your email"} />

          <FormField title={"Password"} placeholder={"Enter your password"} />

          <CustomButton
            title={"Sign Up"}
            handlePress={() => {}}
            containerStyles={"mt-[50px] w-[80%] mx-auto"}
          />
        </View>

        <StatusBar style="light" backgroundColor="#1C2120" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;
