import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Modal,
  Image,
  TouchableOpacity,
} from "react-native";
import BadgeDetailContainer from "../../components/containers/BadgeDetailContainer";
import StatisticsContainer from "../../components/containers/StatisticsContainer";
import StatsContainer from "../../components/containers/StatsContainer";
import StreakContainer from "../../components/containers/StreakContainer";
import {
  PRIMARY_DARK,
  BG_PRIMARY,
  PRIMARY_MEDIUM,
  TXT_DARK_BG,
} from "../../constants/colorCodes";
import Typography from "../../components/typography/typography";

const AchievementsScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerCenter}>
          <Typography type="subtitles" style={styles.header}>
            Achievements
          </Typography>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={openModal}>
            <Image
              source={require("../../../assets/images/icons/question.png")}
              style={styles.headerImage}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Typography type="heading4" style={styles.modalHeading}>
              About your achievements
            </Typography>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <Image
                source={require("../../../assets/images/onboarding/details.png")}
                style={styles.modalImage}
                resizeMode="contain"
              />
            </ScrollView>
            <TouchableOpacity onPress={closeModal}>
              <Typography type="button" style={styles.modalButton}>
                Close Modal
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.contentContainer}>
        <StatsContainer />
        <StreakContainer />
        <StatisticsContainer />
        <BadgeDetailContainer />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
    marginLeft: 50,
  },
  header: {
    color: PRIMARY_DARK,
  },
  headerRight: {
    marginLeft: 20,
  },
  headerImage: {
    width: 25,
    height: 24,
  },
  contentContainer: {
    paddingLeft: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: "5%",
    marginBottom: "19%",
  },
  modalContent: {
    backgroundColor: BG_PRIMARY,
    padding: 20,
    borderRadius: 24,
    width: "90%",
    maxHeight: "86%",
    elevation: 8,
    shadowColor: "#000F92",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.17,
    shadowRadius: 12,
  },
  modalHeading: {
    color: PRIMARY_DARK,
    textAlign: "center",
    paddingTop: 15,
    paddingBottom: 15,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalButton: {
    backgroundColor: PRIMARY_MEDIUM,
    color: TXT_DARK_BG,
    textAlign: "center",
    padding: 10,
    width: 144,
    height: 40,
    borderRadius: 20,
    alignSelf: "center",
    overflow: "hidden",
    marginTop: 20,
  },
});

export default AchievementsScreen;
