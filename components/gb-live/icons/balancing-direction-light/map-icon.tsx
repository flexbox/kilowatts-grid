import React from "react";
import { Circle, useClock } from "@shopify/react-native-skia";
import { SharedValue, useDerivedValue } from "react-native-reanimated";
import { MapContext } from "../../svg-map/context";
import { BALANCING_COLORS } from "../../../../utils/colors";
import { CanvasPoint } from "../../svg-map/types";

export type BalancingDirectionLightMapProps = {
  r: SharedValue<number>;
  center: CanvasPoint;
  balancing: SharedValue<"bid" | "offer" | "none">;
};


export const BalancingDirectionLightMap: React.FC<
  BalancingDirectionLightMapProps
> = (p) => {
  const { gestureMode } = React.useContext(MapContext);
  const c = useClock();
  const color = useDerivedValue(() => BALANCING_COLORS[p.balancing.value], []);

  const opacity = useDerivedValue(() => {
    if (gestureMode.value !== "none" || p.balancing.value == "none") return 0;
    const timeMs = c.value;
    const modulus = timeMs % 1000;
    return (500 - modulus) / 500;
  }, [gestureMode.value, p.balancing]);

  return (
    <Circle
      color={color}
      cx={p.center.x}
      cy={p.center.y}
      r={p.r}
      opacity={opacity}
    />
  );
};