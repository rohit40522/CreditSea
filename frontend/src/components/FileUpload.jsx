import { useState, useRef } from 'react';
import { uploadXML } from '../API/Api';

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);


  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    // Check if files exist
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    // Reset the file input's value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');
    setLoading(true);
    try {
      await uploadXML(file);
      // alert('XML uploaded successfully');
      handleRemoveFile(); // Use remove to clear state and input
      onUploadSuccess();
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-6 space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Upload XML File
      </h2>

      {/* --- Custom File Input Area --- */}
      <div>
        <label
          htmlFor="file-upload"
          className="relative flex flex-col items-center justify-center w-full h-40 px-4 py-6 bg-gray-50 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200"
        >
          {/* Upload Icon */}
          <svg
            className="w-10 h-10 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M12 15l5 5m0 0l-5-5m5 5V10"
            ></path>
          </svg>
          <span className="text-sm font-medium text-gray-600">
            Click to browse or <span className="font-bold">drag & drop</span>
          </span>
          <span className="text-xs text-gray-500 mt-1">
            XML files only (.xml)
          </span>
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".xml"
          onChange={handleFileChange}
          className="hidden" // The input is hidden, the <label> triggers it
          ref={fileInputRef}
        />
      </div>

      {/* --- Selected File Display --- */}
      <div className="h-10"> {/* Fixed height to prevent layout shift */}
        {file && (
          <div className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md">
            <span className="truncate max-w-xs">{file.name}</span>
            <button
              onClick={handleRemoveFile}
              className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
              title="Remove file"
            >
              {/* "X" Icon */}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* --- Upload Button --- */}
      <button
        onClick={handleUpload}
        className="w-full bg-blue-600 text-white font-bold px-4 py-3 rounded-lg cursor-pointer shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={loading || !file} // Disable if loading OR no file
      >
        {loading ? (
          <div className="flex items-center justify-center">
            {/* Spinner Icon */}
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Uploading...
          </div>
        ) : (
          'Upload File'
        )}
      </button>
    </div>
  );
};

export default FileUpload;