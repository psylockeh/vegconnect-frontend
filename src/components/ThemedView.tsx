import { View } from "react-native";

export default function ThemedView({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) {
  return (
    <View style={[{ padding: 10, backgroundColor: "white" }, style]}>
      {children}
    </View>
  );
}
