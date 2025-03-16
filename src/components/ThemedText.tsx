import { Text, TextProps } from "react-native";

interface ThemedTextProps extends TextProps {
  type?: "title" | "link";
}

export default function ThemedText({
  children,
  type,
  style,
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      style={[
        {
          fontSize: type === "title" ? 20 : 16,
          fontWeight: type === "title" ? "bold" : "normal",
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
