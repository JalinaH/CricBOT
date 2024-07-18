import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions, StatusBar } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, firestore } from "../../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

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
          const statsRef = collection(
            firestore,
            `PlayerStats/${user.uid}/balls`
          );

          const todayQuery = query(
            statsRef,
            where("date", "==", getCurrentDate())
          );
          const todaySnapshot = await getDocs(todayQuery);
          const todayData = processData(todaySnapshot);

          const pastWeekQuery = query(
            statsRef,
            where("date", ">=", getPastDate(7))
          );
          const pastWeekSnapshot = await getDocs(pastWeekQuery);
          const pastWeekData = processData(pastWeekSnapshot);

          const pastMonthQuery = query(
            statsRef,
            where("date", ">=", getPastDate(30))
          );
          const pastMonthSnapshot = await getDocs(pastMonthQuery);
          const pastMonthData = processData(pastMonthSnapshot);

          setDailyData(todayData);
          setWeeklyData(pastWeekData);
          setMonthlyData(pastMonthData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    const processData = (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push(doc.data().count); 
      });
      return data;
    };

    const getCurrentDate = () => {
      const today = new Date();
      return `${today.getFullYear()}/${
        today.getMonth() + 1
      }/${today.getDate()}`;
    };

    const getPastDate = (days) => {
      const date = new Date();
      date.setDate(date.getDate() - days);
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
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
            Today
          </Text>
          {dailyData.length > 0 && (
            <LineChart
              data={{
                labels: dailyData.map((_, index) => `Hour ${index + 1}`),
                datasets: [
                  {
                    data: dailyData,
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
        </View>

        <StatusBar style="light" backgroundColor="#1C2120" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Stats;
