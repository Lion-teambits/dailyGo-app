import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import BarChart from "../../components/containers/BarChart";
import FilterButton from "../../components/buttons/FilterButton";

const AchievementsScreen = ({ navigation }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [averageValue, setAverageValue] = useState(null);
  const [selectedDataType, setSelectedDataType] = useState("steps");
  const [selectedFilter, setSelectedFilter] = useState("daily");

  const statisticsData = [
    { label: "Mon", steps: 1000, calories: 400, distance: 2.5 },
    { label: "Tue", steps: 2000, calories: 800, distance: 5.0 },
    { label: "Wed", steps: 3000, calories: 1200, distance: 7.5 },
    { label: "Thu", steps: 4000, calories: 1600, distance: 10.0 },
    { label: "Fri", steps: 2500, calories: 1000, distance: 6.25 },
    { label: "Sat", steps: 1500, calories: 600, distance: 3.75 },
    { label: "Sun", steps: 3500, calories: 1400, distance: 8.75 },
  ];

  const calculateFilteredData = (filter, selectedDataType) => {
    let newData = [];
    switch (filter) {
      case "daily":
        newData = statisticsData.map((data) => ({
          label: data.label,
          value: data[selectedDataType],
        }));
        break;
      case "weekly":
        newData = [];
        for (let i = 0; i < statisticsData.length; i += 7) {
          const weekData = statisticsData.slice(i, i + 7);
          const weekSum = weekData.reduce(
            (sum, data) => sum + data[selectedDataType],
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
        for (let i = 0; i < statisticsData.length; i += 30) {
          const monthData = statisticsData.slice(i, i + 30);
          const monthSum = monthData.reduce(
            (sum, data) => sum + data[selectedDataType],
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
        for (let i = 0; i < statisticsData.length; i += 12) {
          const yearData = statisticsData.slice(i, i + 12);
          const yearSum = yearData.reduce(
            (sum, data) => sum + data[selectedDataType],
            0
          );
          newData.push({
            label: `Year ${Math.ceil((i + 1) / 12)}`,
            value: yearSum,
          });
        }
        break;
      default:
        newData = statisticsData.map((data) => ({
          label: data.label,
          value: data[selectedDataType],
        }));
        break;
    }
    return newData;
  };

  const calculateAverageValue = (data) => {
    const sum = data.reduce((total, item) => total + item.value, 0);
    return sum / data.length;
  };

  const getDataTypeUnit = () => {
    switch (selectedDataType) {
      case "steps":
        return "steps";
      case "calories":
        return "kcal";
      case "distance":
        return "km";
      default:
        return "";
    }
  };

  const getAverageValueText = () => {
    const unit = getDataTypeUnit();
    const averageValueText = averageValue.toFixed(
      selectedDataType === "distance" ? 2 : 0
    );
    return `${averageValueText} ${unit} - Average`;
  };

  const handleFilterPress = (filter) => {
    setSelectedFilter(filter);
    const newData = calculateFilteredData(filter, selectedDataType);
    const average = calculateAverageValue(newData);
    setFilteredData(newData);
    setAverageValue(average);
  };

  const handleDataTypePress = (dataType) => {
    setSelectedDataType(dataType);
    const newData = calculateFilteredData(selectedFilter, dataType);
    const average = calculateAverageValue(newData);
    setFilteredData(newData);
    setAverageValue(average);
  };

  const handleSeeMorePress = (category) => {
    navigation.navigate("Badges", { category });
  };

  useEffect(() => {
    const newData = calculateFilteredData(selectedFilter, selectedDataType);
    const average = calculateAverageValue(newData);
    setFilteredData(newData);
    setAverageValue(average);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.header}>Achievements</Text>

      <View style={styles.streakContainer}>
        <Text style={styles.streakHeader}>Streak (Last 7 days)</Text>
        <View style={styles.streakItem}>
          <Image
            style={styles.streakIcon}
            source={require("../../../assets/images/image1.jpeg")}
          />
          <Image
            style={styles.streakIcon}
            source={require("../../../assets/images/image1.jpeg")}
          />
          <Image
            style={styles.streakIcon}
            source={require("../../../assets/images/image1.jpeg")}
          />
          <Image
            style={styles.streakIcon}
            source={require("../../../assets/images/image1.jpeg")}
          />
          <Image
            style={styles.streakIcon}
            source={require("../../../assets/images/image1.jpeg")}
          />
          <Image
            style={styles.streakIcon}
            source={require("../../../assets/images/image1.jpeg")}
          />
          <Image
            style={styles.streakIcon}
            source={require("../../../assets/images/image1.jpeg")}
          />
        </View>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsHeader}>Fireflies and Hearts</Text>
        <View style={styles.statsTextContainer}>
          <View style={styles.statsItem}>
            <Text style={styles.statsText}>10</Text>
            <Image
              style={styles.statsIcon}
              source={require("../../../assets/images/image1.jpeg")}
            />
          </View>
          <View style={styles.statsItem}>
            <Text style={styles.statsText}>20</Text>
            <Image
              style={styles.statsIcon}
              source={require("../../../assets/images/image2.jpeg")}
            />
          </View>
        </View>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartHeader}>Statistics</Text>
        <View style={styles.filterContainer}>
          <FilterButton
            label="Daily"
            onPress={() => handleFilterPress("daily")}
            isActive={selectedFilter === "daily"}
          />
          <FilterButton
            label="Weekly"
            onPress={() => handleFilterPress("weekly")}
            isActive={selectedFilter === "weekly"}
          />
          <FilterButton
            label="6 months"
            onPress={() => handleFilterPress("6 months")}
            isActive={selectedFilter === "6 months"}
          />
          <FilterButton
            label="Yearly"
            onPress={() => handleFilterPress("yearly")}
            isActive={selectedFilter === "yearly"}
          />
        </View>

        {averageValue !== null && (
          <Text style={styles.averageValue}>{getAverageValueText()}</Text>
        )}
        <BarChart data={filteredData} averageValue={averageValue} />

        <View style={styles.dataTypeContainer}>
          <TouchableOpacity
            style={[
              styles.dataTypeButton,
              selectedDataType === "steps" && styles.selectedDataTypeButton,
            ]}
            onPress={() => handleDataTypePress("steps")}
          >
            <Text
              style={[
                styles.dataTypeButtonText,
                selectedDataType === "steps" && styles.selectedDataTypeText,
              ]}
            >
              Steps
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.dataTypeButton,
              selectedDataType === "calories" && styles.selectedDataTypeButton,
            ]}
            onPress={() => handleDataTypePress("calories")}
          >
            <Text
              style={[
                styles.dataTypeButtonText,
                selectedDataType === "calories" && styles.selectedDataTypeText,
              ]}
            >
              Calories
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.dataTypeButton,
              selectedDataType === "distance" && styles.selectedDataTypeButton,
            ]}
            onPress={() => handleDataTypePress("distance")}
          >
            <Text
              style={[
                styles.dataTypeButtonText,
                selectedDataType === "distance" && styles.selectedDataTypeText,
              ]}
            >
              Distance
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.badgesContainer}>
        <Text style={styles.badgesMainHeader}>Badges</Text>
        <View style={styles.badgesHeaderContainer}>
          <Text style={styles.badgesHeader}>Daily Monsters</Text>
          <TouchableOpacity onPress={() => handleSeeMorePress("daily")}>
            <Text style={styles.seeMore}>See more</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.badgesItem}>
          <Image
            style={styles.badgeImage}
            source={require("../../../assets/images/image1.jpeg")}
          />
          <Image
            style={styles.badgeImage}
            source={require("../../../assets/images/image2.jpeg")}
          />
        </View>
      </View>

      <View style={styles.badgesContainer}>
        <View style={styles.badgesHeaderContainer}>
          <Text style={styles.badgesHeader}>Event Monsters</Text>
          <TouchableOpacity onPress={() => handleSeeMorePress("event")}>
            <Text style={styles.seeMore}>See more</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.badgesItem}>
          <Image
            style={styles.badgeImage}
            source={require("../../../assets/images/image3.jpeg")}
          />
          <Image
            style={styles.badgeImage}
            source={require("../../../assets/images/image4.jpeg")}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  streakContainer: {
    marginBottom: 20,
  },
  streakHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
  streakItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  streakIcon: {
    width: 50,
    height: 50,
    marginRight: 3,
    borderRadius: 50,
  },
  statsContainer: {
    marginBottom: 20,
  },
  statsTextContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  statsHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statsText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 20,
  },
  statsItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  statsIcon: {
    width: 50,
    height: 50,
    marginRight: 5,
    borderRadius: 50,
  },
  chartContainer: {
    marginBottom: 20,
  },
  chartHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  dataTypeContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  dataTypeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: "lightgray",
  },
  selectedDataTypeButton: {
    backgroundColor: "gray",
  },
  dataTypeButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  selectedDataTypeText: {
    color: "white",
  },
  averageValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "left",
  },
  badgesContainer: {
    marginBottom: 20,
  },
  badgesMainHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  badgesHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  badgesHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  badgesItem: {
    flexDirection: "row",
  },
  badgeImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  seeMore: {
    color: "blue",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
});

export default AchievementsScreen;
