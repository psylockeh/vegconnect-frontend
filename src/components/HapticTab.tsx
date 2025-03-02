import { TouchableOpacity } from "react-native";
import { useEffect } from "react";
import * as Haptics from "expo-haptics";

export function HapticTab(props: any) {
  useEffect(() => {
    if (props.accessibilityState?.selected) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }, [props.accessibilityState?.selected]);

  return <TouchableOpacity {...props} />;
}
