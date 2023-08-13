import React, { useState } from "react";
import {
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  Link,
  View,
} from "native-base";
import {
  PRIMARY_DARK,
  PRIMARY_MEDIUM,
  SECONDARY_MEDIUM,
  TXT_DARK_BG,
  TXT_MEDIUM_BG,
} from "../../constants/colorCodes";
import { StyleSheet } from "react-native";
import Typography from "../typography/typography";

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
  const [passwordLengthError, setPasswordLengthError] = useState("");

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
    setPasswordLengthError("");
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
    } else if (password.trim().length <= 7) {
      setPasswordLengthError("Password must be at least 8 characters");
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
    <View style={styles.container}>
      <VStack space={2} mt="5">
        {showNameField && (
          <FormControl isInvalid={nameError !== ""}>
            <FormControl.Label>
              <Typography
                type="body2"
                style={{
                  color: nameError !== "" ? "#D03E00" : "black",
                  paddingLeft: 12,
                }}
              >
                Name
              </Typography>
            </FormControl.Label>
            <Input
              placeholder="Name"
              value={name}
              paddingLeft="4"
              onChangeText={handleNameChange}
              variant="rounded"
              height={10}
              fontFamily="WorkSansRegular"
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
                <Typography type="body2">{nameError}</Typography>
              </FormControl.ErrorMessage>
            )}
          </FormControl>
        )}
        <FormControl isInvalid={emailError !== ""}>
          <FormControl.Label>
            <Typography
              type="body2"
              style={{
                color: emailError !== "" ? "#D03E00" : "black",
                paddingLeft: 12,
              }}
            >
              Email
            </Typography>
          </FormControl.Label>
          <Input
            placeholder="Email"
            paddingLeft="4"
            value={email}
            onChangeText={handleEmailChange}
            autoCapitalize="none"
            variant="rounded"
            height={10}
            fontFamily="WorkSansRegular"
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
              <Typography type="body2">{emailError}</Typography>
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <FormControl
          isInvalid={passwordError !== "" || passwordLengthError !== ""}
        >
          <FormControl.Label>
            <Typography
              type="body2"
              style={{
                color:
                  passwordError !== "" || passwordLengthError !== ""
                    ? "#D03E00"
                    : "black",
                paddingLeft: 12,
              }}
            >
              Password
            </Typography>
          </FormControl.Label>
          <Input
            type="password"
            placeholder="Password"
            paddingLeft="4"
            secureTextEntry
            onChangeText={handlePasswordChange}
            variant="rounded"
            height={10}
            fontFamily="WorkSansRegular"
            _focus={{
              borderColor: PRIMARY_MEDIUM,
              backgroundColor: "white",
            }}
            borderColor={
              passwordError !== "" || passwordLengthError !== ""
                ? "#D03E00"
                : TXT_MEDIUM_BG
            }
          />
          {passwordError !== "" && (
            <FormControl.ErrorMessage
              _text={{
                color: "#D03E00",
                paddingLeft: "2",
              }}
            >
              <Typography type="body2"> {passwordError}</Typography>
            </FormControl.ErrorMessage>
          )}
          {passwordLengthError !== "" && (
            <FormControl.ErrorMessage
              _text={{
                color: "#D03E00",
                paddingLeft: "2",
              }}
            >
              <Typography type="body2"> {passwordLengthError}</Typography>
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <Button
          mt="2"
          borderRadius={24}
          maxHeight={10}
          backgroundColor={SECONDARY_MEDIUM}
          onPress={handleFormSubmit}
        >
          <Typography type="button" style={{ color: TXT_DARK_BG }}>
            {buttonText}
          </Typography>
        </Button>
        <HStack mt="4" justifyContent="center" w="100%">
          <Typography type="button" style={{ color: PRIMARY_DARK }}>
            {linkText}
          </Typography>
          <Link onPress={handleLink}>
            <Typography
              type="button"
              style={{ color: PRIMARY_DARK, textDecorationLine: "underline" }}
            >
              {handleLink.name === "handleLogin"
                ? "Login here."
                : "Sign up here."}
            </Typography>
          </Link>
        </HStack>
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: "40%",
  },
});

export default Form;
