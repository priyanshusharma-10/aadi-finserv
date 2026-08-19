import { useState, useCallback } from 'react';
import type { UploadedFile } from '../types/application';
import { documentService } from '../services/loanService';
import { validateFile } from '../utils/validation';

interface UseDocumentUploadReturn {
  files: Record<string, UploadedFile | null>;
  uploadFile: (documentType: string, file: File) => Promise<void>;
  removeFile: (documentType: string) => void;
  getFileStatus: (documentType: string) => UploadedFile | null;
  isUploading: boolean;
}

export function useDocumentUpload(): UseDocumentUploadReturn {
  const [files, setFiles] = useState<Record<string, UploadedFile | null>>({});

  const uploadFile = useCallback(async (documentType: string, file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      const errorFile: UploadedFile = {
        id: `${documentType}-${Date.now()}`,
        documentType,
        file,
        name: file.name,
        size: file.size,
        uploadProgress: 0,
        status: 'error',
        errorMessage: validationError,
      };
      setFiles((prev) => ({ ...prev, [documentType]: errorFile }));
      return;
    }

    // Create a preview URL for images
    let preview: string | undefined;
    if (file.type.startsWith('image/')) {
      preview = URL.createObjectURL(file);
    }

    const pendingFile: UploadedFile = {
      id: `${documentType}-${Date.now()}`,
      documentType,
      file,
      name: file.name,
      size: file.size,
      uploadProgress: 0,
      status: 'uploading',
      preview,
    };

    setFiles((prev) => ({ ...prev, [documentType]: pendingFile }));

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setFiles((prev) => {
        const current = prev[documentType];
        if (!current || current.status !== 'uploading') return prev;
        const newProgress = Math.min(current.uploadProgress + 20, 90);
        return { ...prev, [documentType]: { ...current, uploadProgress: newProgress } };
      });
    }, 300);

    try {
      await documentService.upload(file, documentType);
      clearInterval(progressInterval);
      setFiles((prev) => ({
        ...prev,
        [documentType]: { ...pendingFile, uploadProgress: 100, status: 'success' },
      }));
    } catch (err) {
      clearInterval(progressInterval);
      const message = err instanceof Error ? err.message : 'Upload failed. Please try again.';
      setFiles((prev) => ({
        ...prev,
        [documentType]: { ...pendingFile, uploadProgress: 0, status: 'error', errorMessage: message },
      }));
    }
  }, []);

  const removeFile = useCallback((documentType: string) => {
    setFiles((prev) => {
      const file = prev[documentType];
      if (file?.preview) URL.revokeObjectURL(file.preview);
      return { ...prev, [documentType]: null };
    });
  }, []);

  const getFileStatus = useCallback(
    (documentType: string): UploadedFile | null => files[documentType] ?? null,
    [files]
  );

  const isUploading = Object.values(files).some((f) => f?.status === 'uploading');

  return { files, uploadFile, removeFile, getFileStatus, isUploading };
}
