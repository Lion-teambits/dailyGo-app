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
  const [email, setEmail] = useState("");

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleFormSubmit = () => {
    handleSubmit(email);
  };

  return (
    <VStack space={3} mt="5">
      {showNameField && (
        <FormControl>
          <FormControl.Label>Name</FormControl.Label>
          <Input placeholder="Name" />
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
        <Input type="password" placeholder="Password" secureTextEntry />
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
