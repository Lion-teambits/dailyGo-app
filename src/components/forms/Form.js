import React, { useState } from "react";
import {
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  Text,
  Link,
} from "native-base";

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

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleFormSubmit = () => {
    if (showNameField) {
      handleSubmit(name, email, password);
    } else {
      handleSubmit(email, password);
    }
  };

  return (
    <VStack space={3} mt="5">
      {showNameField && (
        <FormControl>
          <FormControl.Label>Name</FormControl.Label>
          <Input
            placeholder="Name"
            value={name}
            onChangeText={handleNameChange}
          />
        </FormControl>
      )}
      <FormControl>
        <FormControl.Label>Email</FormControl.Label>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
          autoCapitalize="none"
        />
      </FormControl>
      <FormControl>
        <FormControl.Label>Password</FormControl.Label>
        <Input
          type="password"
          placeholder="Password"
          secureTextEntry
          onChangeText={handlePasswordChange}
        />
      </FormControl>
      <Button mt="2" colorScheme="indigo" onPress={handleFormSubmit}>
        {buttonText}
      </Button>
      <HStack mt="6" justifyContent="center">
        <Text fontSize="sm" color="coolGray">
          {linkText}
        </Text>
        <Link
          _text={{
            color: "indigo",
            fontWeight: "medium",
            fontSize: "sm",
          }}
          onPress={handleLink}
        >
          {handleLink.name === "handleLogin" ? "Login" : "Sign Up"}
        </Link>
      </HStack>
    </VStack>
  );
};

export default Form;
