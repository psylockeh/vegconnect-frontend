import { Pressable, Platform } from "react-native";
import { useEffect } from "react";
import * as Haptics from "expo-haptics";

export function HapticTab(props: any) {
  useEffect(() => {
    if (props.accessibilityState?.selected && Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }, [props.accessibilityState?.selected]);

  return <Pressable {...props} />;
}
