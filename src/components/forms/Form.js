import React, { useState } from "react";
import {
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  Text,
  Link,
  ScrollView,
} from "native-base";
import {
  PRIMARY_DARK,
  PRIMARY_MEDIUM,
  SECONDARY_MEDIUM,
  TXT_MEDIUM_BG,
} from "../../constants/colorCodes";
import { StyleSheet } from "react-native";

const Form = ({
  buttonText,
  handleSubmit,
  handleLink,
  linkText,
  showNameField,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleNameChange = (value) => {
    setName(value);
    setNameError("");
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailError("");
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordError("");
  };

  const handleFormSubmit = () => {
    let isFormValid = true;

    if (showNameField && name.trim() === "") {
      setNameError("Please input name");
      isFormValid = false;
    }

    if (email.trim() === "") {
      setEmailError("Please input email");
      isFormValid = false;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email)) {
      setEmailError("Invalid email format");
      isFormValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Please input password");
      isFormValid = false;
    }

    if (isFormValid) {
      if (showNameField) {
        handleSubmit(name, email, password);
      } else {
        handleSubmit(email, password);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <VStack space={2} mt="5">
        {showNameField && (
          <FormControl isInvalid={nameError !== ""}>
            <FormControl.Label
              _text={{
                color: nameError !== "" ? "#D03E00" : "black",
                paddingLeft: 3,
              }}
            >
              Name
            </FormControl.Label>
            <Input
              placeholder="Name"
              value={name}
              paddingLeft="4"
              onChangeText={handleNameChange}
              variant="rounded"
              height={10}
              _focus={{
                borderColor: PRIMARY_MEDIUM,
                backgroundColor: "white",
              }}
              borderColor={nameError !== "" ? "#D03E00" : TXT_MEDIUM_BG}
            />
            {nameError !== "" && (
              <FormControl.ErrorMessage
                _text={{
                  color: "#D03E00",
                  paddingLeft: "3",
                }}
              >
                {nameError}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
        )}
        <FormControl isInvalid={emailError !== ""}>
          <FormControl.Label
            _text={{
              color: emailError !== "" ? "#D03E00" : "black",
              paddingLeft: 3,
            }}
          >
            Email
          </FormControl.Label>
          <Input
            placeholder="Email"
            paddingLeft="4"
            value={email}
            onChangeText={handleEmailChange}
            autoCapitalize="none"
            variant="rounded"
            height={10}
            _focus={{
              borderColor: PRIMARY_MEDIUM,
              backgroundColor: "white",
            }}
            borderColor={emailError !== "" ? "#D03E00" : TXT_MEDIUM_BG}
          />
          {emailError !== "" && (
            <FormControl.ErrorMessage
              _text={{
                color: "#D03E00",
                paddingLeft: "3",
              }}
            >
              {emailError}
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={passwordError !== ""}>
          <FormControl.Label
            _text={{
              color: passwordError !== "" ? "#D03E00" : "black",
              paddingLeft: 3,
            }}
          >
            Password
          </FormControl.Label>
          <Input
            type="password"
            placeholder="Password"
            paddingLeft="4"
            secureTextEntry
            onChangeText={handlePasswordChange}
            variant="rounded"
            height={10}
            _focus={{
              borderColor: PRIMARY_MEDIUM,
              backgroundColor: "white",
            }}
            borderColor={passwordError !== "" ? "#D03E00" : TXT_MEDIUM_BG}
          />
          {passwordError !== "" && (
            <FormControl.ErrorMessage
              _text={{
                color: "#D03E00",
                paddingLeft: "3",
              }}
            >
              {passwordError}
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <Button
          mt="2"
          borderRadius={24}
          maxHeight={10}
          backgroundColor={SECONDARY_MEDIUM}
          onPress={handleFormSubmit}
          _text={{
            fontWeight: "bold",
            fontSize: "sm",
          }}
        >
          {buttonText}
        </Button>
        <HStack mt="4" justifyContent="center" w="100%">
          <Text fontSize="sm" color={PRIMARY_DARK} fontWeight="bold">
            {linkText}
          </Text>
          <Link
            _text={{
              color: PRIMARY_DARK,
              fontWeight: "bold",
              fontSize: "sm",
            }}
            onPress={handleLink}
          >
            {handleLink.name === "handleLogin"
              ? "Login here."
              : "Sign up here."}
          </Link>
        </HStack>
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: "40%",
  },
});

export default Form;
