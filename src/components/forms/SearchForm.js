import { Button, HStack, Input } from "native-base";
import { useState } from "react";

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
        width={"66%"}
        onChangeText={handleCodeChange}
      />
      <Button
        marginLeft={1}
        width={"33%"}
        borderRadius={50}
        onPress={handleFormSubmit}
      >
        Search
      </Button>
    </HStack>
  );
};

export default SearchForm;
