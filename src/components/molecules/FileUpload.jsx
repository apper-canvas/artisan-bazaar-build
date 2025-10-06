import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const FileUpload = ({
  label,
  maxSize = 10,
  maxFiles = 1,
  accept,
  onFilesChange,
  error,
  helperText
}) => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFiles = useCallback((newFiles) => {
    const validFiles = Array.from(newFiles).slice(0, maxFiles);
    setFiles(validFiles);
    setUploading(true);
    
    setTimeout(() => {
      setUploading(false);
      onFilesChange?.(validFiles);
    }, 1000);
  }, [maxFiles, onFilesChange]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesChange?.(newFiles);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200",
          dragActive ? "border-primary bg-primary/5" : "border-gray-300 bg-surface",
          error && "border-error"
        )}
      >
        <input
          type="file"
          multiple={maxFiles > 1}
          accept={accept}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-3">
          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto">
            <ApperIcon name="Upload" className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="text-base font-medium text-gray-700">
              Drag & drop files here, or click to select
            </p>
            {helperText && (
              <p className="text-sm text-gray-500 mt-1">{helperText}</p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              Max size: {maxSize}MB {maxFiles > 1 && `• Max files: ${maxFiles}`}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-sm text-error">{error}</p>
      )}

      {files.length > 0 && (
        <div className="space-y-2 mt-4">
          {files.map((file, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-3 bg-surface rounded-lg border border-gray-200"
            >
              <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center flex-shrink-0">
                <ApperIcon name="File" className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              {uploading ? (
                <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1 }}
                    className="h-full bg-gradient-to-r from-primary to-accent"
                  />
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeFile(index)}
                >
                  <ApperIcon name="X" className="w-4 h-4" />
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;