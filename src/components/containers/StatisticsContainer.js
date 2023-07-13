import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import BarChart from "./BarChart";
import FilterButton from "../buttons/FilterButton";
import axios from "axios";
import { BACKEND_SERVER_URL } from "@env";
import {
  BG_DARK,
  PRIMARY_MEDIUM,
  BG_LIGHT,
  PRIMARY_DARK,
  SECONDARY_MEDIUM,
} from "../../constants/colorCodes";

const StatisticsContainer = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [averageValue, setAverageValue] = useState(null);
  const [selectedDataType, setSelectedDataType] = useState("steps");
  const [selectedFilter, setSelectedFilter] = useState("daily");

  useEffect(() => {
    axios
      .get(`${BACKEND_SERVER_URL}/api/v1/dailyRecord/uid/111`)
      .then((response) => {
        const userData = response.data;
        const filteredData = calculateFilteredData(
          selectedFilter,
          selectedDataType,
          userData
        );
        const average = calculateAverageValue(filteredData);
        setFilteredData(filteredData);
        setAverageValue(average);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedFilter, selectedDataType]);

  const calculateFilteredData = (filter, selectedDataType, data) => {
    let newData = [];
    switch (filter) {
      case "daily":
        const today = new Date();
        const past7Days = [];
        for (let i = 7; i > 0; i--) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          past7Days.push(date.toISOString().split("T")[0]);
        }
        newData = past7Days.map((date) => {
          const record = data.find((item) => item.date.split("T")[0] === date);
          if (record) {
            return {
              label: getDayOfWeek(record.date),
              value: record[selectedDataType],
            };
          } else {
            return {
              label: getDayOfWeek(date),
              value: 0,
            };
          }
        });
        break;
      case "weekly":
        newData = [];
        for (let i = 0; i < data.length; i += 7) {
          const weekData = data.slice(i, i + 7);
          const weekSum = weekData.reduce(
            (sum, record) => sum + record[selectedDataType],
            0
          );
          newData.push({
            label: `Week ${Math.ceil((i + 1) / 7)}`,
            value: weekSum,
          });
        }
        break;
      case "6 months":
        newData = [];
        for (let i = 0; i < data.length; i += 30) {
          const monthData = data.slice(i, i + 30);
          const monthSum = monthData.reduce(
            (sum, record) => sum + record[selectedDataType],
            0
          );
          newData.push({
            label: `Month ${Math.ceil((i + 1) / 30)}`,
            value: monthSum,
          });
        }
        break;
      case "yearly":
        newData = [];
        for (let i = 0; i < data.length; i += 365) {
          const yearData = data.slice(i, i + 365);
          const yearSum = yearData.reduce(
            (sum, record) => sum + record[selectedDataType],
            0
          );
          newData.push({
            label: `Year ${Math.ceil((i + 1) / 365)}`,
            value: yearSum,
          });
        }
        break;
      default:
        newData = data.map((record) => ({
          label: record.date,
          value: record[selectedDataType],
        }));
        break;
    }
    return newData;
  };

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  };

  const calculateAverageValue = (data) => {
    const sum = data.reduce((total, item) => total + item.value, 0);
    const average = sum / data.length;
    return average;
  };

  const getDataTypeUnit = () => {
    switch (selectedDataType) {
      case "steps":
        return "Steps";
      case "calories":
        return "kcal";
      case "distance":
        return "km";
      default:
        return "";
    }
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleDataTypeChange = (dataType) => {
    setSelectedDataType(dataType);
  };

  const getDateRangeText = (filter) => {
    const today = new Date();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    switch (filter) {
      case "daily":
        const past7Days = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          past7Days.push(`${monthNames[date.getMonth()]} ${date.getDate()}`);
        }
        return `${past7Days[0]} - ${past7Days[6]}, ${today.getFullYear()}`;
      case "weekly":
        const oneMonthAgo = new Date(today);
        oneMonthAgo.setMonth(today.getMonth() - 1);
        return `${
          monthNames[oneMonthAgo.getMonth()]
        } ${oneMonthAgo.getDate()} - ${
          monthNames[today.getMonth()]
        } ${today.getDate()}, ${today.getFullYear()}`;
      case "6 months":
        const monthStartDate = new Date(today);
        monthStartDate.setMonth(today.getMonth() - 5);
        return `${
          monthNames[monthStartDate.getMonth()]
        } ${monthStartDate.getDate()} - ${
          monthNames[today.getMonth()]
        } ${today.getDate()}, ${today.getFullYear()}`;
      case "yearly":
        const lastYear = today.getFullYear() - 1;
        return `${monthNames[0]} ${today.getDate()}, ${lastYear} - ${
          monthNames[today.getMonth()]
        } ${today.getDate()}, ${today.getFullYear()}`;
      default:
        return "";
    }
  };

  return (
    <View>
      <Text style={styles.title}>Statistics</Text>
      <View style={styles.buttonContainer}>
        <FilterButton
          label="Daily"
          isActive={selectedFilter === "daily"}
          onPress={() => handleFilterChange("daily")}
          activeColor={SECONDARY_MEDIUM}
          inactiveColor={BG_LIGHT}
        />
        <FilterButton
          label="Weekly"
          isActive={selectedFilter === "weekly"}
          onPress={() => handleFilterChange("weekly")}
          activeColor={SECONDARY_MEDIUM}
          inactiveColor={BG_LIGHT}
        />
        <FilterButton
          label="6 Months"
          isActive={selectedFilter === "6 months"}
          onPress={() => handleFilterChange("6 months")}
          activeColor={SECONDARY_MEDIUM}
          inactiveColor={BG_LIGHT}
        />
        <FilterButton
          label="Yearly"
          isActive={selectedFilter === "yearly"}
          onPress={() => handleFilterChange("yearly")}
          activeColor={SECONDARY_MEDIUM}
          inactiveColor={BG_LIGHT}
        />
      </View>
      {averageValue && (
        <Text style={styles.averageText}>
          {`${averageValue.toFixed(0)} ${getDataTypeUnit()} - Average`}
        </Text>
      )}
      {selectedFilter === "daily" && (
        <Text style={styles.dateRangeText}>
          {getDateRangeText(selectedFilter)}
        </Text>
      )}
      {selectedFilter !== "daily" && (
        <Text style={styles.dateRangeText}>
          {getDateRangeText(selectedFilter)}
        </Text>
      )}
      <View style={styles.chartContainer}>
        <BarChart data={filteredData} averageValue={averageValue} />
      </View>
      <View style={styles.buttonContainer}>
        <FilterButton
          label="Steps"
          isActive={selectedDataType === "steps"}
          onPress={() => handleDataTypeChange("steps")}
          activeColor={PRIMARY_DARK}
          inactiveColor={BG_LIGHT}
        />
        <FilterButton
          label="Distance"
          isActive={selectedDataType === "distance"}
          onPress={() => handleDataTypeChange("distance")}
          activeColor={PRIMARY_DARK}
          inactiveColor={BG_LIGHT}
        />
        <FilterButton
          label="Calories"
          isActive={selectedDataType === "calories"}
          onPress={() => handleDataTypeChange("calories")}
          activeColor={PRIMARY_DARK}
          inactiveColor={BG_LIGHT}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: BG_DARK,
    fontWeight: "bold",
    textAlign: "left",
    marginVertical: 25,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  averageText: {
    color: BG_DARK,
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 10,
  },
  dateRangeText: {
    color: PRIMARY_MEDIUM,
    fontSize: 12,
    fontWeight: "bold",
  },
  chartContainer: {
    marginTop: -20,
  },
});

export default StatisticsContainer;
