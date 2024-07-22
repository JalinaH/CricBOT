import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions, StatusBar } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, firestore } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const Stats = () => {
  const [dailyData, setDailyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const statsRef = doc(firestore, "PlayerStats", user.uid);
          const statsSnapshot = await getDoc(statsRef);

          if (statsSnapshot.exists()) {
            const userData = statsSnapshot.data();
            const allData = processData(userData);

            const today = getCurrentDate();
            const oneWeekAgo = getPastDate(7);
            const oneMonthAgo = getPastDate(30);

            const todayData = allData.filter((item) => item.date === today);
            const weekData = allData.filter(
              (item) => item.date >= oneWeekAgo && item.date <= today
            );
            const monthData = allData.filter(
              (item) => item.date >= oneMonthAgo && item.date <= today
            );

            setDailyData(todayData.map((item) => item.count));
            setWeeklyData(weekData.map((item) => item.count));
            setMonthlyData(monthData.map((item) => item.count));
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    const processData = (userData) => {
      if (!userData || !userData.balls || !Array.isArray(userData.balls)) {
        return [];
      }
      try {
        const groupedData = userData.balls.reduce((acc, { date, count }) => {
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date] += typeof count === "number" ? count : 0;
          return acc;
        }, {});

        return Object.entries(groupedData)
          .map(([date, count]) => ({ date, count }))
          .sort((a, b) => a.date.localeCompare(b.date));
      } catch (error) {
        console.error("Error processing data:", error);
        return [];
      }
    };

    const getCurrentDate = () => {
      const today = new Date();
      return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(today.getDate()).padStart(2, "0")}`;
    };

    const getPastDate = (days) => {
      const date = new Date();
      date.setDate(date.getDate() - days);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(date.getDate()).padStart(2, "0")}`;
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

  const formatChartData = (data, labelPrefix) => ({
    labels: data.map((_, index) => `${labelPrefix} ${index + 1}`),
    datasets: [
      {
        data,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      },
    ],
  });

  return (
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: "#FFFFFF" }}>
        <View style={{ alignItems: "center", padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#000000" }}>
            Player Stats
          </Text>

          <Text style={{ fontSize: 20, marginVertical: 10, color: "#000000" }}>
            Today
          </Text>
          {dailyData.length > 0 ? (
            <LineChart
              data={formatChartData(dailyData, "Hour")}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              style={{ marginVertical: 10 }}
            />
          ) : (
            <Text>No data available for today</Text>
          )}

          <Text style={{ fontSize: 20, marginVertical: 10, color: "#000000" }}>
            Past Week
          </Text>
          {weeklyData.length > 0 ? (
            <LineChart
              data={formatChartData(weeklyData, "Day")}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              style={{ marginVertical: 10 }}
            />
          ) : (
            <Text>No data available for the past week</Text>
          )}

          <Text style={{ fontSize: 20, marginVertical: 10, color: "#000000" }}>
            Past Month
          </Text>
          {monthlyData.length > 0 ? (
            <BarChart
              data={formatChartData(monthlyData, "Week")}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              style={{ marginVertical: 10 }}
            />
          ) : (
            <Text>No data available for the past month</Text>
          )}
        </View>

        <StatusBar style="light" backgroundColor="#1C2120" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Stats;
