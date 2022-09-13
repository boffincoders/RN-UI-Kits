import React from "react";
import { View, Dimensions, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";
interface FitDataSets {
  data: number[];
}

interface FitChartData {
  labels: string[];
  datasets: FitDataSets[];
}

interface FitChartProps {
  data: FitChartData;
  title: string;
  description?: string;
  baseline: number;
}

const FitChart = (props: FitChartProps) => {
  const { data, title, description, baseline } = props;
  const chartConfig = {
   
    barPercentage: 0.7,
    height:100,
    fillShadowGradient: `rgba(1, 122, 205, 1)`,
    fillShadowGradientOpacity: 1,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `#40DBC1`,
    labelColor: (opacity = 1) => `#40DBC1`,
  
    style: {
      borderRadius: 16,
      fontFamily: "Bogle-Regular",
    },
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: "#40DBC1",
      strokeDasharray: "0",
    },
    propsForLabels: {
    //   fontFamily: "Bogle-Regular",
    },
  };
  return (
    <View >
      <View>
        <BarChart
        xAxisLabel="none"
          style={{
           backgroundColor : "none"
            // marginVertical: 8,
            // borderRadius: 16,
          }}
          yAxisSuffix=""
          data={data}
          width={150}
          height={100}
          yAxisLabel=""
          chartConfig={chartConfig}
        //   showBarTops={false}
          fromZero
        />
      </View>
    </View>
  );
};

export default FitChart;