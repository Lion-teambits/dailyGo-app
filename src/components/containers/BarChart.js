import React from "react";
import { View } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryLine,
} from "victory-native";

const BarChart = ({ data, averageValue }) => {
  const ValueLabel = (props) => {
    const { datum } = props;
    return <VictoryLabel {...props} text={datum.value} />;
  };

  return (
    <View>
      <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
        <VictoryBar
          data={data}
          x="label"
          y="value"
          labelComponent={<ValueLabel />}
        />
        <VictoryLine
          y={() => averageValue}
          style={{
            data: { stroke: "black", strokeDasharray: "2, 2" },
          }}
        />
      </VictoryChart>
    </View>
  );
};

export default BarChart;
