import { Button, HStack, Input } from "native-base";
import { useState } from "react";
import { SECONDARY_MEDIUM } from "../../constants/colorCodes";

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
      <Button
        marginLeft={1}
        width={"30%"}
        borderRadius={50}
        onPress={handleFormSubmit}
        backgroundColor={SECONDARY_MEDIUM}
      >
        Search
      </Button>
    </HStack>
  );
};

export default SearchForm;
