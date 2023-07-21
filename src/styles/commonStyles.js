import { PRIMARY_DARK, PRIMARY_MEDIUM } from "../constants/colorCodes";

export const screenTitleOption = (title) => ({
  title: title,
  headerTitleStyle: {
    color: PRIMARY_DARK,
  },
  headerTitleAlign: "center",
  headerTintColor: PRIMARY_MEDIUM,
});
