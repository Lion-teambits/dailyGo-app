import { PRIMARY_DARK, PRIMARY_MEDIUM } from "../constants/colorCodes";

export const challengeStyles = {
  container: {
    flex: 1,
    backgroundColor: "white",
  },
};

export const challengeTitleOption = (title) => ({
  title: title,
  headerTitleStyle: {
    color: PRIMARY_DARK,
  },
  headerTitleAlign: "center",
  headerTintColor: PRIMARY_MEDIUM,
});
