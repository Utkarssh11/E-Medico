import React, { useState, useCallback } from 'react';
// Consider using a library like react-dropzone for more robust drag-and-drop
// For now, a basic implementation:

const UploadPrescriptionPage: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [ocrText, setOcrText] = useState<string | null>(null); // Placeholder for OCR result

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      // Simulate OCR
      setOcrText(`Simulated OCR for ${file.name}:\n- Medicine A 10mg\n- Medicine B 20mg`);
    } else {
      alert('Please upload a valid image file (JPEG, PNG, GIF).');
      setUploadedFile(null);
      setPreviewUrl(null);
      setOcrText(null);
    }
  };
  
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isDragging) setIsDragging(true);
  }, [isDragging]);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }, []);


  const handleRemoveFile = () => {
    setUploadedFile(null);
    setPreviewUrl(null);
    setOcrText(null);
    // Reset file input if necessary
    const fileInput = document.getElementById('prescription-upload') as HTMLInputElement;
    if (fileInput) {
        fileInput.value = '';
    }
  };

  return (
    <div className="container mx-auto py-8 animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-2">
          Upload Your Prescription
        </h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Easily upload an image of your prescription. We'll help you get your medicines quickly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Upload Area */}
        <div 
          className={`p-6 border-2 ${isDragging ? 'border-primary-DEFAULT' : 'border-dashed border-slate-300 dark:border-slate-600'} rounded-lg text-center transition-all duration-200 bg-white dark:bg-slate-800 shadow-lg`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            id="prescription-upload"
            accept="image/png, image/jpeg, image/gif, image/webp"
            onChange={handleFileChange}
            className="hidden"
            aria-label="Upload prescription file"
          />
          <label
            htmlFor="prescription-upload"
            className="cursor-pointer flex flex-col items-center justify-center space-y-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-16 h-16 ${isDragging ? 'text-primary-DEFAULT' : 'text-slate-400 dark:text-slate-500'}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.338-2.32 5.75 5.75 0 011.036 11.03A5.75 5.75 0 016.75 19.5z" />
            </svg>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              {isDragging ? "Drop file here!" : "Drag & drop your prescription image here"}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">or</p>
            <span className="btn btn-secondary">Choose File</span>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
              Supports: JPG, PNG, GIF, WEBP (Max 5MB)
            </p>
          </label>
        </div>

        {/* Preview and OCR Area */}
        <div className="space-y-6">
          {previewUrl && uploadedFile && (
            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-slate-700 dark:text-white mb-4">Prescription Preview</h3>
              <div className="mb-4 border border-slate-200 dark:border-slate-700 rounded overflow-hidden">
                <img src={previewUrl} alt="Prescription preview" className="max-w-full h-auto max-h-96 object-contain mx-auto" />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-1"><strong>File:</strong> {uploadedFile.name}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300"><strong>Size:</strong> {(uploadedFile.size / 1024).toFixed(2)} KB</p>
              <button 
                onClick={handleRemoveFile} 
                className="btn btn-danger mt-4 w-full sm:w-auto"
                aria-label="Remove uploaded file"
              >
                Remove File
              </button>
            </div>
          )}

          {ocrText && (
            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-slate-700 dark:text-white mb-3">Extracted Details (OCR Preview)</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded">
                <pre className="text-sm text-slate-700 dark:text-slate-200 whitespace-pre-wrap">{ocrText}</pre>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                Please verify the extracted details. You can edit them in the next step.
              </p>
              <button className="btn btn-primary mt-4 w-full sm:w-auto">
                Verify and Proceed
              </button>
            </div>
          )}
          
          {!previewUrl && !ocrText && (
             <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto text-slate-400 dark:text-slate-500 mb-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-slate-500 dark:text-slate-400">Your uploaded prescription preview and extracted details will appear here.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPrescriptionPage;
