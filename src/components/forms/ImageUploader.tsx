'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image as ImageIcon, X } from 'lucide-react';
import Image from 'next/image';

interface ImageUploaderProps {
  onImageUpload: (url: string) => void;
  defaultImage?: string;
  label?: string;
}

export default function ImageUploader({ onImageUpload, defaultImage, label = "Feature Image" }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const [urlInput, setUrlInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        setError("File is too large (max 5MB)");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreview(result);
        onImageUpload(result);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif']
    },
    maxFiles: 1
  });

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setUrlInput(url);
    if (url) {
        setPreview(url);
        onImageUpload(url);
        setError(null);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setUrlInput('');
    onImageUpload('');
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {preview ? (
        <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
          <Image 
            src={preview} 
            alt="Preview" 
            fill 
            className="object-cover" 
            unoptimized={preview.startsWith('data:')}
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
          }`}
        >
          <input {...getInputProps()} />
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            {isDragActive ? 'Drop the image here...' : 'Drag & drop an image here, or click to select'}
          </p>
          <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
        </div>
      )}
      
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="mt-2">
        <p className="text-sm text-gray-500 mb-1">Or enter an image URL:</p>
        <input
          type="text"
          value={urlInput}
          onChange={handleUrlChange}
          placeholder="https://example.com/image.jpg"
          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
        />
      </div>
      <p className="text-xs text-gray-500">
          Note: Uploading directly will convert images to Base64 (suitable for small images). For best performance, host images externally and paste the URL.
      </p>
    </div>
  );
}
