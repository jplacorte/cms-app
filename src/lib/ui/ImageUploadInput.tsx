import { useState } from "react";
import { FieldLabel } from "./FieldLabel";

// ==========================================
// ⚙️ CLOUDINARY CONFIGURATION (From .env.local)
// ==========================================
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "";

export function ImageUploadInput({
  label,
  value,
  onChange,
  placeholder = "https://...",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      alert("Cloudinary configuration is missing in .env.local!");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await response.json();
      
      if (data.secure_url) {
        onChange(data.secure_url); 
      } else {
        console.error("Cloudinary upload error:", data);
        alert("Upload failed. Check console for details.");
      }
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      alert("Error uploading image.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 text-sm text-black border border-slate-200 rounded p-2 outline-none focus:border-blue-500"
          placeholder={placeholder}
        />
        <label
          className={`flex items-center justify-center px-4 py-2 rounded text-sm font-medium transition-colors ${
            isUploading
              ? "bg-slate-200 text-slate-500 cursor-not-allowed"
              : "bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
          }`}
        >
          {isUploading ? "..." : "Upload"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </label>
      </div>
    </div>
  );
}
