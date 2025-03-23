import { Platform } from "react-native";

export const uploadImageToCloudinary = async (imageUri: string) => {
  const formData = new FormData();

  const file = {
    uri: imageUri,
    type: "image/jpeg",
    name: "profile.jpg",
  };

  formData.append("file", file as any);
  formData.append("upload_preset", "vegconnect_perfil");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dyhzz5baz/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    return data.secure_url;
  } catch (error) {
    console.error("Erro ao fazer upload para o Cloudinary:", error);
    throw error;
  }
};
