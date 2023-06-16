import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import image1 from "../../../assets/images/image1.jpeg";
import image2 from "../../../assets/images/image2.jpeg";
import image3 from "../../../assets/images/image3.jpeg";
import image4 from "../../../assets/images/image4.jpeg";

// Profile page component
const ProfileScreen = () => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("John Doe");
  const [selectedImage, setSelectedImage] = useState(image1);
  const [applyChanges, setApplyChanges] = useState(false);
  const [dailyModeValue, setDailyModeValue] = useState(0);
  const [pushNotificationEnabled, setPushNotificationEnabled] = useState(true);
  const nameInputRef = useRef(null);

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleEditName = () => {
    nameInputRef.current.focus();
  };

  const handleApplyChanges = () => {
    setEditMode(false);
    setApplyChanges(true);
  };

  const handleCancelChanges = () => {
    setEditMode(false);
    setSelectedImage(image1);
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

  const handleLogout = () => {
    // Handle logout logic here
  };

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
              <Image source={image1} style={styles.avatarImage} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleImageSelection(image2)}>
            <View
              style={[
                styles.avatarImage,
                selectedImage === image2 && styles.selectedImage,
              ]}
            >
              <Image source={image2} style={styles.avatarImage} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleImageSelection(image3)}>
            <View
              style={[
                styles.avatarImage,
                selectedImage === image3 && styles.selectedImage,
              ]}
            >
              <Image source={image3} style={styles.avatarImage} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleImageSelection(image4)}>
            <View
              style={[
                styles.avatarImage,
                selectedImage === image4 && styles.selectedImage,
              ]}
            >
              <Image source={image4} style={styles.avatarImage} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleApplyChanges}>
            <Text style={styles.applyButton}>Apply</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancelChanges}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.profileInfoContainer}>
          <TouchableOpacity onPress={handleEditProfile}>
            <Image source={selectedImage} style={styles.profileImage} />
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
