import { View, Text, ScrollView, Dimensions } from "react-native";
import React from "react";
import { LineChart, BarChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";

const Stats = () => {
  // Example data for the charts
  const weeklyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black line color
      },
    ],
  };

  const monthlyData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        data: [200, 450, 280, 800],
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black bar color
      },
    ],
  };

  const sixMonthsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [1200, 1450, 1280, 1800, 1300, 1500],
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black line color
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFFFF",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black color for text and lines
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    propsForLabels: {
      fontSize: 12,
      fontWeight: "bold",
    },
  };

  const screenWidth = Dimensions.get("window").width;

  return (
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: "#FFFFFF" }}>
        <View style={{ alignItems: "center", padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#000000" }}>
            Player Stats
          </Text>

          <Text style={{ fontSize: 20, marginVertical: 10, color: "#000000" }}>
            Past Week
          </Text>
          <LineChart
            data={weeklyData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            style={{ marginVertical: 10 }}
          />

          <Text style={{ fontSize: 20, marginVertical: 10, color: "#000000" }}>
            Past Month
          </Text>
          <BarChart
            data={monthlyData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            style={{ marginVertical: 10 }}
          />

          <Text style={{ fontSize: 20, marginVertical: 10, color: "#000000" }}>
            Past Six Months
          </Text>
          <LineChart
            data={sixMonthsData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            style={{ marginVertical: 10 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Stats;
