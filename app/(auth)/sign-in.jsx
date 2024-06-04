import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'

import images from '../../constants/images'
import FormField from '../../components/FormField';
import { StatusBar } from 'expo-status-bar';
import CustomButton from '../../components/CustomButton';

const Signin = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="bg-white h-[120px] w-[120px] rounded-xl mx-auto mt-[110px] mb-20">
        <Image 
          source={images.logo}
          className="w-[100px] h-[100px] justify-center mx-auto my-auto"
          resizeMode="contain"
        />
      </View>

      <View className="bg-white h-[80%] rounded-3xl mt-5">
        <Text className="font-pbold text-3xl text-center mt-7">
          Log in to CricBOT
        </Text>

        <FormField />

        <FormField />

        <CustomButton 
          title={"Sign In"}
          handlePress={() => {}}
          containerStyles={"mt-5 w-[80%] mx-auto"}
        />
      </View>

      <StatusBar style="light" backgroundColor="#1C2120" />
    </SafeAreaView>
  );
}

export default Signin