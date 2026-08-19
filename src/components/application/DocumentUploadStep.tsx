import { Button } from '../common/Button';
import { DocumentUploadField } from '../forms/DocumentUploadField';
import type { EmploymentType } from '../../types/loan';
import type { UploadedFile } from '../../types/application';
import { getRequiredDocuments, documentLabels } from '../../constants/documentConfig';
import styles from './ApplicationStep.module.css';
import uploadStyles from './DocumentUploadStep.module.css';

interface DocumentUploadStepProps {
  employmentType: EmploymentType | '';
  files: Record<string, UploadedFile | null>;
  onUpload: (documentType: string, file: File) => void;
  onRemove: (documentType: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function DocumentUploadStep({
  employmentType,
  files,
  onUpload,
  onRemove,
  onNext,
  onBack,
}: DocumentUploadStepProps) {
  const requiredDocTypes = getRequiredDocuments(
    (employmentType as EmploymentType) || 'salaried'
  );

  const allRequiredUploaded = requiredDocTypes.every((docType) => {
    const file = files[docType];
    // GST is optional
    if (docType === 'gst') return true;
    return file?.status === 'success';
  });

  const handleContinue = () => {
    if (!allRequiredUploaded) return;
    onNext();
  };

  return (
    <div>
      <div className={styles.stepContent}>
        <div className={styles.sectionTitle}>Required Documents</div>
        <p className={uploadStyles.note}>
          Upload clear, legible scans or photos. PDFs preferred. Max {' '}
          <strong>5MB per file</strong>.
        </p>

        <div className={uploadStyles.docGrid}>
          {requiredDocTypes.map((docType) => {
            const label = documentLabels[docType] ?? docType;
            const isOptional = docType === 'gst';
            return (
              <DocumentUploadField
                key={docType}
                documentType={docType}
                label={label}
                required={!isOptional}
                description={isOptional ? 'Required if annual turnover > ₹40L' : undefined}
                file={files[docType] ?? null}
                onUpload={onUpload}
                onRemove={onRemove}
              />
            );
          })}
        </div>

        {!allRequiredUploaded && (
          <p className={uploadStyles.warning} role="status">
            Please upload all required documents to continue.
          </p>
        )}
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button
          type="button"
          variant="primary"
          size="lg"
          onClick={handleContinue}
          disabled={!allRequiredUploaded}
        >
          Review Application
        </Button>
      </div>
    </div>
  );
}
