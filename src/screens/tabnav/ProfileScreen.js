import React, { useState, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
  Text,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { PROFILE_AVATAR_LIST } from "../../constants/imagePaths";
import {
  PRIMARY_MEDIUM,
  BG_LIGHT,
  PRIMARY_DARK,
  SECONDARY_MEDIUM,
  TXT_DARK_BG,
} from "../../constants/colorCodes";
import { retrieveUserInfo, updateUserInfo } from "../../api/userService";
import Typography from "../../components/typography/typography";

const ProfileScreen = () => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [applyChanges, setApplyChanges] = useState(false);
  const [dailyModeValue, setDailyModeValue] = useState(0);
  const [pushNotificationEnabled, setPushNotificationEnabled] = useState(true);
  const nameInputRef = useRef(null);
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const uid = await AsyncStorage.getItem("@uid");

        if (uid) {
          const userData = await retrieveUserInfo(uid);
          setUserData(userData);
          setName(userData.name);
          setDailyModeValue(userData.preferred_daily_mode);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleEditName = () => {
    nameInputRef.current.focus();
  };

  const handleApplyChanges = async () => {
    try {
      const uid = await AsyncStorage.getItem("@uid");

      if (uid) {
        const updatedUserInfo = { avatar: selectedImage };
        await updateUserInfo(uid, updatedUserInfo);

        setEditMode(false);
        setApplyChanges(true);
        setUserData((prevUserData) => ({
          ...prevUserData,
          avatar: selectedImage,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelChanges = () => {
    setEditMode(false);
    setApplyChanges(false);
  };

  const handleImageSelection = (image) => {
    setSelectedImage(image);
  };

  const handleDecreaseDailyMode = () => {
    setDailyModeValue((prevValue) => {
      const newValue = prevValue - 500;
      return newValue < 3000 ? 3000 : newValue;
    });
  };

  const handleIncreaseDailyMode = () => {
    setDailyModeValue((prevValue) => {
      const newValue = prevValue + 500;
      return newValue > 10000 ? 10000 : newValue;
    });
  };

  const getDailyModeText = () => {
    if (dailyModeValue >= 3000 && dailyModeValue <= 4999) {
      return "Easy";
    } else if (dailyModeValue >= 5000 && dailyModeValue <= 7999) {
      return "Normal";
    } else if (dailyModeValue >= 8000) {
      return "Hard";
    }
    return "";
  };

  const handleTogglePushNotification = () => {
    setPushNotificationEnabled((prevValue) => !prevValue);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("@uid");
      await AsyncStorage.removeItem("@accessToken");
    } catch (error) {
      console.log("Logout error: ", error);
    }
    navigation.navigate("Login");
  };

  useEffect(() => {
    const updateUser = async () => {
      const uid = await AsyncStorage.getItem("@uid");
      if (name && dailyModeValue && uid) {
        try {
          const updatedUserInfo = {
            name,
            preferred_daily_mode: dailyModeValue,
          };

          await updateUserInfo(uid, updatedUserInfo);
          setApplyChanges(true);
        } catch (error) {
          console.log(error);
        }
      }
    };

    updateUser();
  }, [name, dailyModeValue]);

  return (
    <ScrollView style={styles.container}>
      <View>
        {editMode ? (
          <View style={styles.subpageContainer}>
            <Typography type="subtitles" style={styles.subpageHeader}>
              Avatar
            </Typography>
            <Typography type="body2Bold" style={styles.subpageText}>
              Select your avatar
            </Typography>
            <View style={styles.avatarContainer}>
              {PROFILE_AVATAR_LIST.map((avatar, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleImageSelection(avatar)}
                >
                  <View
                    style={[
                      styles.avatarImage,
                      selectedImage === avatar && styles.selectedImage,
                    ]}
                  >
                    {selectedImage === avatar ? (
                      <Image
                        source={selectedImage}
                        style={styles.avatarImage}
                      />
                    ) : (
                      <Image source={avatar} style={styles.avatarImage} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApplyChanges}
            >
              <Typography type="button" style={styles.applyButtonText}>
                Apply Changes
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelChanges}
            >
              <Typography type="button" style={styles.cancelButtonText}>
                Cancel
              </Typography>
            </TouchableOpacity>
          </View>
        ) : userData ? (
          <View style={styles.profileInfoContainer}>
            <Typography type="subtitles" style={styles.profileInfoHeader}>
              Profile
            </Typography>
            <TouchableOpacity onPress={handleEditProfile}>
              <Image
                source={parseInt(userData.avatar)}
                style={styles.profileImage}
              />
              <View style={styles.editButton}>
                <Typography type="smallTextBold" style={styles.editButtonText}>
                  Edit
                </Typography>
              </View>
            </TouchableOpacity>

            <View style={styles.nameContainer}>
              <TextInput
                ref={nameInputRef}
                style={styles.nameInput}
                value={name}
                onChangeText={setName}
              />
              <TouchableOpacity onPress={handleEditName}>
                <MaterialIcons name="edit" size={20} color={PRIMARY_DARK} />
              </TouchableOpacity>
            </View>
            <Typography type="body2" style={styles.dailyModeText}>
              Preferred Daily Mode
            </Typography>
            <View style={styles.dailyModeContainer}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleDecreaseDailyMode}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <Typography type="heading3" style={styles.dailyModeValue}>
                {dailyModeValue}
              </Typography>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleIncreaseDailyMode}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
            <Typography type="body2Bold" style={styles.dailyLevelText}>
              {getDailyModeText()}
            </Typography>

            <View style={styles.notificationContainer}>
              <Typography type="body1Bold" style={styles.notificationText}>
                Push Notifications
              </Typography>
              <Switch
                value={pushNotificationEnabled}
                onValueChange={handleTogglePushNotification}
                trackColor={{ false: BG_LIGHT, true: PRIMARY_MEDIUM }}
              />
            </View>
            <TouchableOpacity
              style={styles.logoutContainer}
              onPress={handleLogout}
            >
              <Typography type="body1Bold" style={styles.logoutButton}>
                Logout
              </Typography>
            </TouchableOpacity>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  profileInfoContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    marginBottom: 20,
    backgroundColor: "white",
  },
  profileInfoHeader: {
    color: PRIMARY_DARK,
    textAlign: "center",
    marginBottom: 50,
  },

  profileImage: {
    width: 112,
    height: 112,
    borderRadius: 56,
    marginBottom: 10,
  },
  editButton: {
    width: 55,
    height: 30,
    backgroundColor: "white",
    borderRadius: 16,
    shadowColor: "#000F92",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.17,
    shadowRadius: 4,
    marginTop: -30,
    marginLeft: 27,
  },
  editButtonText: {
    color: PRIMARY_DARK,
    textAlign: "center",
    paddingVertical: 8,
  },
  subpageContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    marginBottom: 20,
    backgroundColor: "white",
  },
  applyButton: {
    backgroundColor: SECONDARY_MEDIUM,
    width: "87%",
    height: 40,
    padding: 10,
    marginBottom: 8,
    borderRadius: 24,
  },
  applyButtonText: {
    textAlign: "center",
    color: TXT_DARK_BG,
  },
  cancelButton: {
    padding: 8,
    marginBottom: 10,
  },
  cancelButtonText: {
    textAlign: "center",
    color: PRIMARY_DARK,
  },
  subpageHeader: {
    color: PRIMARY_DARK,
    textAlign: "center",
    marginBottom: 32,
  },
  subpageText: {
    color: PRIMARY_DARK,
    textAlign: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 45,
    marginTop: "5%",
    marginBottom: "15%",
  },
  avatarImage: {
    width: 86,
    height: 86,
    borderRadius: 43,
    marginBottom: 20,
  },
  selectedImage: {
    borderWidth: 4,
    width: 94,
    height: 94,
    borderRadius: 47,
    borderColor: PRIMARY_DARK,
  },

  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 40,
  },
  nameInput: {
    fontSize: 18,
    fontFamily: "WorkSansBold",
    color: PRIMARY_DARK,
    fontWeight: "bold",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginLeft: 20,
    width: "auto",
  },
  dailyModeText: {
    fontSize: 14,
    color: PRIMARY_DARK,
    marginBottom: 8,
  },
  dailyLevelText: {
    fontSize: 14,
    fontWeight: "bold",
    color: PRIMARY_DARK,
    marginTop: 8,
  },
  dailyModeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000F92",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.17,
    shadowRadius: 4,
  },

  buttonText: {
    fontSize: 30,
    fontWeight: "bold",
    color: PRIMARY_DARK,
    paddingHorizontal: 12,
    paddingVertical: 1,
  },
  dailyModeValue: {
    color: PRIMARY_DARK,
    width: 188,
    height: 36,
    textAlign: "center",
    paddingTop: 5,
  },
  notificationContainer: {
    width: "87%",
    height: 64,
    borderRadius: 24,
    backgroundColor: "white",
    shadowColor: "#000F92",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.17,
    shadowRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 10,
    marginTop: "30%",
  },
  notificationText: {
    color: PRIMARY_DARK,
  },
  logoutContainer: {
    width: "87%",
    height: 64,
    borderRadius: 24,
    backgroundColor: "white",
    shadowColor: "#000F92",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.17,
    shadowRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  logoutButton: {
    color: PRIMARY_DARK,
    paddingHorizontal: 20,
  },
};

export default ProfileScreen;
