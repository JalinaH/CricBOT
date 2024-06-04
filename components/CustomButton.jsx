import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({ title, handlePress, containerStyles }) => {
  return (
    <TouchableOpacity
      className={`bg-primary rounded-xl min-h-[62px] flex flex-row justify-center items-center mx-auto ${containerStyles}`}
      onPress={handlePress}
    >
      <Text className="font-psemibold text-lg text-gray-200">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
