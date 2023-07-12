import React from "react";
import CarouselList from "../../components/list/CarouselList";

const OnboardingScreen = ({ route }) => {
  return <CarouselList userInfo={route.params} />;
};

export default OnboardingScreen;
