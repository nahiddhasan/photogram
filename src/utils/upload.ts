import { toast } from "sonner";

// export const uploadImage = async (file: File) => {
//   const data = new FormData();
//   data.append("file", file);
//   data.append("upload_preset", "insta-clone");

//   try {
//     const res = await fetch(
//       "https://api.cloudinary.com/v1_1/nahiddhasan/image/upload",
//       {
//         method: "POST",
//         body: data,
//       }
//     );

//     const resData = await res.json();
//     return resData.url;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const uploadImage = (
  file: File,
  onProgress: (value: number) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "insta-clone");

    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "https://api.cloudinary.com/v1_1/nahiddhasan/image/upload"
    );

    // Track the progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentCompleted = Math.round((event.loaded * 100) / event.total);
        onProgress(percentCompleted);
      }
    };

    // Handle the response
    xhr.onload = () => {
      if (xhr.status === 200) {
        const resData = JSON.parse(xhr.responseText);
        resolve(resData.url); // Assuming resData.url is the URL string you want
      } else {
        console.error("Error uploading audio:", xhr.responseText);
        toast.error("Failed to upload Audio!");
        reject(new Error("Failed to upload audio"));
      }
    };

    xhr.onerror = () => {
      console.error("Upload failed.");
      toast.error("Failed to upload Audio!");
      reject(new Error("Failed to upload audio"));
    };

    xhr.send(data);
  });
};
