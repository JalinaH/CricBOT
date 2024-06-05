import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import icons from "../constants/icons";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base font-pmedium text-black mt-7 pl-[45px]">
        {title}
      </Text>

      <View className="w-[80%] h-16 px-4 bg-gray-300 border-2 border-gray-600 rounded-2xl mx-auto focus:border-primary flex flex-row items-center">
        <TextInput
          className="flex-1 font-psemibold text-grey-200 text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#4D4C4C"}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image  
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
