import clsx from 'clsx';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { DragEvent } from 'react';

import { CloseIcon, UploadIcon } from '@/assets/icons';

import styles from './ImageUpload.module.scss';

const ACCEPTED_TYPES = ['image/png', 'image/jpeg'];
const DEFAULT_MAX_SIZE_MB = 10;

interface ImageUploadProps {
  label?: string;
  value?: File | null;
  defaultValue?: File | null;
  onChange?: (file: File | null) => void;
  accept?: string;
  maxSizeMB?: number;
  hint?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  id?: string;
  name?: string;
}

const ImageUpload = ({
  label,
  value: valueProp,
  defaultValue = null,
  onChange,
  accept = 'image/png,image/jpeg',
  maxSizeMB = DEFAULT_MAX_SIZE_MB,
  hint,
  disabled = false,
  error: errorProp,
  className,
  id: idProp,
  name,
}: ImageUploadProps) => {
  const generatedId = useId();
  const errorId = useId();
  const labelId = useId();
  const id = idProp ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);

  const [internalFile, setInternalFile] = useState<File | null>(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const file = valueProp !== undefined ? valueProp : internalFile;
  const error = errorProp ?? validationError;
  const hintText = hint ?? `PNG, JPG up to ${maxSizeMB}MB`;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const previewUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    if (!previewUrl) return;

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const validateFile = (nextFile: File): string | null => {
    if (!ACCEPTED_TYPES.includes(nextFile.type)) {
      return 'Only PNG and JPG files are allowed';
    }
    if (nextFile.size > maxSizeBytes) {
      return `File must be up to ${maxSizeMB}MB`;
    }
    return null;
  };

  const setFile = (nextFile: File | null) => {
    if (valueProp === undefined) {
      setInternalFile(nextFile);
    }
    onChange?.(nextFile);
  };

  const processFile = (nextFile: File | null) => {
    if (!nextFile) return;

    const validationMessage = validateFile(nextFile);
    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }

    setValidationError(null);
    setFile(nextFile);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;
    processFile(nextFile);
    event.target.value = '';
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    setValidationError(null);
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const openFilePicker = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    if (disabled) return;

    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  };

  return (
    <div className={clsx(styles.field, className)}>
      {label ? (
        <label id={labelId} htmlFor={id} className={styles.label}>
          {label}
        </label>
      ) : null}
      <div className={styles.control}>
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="file"
          accept={accept}
          className={styles.hidden_input}
          disabled={disabled}
          onChange={handleInputChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
        />

        {!previewUrl ? (
          <div
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-labelledby={label ? labelId : undefined}
            aria-disabled={disabled || undefined}
            className={clsx(
              styles.dropzone,
              isDragging && styles.is_dragging,
              error && styles.has_error,
              disabled && styles.is_disabled,
            )}
            onClick={openFilePicker}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openFilePicker();
              }
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <UploadIcon aria-hidden className={styles.upload_icon} />
            <p className={styles.primary_text}>Drag and drop or click to upload</p>
            <p className={styles.hint}>{hintText}</p>
          </div>
        ) : (
          <div
            className={clsx(styles.preview, error && styles.has_error, disabled && styles.is_disabled)}
          >
            <button
              type="button"
              className={styles.delete_button}
              aria-label="Remove image"
              disabled={disabled}
              onClick={handleDelete}
            >
              <CloseIcon aria-hidden />
            </button>
            <button
              type="button"
              className={styles.preview_button}
              aria-label="Change image"
              disabled={disabled}
              onClick={openFilePicker}
            >
              <img src={previewUrl} alt="" className={styles.preview_image} />
            </button>
          </div>
        )}

        {error ? (
          <p id={errorId} className={styles.error} role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export { ImageUpload };
export type { ImageUploadProps };
