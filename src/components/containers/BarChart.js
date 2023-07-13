import React from "react";
import { View } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryAxis,
} from "victory-native";
import {
  PRIMARY_MEDIUM,
  PRIMARY_DARK,
  TXT_MEDIUM_BG,
} from "../../constants/colorCodes";

const BarChart = ({ data, averageValue }) => {
  const ValueLabel = () => null;

  const formatYAxisLabel = (tick) => {
    if (tick < 1) {
      return "";
    }
    return tick.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "");
  };

  return (
    <View>
      <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
        <VictoryAxis
          style={{
            axis: { stroke: PRIMARY_DARK, strokeWidth: 2 },
            ticks: { size: 0 },
            tickLabels: { fill: TXT_MEDIUM_BG, fontSize: 12 },
            grid: { stroke: "none" },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: PRIMARY_DARK, strokeWidth: 2 },
            ticks: { size: 0 },
            tickLabels: { fill: TXT_MEDIUM_BG, fontSize: 12 },
            grid: { stroke: "none" },
          }}
          tickFormat={formatYAxisLabel}
        />
        <VictoryBar
          data={data}
          x="label"
          y="value"
          labelComponent={<ValueLabel />}
          style={{
            data: {
              fill: PRIMARY_MEDIUM,
              width: 25,
              cornerRadius: { top: ({ datum }) => datum.x * 4 },
            },
          }}
        />
        <VictoryLine
          y={() => averageValue}
          style={{
            data: { stroke: PRIMARY_DARK, strokeDasharray: "6, 6" },
          }}
        />
      </VictoryChart>
    </View>
  );
};

export default BarChart;
