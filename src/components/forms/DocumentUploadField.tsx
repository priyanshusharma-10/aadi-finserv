import { useRef, useState } from 'react';
import { Upload, File, CheckCircle, AlertCircle, X, RefreshCw } from 'lucide-react';
import type { UploadedFile } from '../../types/application';
import { formatFileSize } from '../../utils/formatting';
import { loanConfig } from '../../config/loanConfig';
import styles from './DocumentUploadField.module.css';

interface DocumentUploadFieldProps {
  documentType: string;
  label: string;
  description?: string;
  required?: boolean;
  file: UploadedFile | null;
  onUpload: (documentType: string, file: File) => void;
  onRemove: (documentType: string) => void;
}

export function DocumentUploadField({
  documentType,
  label,
  description,
  required,
  file,
  onUpload,
  onRemove,
}: DocumentUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputId = `upload-${documentType}`;

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    onUpload(documentType, files[0]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  return (
    <div className={styles.field}>
      <div className={styles.labelRow}>
        <label className={styles.label} htmlFor={inputId}>
          {label}
          {required && <span className={styles.required} aria-hidden="true">*</span>}
        </label>
        {description && <span className={styles.description}>{description}</span>}
      </div>

      {!file || file.status === 'error' ? (
        <div
          className={`${styles.dropzone} ${isDragOver ? styles.dragOver : ''} ${file?.status === 'error' ? styles.hasError : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          aria-label={`Upload ${label}. Drag and drop or click to browse.`}
          onClick={() => inputRef.current?.click()}
          onKeyDown={handleKeyDown}
        >
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept={loanConfig.allowedFileExtensions.join(',')}
            className="sr-only"
            onChange={(e) => handleFiles(e.target.files)}
            aria-label={label}
          />
          <Upload size={22} className={styles.uploadIcon} aria-hidden="true" />
          <p className={styles.dropzoneText}>
            <span className={styles.dropzoneLink}>Click to browse</span> or drag & drop
          </p>
          <p className={styles.dropzoneHint}>PDF, JPG, PNG — Max {loanConfig.maxFileSizeMb}MB</p>

          {file?.status === 'error' && (
            <p className={styles.errorMsg} role="alert">{file.errorMessage}</p>
          )}
        </div>
      ) : (
        <div className={`${styles.fileCard} ${styles[file.status]}`}>
          {/* Preview for images */}
          {file.preview ? (
            <img src={file.preview} alt={file.name} className={styles.preview} />
          ) : (
            <div className={styles.fileIcon}>
              <File size={22} />
            </div>
          )}

          <div className={styles.fileInfo}>
            <p className={styles.fileName}>{file.name}</p>
            <p className={styles.fileMeta}>{formatFileSize(file.size)}</p>

            {file.status === 'uploading' && (
              <div className={styles.progressBar} role="progressbar" aria-valuenow={file.uploadProgress} aria-valuemin={0} aria-valuemax={100}>
                <div className={styles.progressFill} style={{ width: `${file.uploadProgress}%` }} />
              </div>
            )}

            {file.status === 'success' && (
              <p className={styles.successMsg}>
                <CheckCircle size={12} aria-hidden="true" /> Uploaded successfully
              </p>
            )}
          </div>

          <div className={styles.fileActions}>
            {file.status === 'success' && (
              <button
                type="button"
                className={styles.actionBtn}
                onClick={() => inputRef.current?.click()}
                aria-label={`Replace ${label}`}
                title="Replace file"
              >
                <RefreshCw size={14} />
              </button>
            )}
            <button
              type="button"
              className={`${styles.actionBtn} ${styles.removeBtn}`}
              onClick={() => onRemove(documentType)}
              aria-label={`Remove ${label}`}
              title="Remove file"
            >
              <X size={14} />
            </button>
          </div>

          {/* Hidden input for re-upload */}
          <input
            ref={inputRef}
            type="file"
            accept={loanConfig.allowedFileExtensions.join(',')}
            className="sr-only"
            onChange={(e) => {
              onRemove(documentType);
              handleFiles(e.target.files);
            }}
            aria-label={`Replace ${label}`}
          />
        </div>
      )}
    </div>
  );
}

interface DocumentUploadFieldErrorProps {
  message: string;
}

export function DocumentUploadError({ message }: DocumentUploadFieldErrorProps) {
  return (
    <div className={styles.uploadError} role="alert">
      <AlertCircle size={14} aria-hidden="true" />
      {message}
    </div>
  );
}
