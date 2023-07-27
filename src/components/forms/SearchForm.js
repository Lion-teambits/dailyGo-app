import { Box, Button, HStack, Input } from "native-base";
import { useState } from "react";
import { SECONDARY_MEDIUM } from "../../constants/colorCodes";
import SecondaryButton from "../buttons/SecondaryButton";

const SearchForm = ({ handleSubmit }) => {
  const [code, setCode] = useState("");

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const handleFormSubmit = () => {
    handleSubmit(code);
  };

  return (
    <HStack>
      <Input
        marginRight={1}
        variant="rounded"
        width={"70%"}
        onChangeText={handleCodeChange}
      />
      <Box width={"30%"} marginY={-1}>
        <SecondaryButton
          onPressFunc={handleFormSubmit}
          isDisabled={false}
          text={"Search"}
        />
      </Box>
    </HStack>
  );
};

export default SearchForm;
