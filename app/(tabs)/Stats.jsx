import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, firestore } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const Stats = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [sixMonthsData, setSixMonthsData] = useState([]);
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const statsRef = doc(firestore, "PlayerStats", user.uid);
        const docSnap = await getDoc(statsRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setWeeklyData(data.weekly);
          setMonthlyData(data.monthly);
          setSixMonthsData(data.sixMonths);
        }
      }
    };

    fetchData();
  }, []);

  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFFFF",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForLabels: {
      fontSize: 12,
      fontWeight: "bold",
    },
  };

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
          {weeklyData.length > 0 && (
            <LineChart
              data={{
                labels: weeklyData.map((_, index) => `Day ${index + 1}`),
                datasets: [
                  {
                    data: weeklyData,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  },
                ],
              }}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              style={{ marginVertical: 10 }}
            />
          )}

          <Text style={{ fontSize: 20, marginVertical: 10, color: "#000000" }}>
            Past Month
          </Text>
          {monthlyData.length > 0 && (
            <BarChart
              data={{
                labels: monthlyData.map((_, index) => `Week ${index + 1}`),
                datasets: [
                  {
                    data: monthlyData,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  },
                ],
              }}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              style={{ marginVertical: 10 }}
            />
          )}

          <Text style={{ fontSize: 20, marginVertical: 10, color: "#000000" }}>
            Past Six Months
          </Text>
          {sixMonthsData.length > 0 && (
            <LineChart
              data={{
                labels: sixMonthsData.map((_, index) => `Month ${index + 1}`),
                datasets: [
                  {
                    data: sixMonthsData,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  },
                ],
              }}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              style={{ marginVertical: 10 }}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Stats;
