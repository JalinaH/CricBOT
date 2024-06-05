import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React from "react";

import images from "../../constants/images";
import FormField from "../../components/FormField";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../firebase/firebase";

const Signin = () => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Please fill all fields");
    }

    setisSubmitting(true);

    try {
      await createUser(form.email, form.password);
      setisSubmitting(false);

      Alert.alert("Success","User signed up successfully");
      router.replace("/home");
    } catch (error) {
      setisSubmitting(false);
      Alert.alert("Error",error.message);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="bg-white h-[120px] w-[120px] rounded-xl mx-auto mb-10 mt-20">
          <Image
            source={images.logo}
            className="w-[100px] h-[100px] justify-center mx-auto my-auto"
            resizeMode="contain"
          />
        </View>
        <View className="bg-white h-[80%] rounded-3xl">
          <Text className="font-pbold text-3xl text-center mt-10">
            Sign Up to CricBOT
          </Text>

          <FormField
            title={"Username"}
            value={form.username}
            placeholder={"Enter your username"}
            otherStyles={"mt-5"}
          />
          <FormField
            title={"Email"}
            value={form.email}
            placeholder={"Enter your email"}
          />

          <FormField
            title={"Password"}
            value={form.password}
            placeholder={"Enter your password"}
          />

          <CustomButton
            title={"Sign Up"}
            handlePress={submit}
            containerStyles={"mt-[50px] w-[80%] mx-auto mb-5"}
          />
          <View className="mb-6">
            <Text className="font-pregular text-center text-m text-grey-200">
              Already have an account?{" "}
              <Link href="sign-in" className="font-psemibold">
                Sign In
              </Link>
            </Text>
          </View>
        </View>

        <StatusBar style="light" backgroundColor="#1C2120" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;
