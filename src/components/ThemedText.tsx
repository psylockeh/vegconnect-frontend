import { Text } from "react-native";

export default function ThemedText({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) {
  return (
    <Text style={[{ fontSize: 16, color: "black" }, style]}>{children}</Text>
  );
}
