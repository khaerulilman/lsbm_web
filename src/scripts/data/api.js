export const encodeMessage = async (imageFile, message, password) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("message", message);
  formData.append("password", password);

  const response = await fetch("https://lsbm-api.vercel.app/api/encode", {
    method: "POST",
    body: formData,
  });

  return await response.json();
};

export const decodeMessage = async (imageFile, password) => {
  const formData = new FormData();
  formData.append("image_decode", imageFile);
  formData.append("password", password);

  const response = await fetch("https://lsbm-api.vercel.app/api/decode", {
    method: "POST",
    body: formData,
  });

  return await response.json();
};
