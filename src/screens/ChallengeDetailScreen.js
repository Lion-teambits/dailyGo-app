import ChallengeDetailContainer from "../components/containers/ChallengeDetailContainer";

const ChallengeDetailScreen = ({ route }) => {
  const { challenge } = route.params;
  return <ChallengeDetailContainer challenge={challenge} />;
};

export default ChallengeDetailScreen;
