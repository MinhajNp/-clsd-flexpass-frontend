import { useRef } from "react";
import { UploadCloud, FileText } from "lucide-react";
import { clsx } from "clsx";

interface DocumentUploadProps {
  label: string;
  required?: boolean;
  subtext?: string;
  file: File | null | string;
  onFileSelect: (file: File | null) => void;
  error?: string;
}

const DocumentUpload = ({ 
  label, 
  required, 
  subtext, 
  file, 
  onFileSelect,
  error 
}: DocumentUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        className={clsx(
          "relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-8 transition-all duration-200 cursor-pointer",
          file 
            ? "border-flex-primary/30 bg-flex-primary/5" 
            : "border-gray-200 bg-gray-50/50 hover:bg-white hover:border-flex-primary/40",
          error && "border-red-500 bg-red-50/20"
        )}
      >
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,image/*"
        />

        {file ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-flex-primary/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-flex-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-gray-900 truncate max-w-[200px]">
                {file instanceof File ? file.name : "Uploaded Document"}
              </p>
              <button
                onClick={clearFile}
                className="mt-1 text-xs font-bold text-red-500 hover:text-red-600 transition-colors uppercase tracking-wider"
              >
                Remove File
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
              <UploadCloud className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm font-bold text-gray-900 mb-1">
              Click to upload or drag and drop
            </p>
            {subtext && (
              <p className="text-xs text-gray-500 font-medium">{subtext}</p>
            )}
          </>
        )}
      </div>
      
      {error && (
        <p className="text-[11px] font-medium text-red-500 px-1 mt-0.5">{error}</p>
      )}
    </div>
  );
};

export default DocumentUpload;
