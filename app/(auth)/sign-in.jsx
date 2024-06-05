import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React from 'react'

import images from '../../constants/images'
import FormField from '../../components/FormField';
import { StatusBar } from 'expo-status-bar';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';

const Signin = () => {
  

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="bg-white h-[120px] w-[120px] rounded-xl mx-auto mt-[110px] mb-20">
          <Image
            source={images.logo}
            className="w-[100px] h-[100px] justify-center mx-auto my-auto"
            resizeMode="contain"
          />
        </View>

        <View className="bg-white h-[90%] rounded-3xl">
          <Text className="font-pbold text-3xl text-center mt-10">
            Log in to CricBOT
          </Text>

          <FormField
            title={"Email"}
            placeholder={"Enter your email"}
            otherStyles={"mt-5"}
          />

          <FormField title={"Password"} placeholder={"Enter your password"} />

          <CustomButton
            title={"Sign In"}
            handlePress={() => {}}
            containerStyles={"mt-[50px] w-[80%] mx-auto mt-[80px]"}
          />

          <View className="flex flex-row justify-center mt-5">
            <Text className="font-pmedium text-black">
              Don't have an account?
            </Text>
            <Link href="sign-up" className="font-psemibold">
              {" "}
              SignUp
            </Link>
          </View>
          <View className="flex flex-row justify-center mt-1 mb-5">
            <Text className="font-pmedium text-black">
              Forgot your password?
            </Text>
          </View>
        </View>

        <StatusBar style="light" backgroundColor="#1C2120" />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Signin