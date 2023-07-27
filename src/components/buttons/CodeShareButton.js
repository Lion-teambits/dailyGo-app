import { TouchableOpacity, Text } from "react-native";
import { PRIMARY_MEDIUM } from "../../constants/colorCodes";

const CodeShareButton = ({ shareId, onCopy }) => {
  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: PRIMARY_MEDIUM,
        paddingVertical: 4,
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
      }}
      onPress={() => onCopy(shareId)}
    >
      <Text style={{ fontSize: 14, color: PRIMARY_MEDIUM }}>Copy</Text>
    </TouchableOpacity>
  );
};

export default CodeShareButton;
