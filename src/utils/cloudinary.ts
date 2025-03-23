export const uploadImageToCloudinary = async (
  localUri: string
): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("file", {
      uri: localUri,
      type: "image/jpeg",
      name: "foto.jpg",
    } as any);

    formData.append("upload_preset", "vegconnect_perfil");
    formData.append("folder", "usuarios");

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
    return null;
  }
};
