import { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImg = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const showToast = useShowToast();
    const maxFileSizeInBytes = 2 * 1024 * 1024; // 2MB

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log("File selected: ", file);

        // Clear file input for re-selection in case of error
        e.target.value = "";

        if (file) {
            if (file.type.startsWith("image/")) {
                if (file.size > maxFileSizeInBytes) {
                    console.log("File size exceeds limit: ", file.size);
                    showToast("Error", "File size must be less than 2MB", "error");
                    setSelectedFile(null);
                    return;
                }

                const reader = new FileReader();

                // Handle the successful file reading
                reader.onloadend = () => {
                    console.log("File read successfully");
                    setSelectedFile(reader.result);
                };

                // Handle errors during file reading
                reader.onerror = () => {
                    console.log("Error reading file");
                    showToast("Error", "Failed to read the file", "error");
                    setSelectedFile(null);
                };

                // Start reading the file as a data URL
                console.log("Reading file...");
                reader.readAsDataURL(file);
            } else {
                console.log("Invalid file type: ", file.type);
                showToast("Error", "Please select an image file", "error");
                setSelectedFile(null);
            }
        }
    };

    return { selectedFile, handleImageChange, setSelectedFile };
};

export default usePreviewImg;
