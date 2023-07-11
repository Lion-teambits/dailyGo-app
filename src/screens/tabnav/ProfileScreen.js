import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
const image1 =
  "https://www.nicepng.com/png/detail/131-1317123_panini-caps-lion-king-02-mufasa-mufasa-lion.png";
const image2 =
  "https://www.nicepng.com/png/detail/789-7893464_lion-cartoon-clip-art-cartoon-lion-png.png";
const image3 =
  "https://www.nicepng.com/png/detail/1-17925_render-kon-bleach-mod-soul-ame-artificielle-peluche.png";
const image4 =
  "https://www.nicepng.com/png/detail/316-3164745_beautiful-images-of-wolf-cubs-the-lion-king.png";
import { useNavigation } from "@react-navigation/native";
import { BACKEND_SERVER_URL } from "@env";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

const ProfileScreen = () => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [selectedImage, setSelectedImage] = useState(image1);
  const [applyChanges, setApplyChanges] = useState(false);
  const [dailyModeValue, setDailyModeValue] = useState(0);
  const [pushNotificationEnabled, setPushNotificationEnabled] = useState(true);
  const nameInputRef = useRef(null);
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(`${BACKEND_SERVER_URL}/api/v1/user/111`)
      .then((response) => {
        const userData = response.data;
        setUserData(userData);
        setName(userData.name);
        setDailyModeValue(userData.preferred_daily_mode);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleEditName = () => {
    nameInputRef.current.focus();
  };

  const handleApplyChanges = () => {
    axios
      .put(`${BACKEND_SERVER_URL}/api/v1/user/111`, {
        avatar: selectedImage,
      })
      .then((response) => {
        setEditMode(false);
        setApplyChanges(true);
        setUserData((prevUserData) => ({
          ...prevUserData,
          avatar: selectedImage,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancelChanges = () => {
    setEditMode(false);
    setApplyChanges(false);
  };

  const handleImageSelection = (image) => {
    setSelectedImage(image);
  };

  const handleDecreaseDailyMode = () => {
    setDailyModeValue((prevValue) => prevValue - 500);
  };

  const handleIncreaseDailyMode = () => {
    setDailyModeValue((prevValue) => prevValue + 500);
  };

  const handleTogglePushNotification = () => {
    setPushNotificationEnabled((prevValue) => !prevValue);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("Logout error: ", error);
    }
    navigation.navigate("Login");
  };

  useEffect(() => {
    if (name && dailyModeValue) {
      axios
        .put(`${BACKEND_SERVER_URL}/api/v1/user/111`, {
          name,
          preferred_daily_mode: dailyModeValue,
        })
        .then((response) => {
          setApplyChanges(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [name, dailyModeValue]);

  return (
    <View style={styles.container}>
      {editMode ? (
        <View style={styles.subpageContainer}>
          <TouchableOpacity onPress={() => handleImageSelection(image1)}>
            <View
              style={[
                styles.avatarImage,
                selectedImage === image1 && styles.selectedImage,
              ]}
            >
              {selectedImage === image1 ? (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.avatarImage}
                />
              ) : (
                <Image source={{ uri: image1 }} style={styles.avatarImage} />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleImageSelection(image2)}>
            <View
              style={[
                styles.avatarImage,
                selectedImage === image2 && styles.selectedImage,
              ]}
            >
              {selectedImage === image2 ? (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.avatarImage}
                />
              ) : (
                <Image source={{ uri: image2 }} style={styles.avatarImage} />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleImageSelection(image3)}>
            <View
              style={[
                styles.avatarImage,
                selectedImage === image3 && styles.selectedImage,
              ]}
            >
              {selectedImage === image3 ? (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.avatarImage}
                />
              ) : (
                <Image source={{ uri: image3 }} style={styles.avatarImage} />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleImageSelection(image4)}>
            <View
              style={[
                styles.avatarImage,
                selectedImage === image4 && styles.selectedImage,
              ]}
            >
              {selectedImage === image4 ? (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.avatarImage}
                />
              ) : (
                <Image source={{ uri: image4 }} style={styles.avatarImage} />
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleApplyChanges}>
            <Text style={styles.applyButton}>Apply</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancelChanges}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : userData ? (
        <View style={styles.profileInfoContainer}>
          <TouchableOpacity onPress={handleEditProfile}>
            <Image
              source={{ uri: userData.avatar }}
              style={styles.profileImage}
            />
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>

          <View style={styles.nameContainer}>
            <TextInput
              ref={nameInputRef}
              style={styles.nameInput}
              value={name}
              onChangeText={setName}
            />
            <TouchableOpacity onPress={handleEditName}>
              <MaterialIcons name="edit" size={20} color="gray" />
            </TouchableOpacity>
          </View>
          <View style={styles.dailyModeContainer}>
            <TouchableOpacity onPress={handleDecreaseDailyMode}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.dailyModeValue}>{dailyModeValue}</Text>
            <TouchableOpacity onPress={handleIncreaseDailyMode}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.notificationContainer}>
            <Text>Push Notifications</Text>
            <Switch
              value={pushNotificationEnabled}
              onValueChange={handleTogglePushNotification}
            />
          </View>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutButton}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfoContainer: {
    alignItems: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "gray",
    marginBottom: 10,
  },
  editButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "gray",
    borderRadius: 10,
    textAlign: "center",
    marginTop: -20,
  },
  subpageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  applyButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
    textAlign: "center",
    marginTop: 10,
  },
  cancelButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  selectedImage: {
    width: 104,
    height: 104,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "gray",
  },

  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameInput: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginLeft: 20,
    width: "auto",
  },
  dailyModeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    paddingHorizontal: 10,
  },
  dailyModeValue: {
    fontSize: 24,
    fontWeight: "bold",
    width: 80,
    textAlign: "center",
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  logoutButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
    marginTop: 10,
  },
};

export default ProfileScreen;
