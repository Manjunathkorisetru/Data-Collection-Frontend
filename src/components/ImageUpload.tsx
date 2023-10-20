import React from "react";
// import Compressor from "compressorjs";

interface ImageUploadProps {
  selectedImage: string | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
  setEditUpload: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageUpload = ({
  selectedImage,
  setSelectedImage,
  setEditUpload,
}: ImageUploadProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // When the reader finishes reading the file, set the base64 string to the state
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file); // Read the file as data URL (base64 encoded)
    } else {
      setSelectedImage(null);
    }
  };

  return (
    <div
      className="bg-slate-100 mx-auto min-w-[75vw] min-h-[50vh] flex gap-2 justify-center
    items-center rounded-xl shadow-lg mt-10 sm:min-w-[70vw] sm:min-h-[50vh] sm:flex-col sm:gap-4"
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="rounded-lg p-4 "
      />
      {selectedImage && (
        <img
          src={selectedImage}
          alt="Selected"
          className="rounded-lg lg:w-[15vw] lg:h-[25vh] md:w-[20vw]
           md:h-[20vh] sm:w-[20vw] sm:h-[20vh] p-4"
        />
      )}
      {selectedImage && (
        <button
          onClick={() => setEditUpload(true)}
          className="bg-green-400 rounded-lg text-black p-2 w-30 h-10 hover:bg-green-500"
        >
          Add features
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
