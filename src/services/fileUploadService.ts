// src/utils/multerUpload.ts
import multer from "multer";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import type { Request, Response } from "express";

export interface UploadOptions {
  /** destination folder relative to project root (default: 'uploads') */
  dest?: string;
  /** max file size bytes (default: 5MB) */
  maxSizeBytes?: number;
  /** allowed mime types (default: allow everything) */
  allowedMimeTypes?: string[] | null;
  /** keep original filename? default: false (creates unique filename) */
  keepOriginalName?: boolean;
  /** optional prefix for filename (e.g., user id) */
  filenamePrefix?: string;
}

/** Ensure directory exists (recursive) */
export function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/** Minimal filename sanitizer: remove control chars and path separators, collapse spaces */
function sanitizeFilename(name: string) {
  // Remove path, control chars and any non-safe chars (allow letters, numbers, dot, - and _)
  const base = path.basename(name);
  const cleaned = base.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9._-]/g, "");
  // if cleaned becomes empty, fallback to a timestamp
  return cleaned || `${Date.now()}`;
}

/**
 * Generate a unique filename synchronously.
 * - If keepOriginalName = true: returns `${prefix?}${timestamp}_${sanitizedOriginal}`
 * - Otherwise: returns `${prefix?}${timestamp}-${randomHex}${ext}`
 * The function checks the destination folder for collisions (sync) and retries up to 8 times.
 */
export function generateUniqueFilename(
  originalName: string,
  dest: string,
  keepOriginalName = false,
  prefix?: string,
): string {
  ensureDir(dest);

  const MAX_TRIES = 8;
  const sanitized = sanitizeFilename(originalName);
  const ext = path.extname(sanitized) || "";
  const nameOnly = ext ? sanitized.slice(0, -ext.length) : sanitized;
  const safePrefix = prefix ? `${sanitizeFilename(prefix)}_` : "";

  for (let i = 0; i < MAX_TRIES; i++) {
    let candidate: string;
    if (keepOriginalName) {
      const ts = Date.now();
      candidate = `${safePrefix}${ts}_${nameOnly}${ext}`;
    } else {
      // timestamp + 8 hex chars randomness
      const rand = crypto.randomBytes(4).toString("hex");
      candidate = `${safePrefix}${Date.now()}-${rand}${ext}`;
    }

    const abs = path.resolve(dest, candidate);
    // Synchronous existence check (safe within multer filename callback)
    if (!fs.existsSync(abs)) {
      return candidate;
    }
    // else loop and try again
  }

  // If collisions persist (very unlikely), append a final random suffix
  const finalCandidate = `${safePrefix}${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;
  return finalCandidate;
}

/** Build a multer storage engine that writes to disk with unique filenames */
function createDiskStorage(dest: string, keepOriginalName = false, prefix?: string) {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      ensureDir(dest);
      cb(null, dest);
    },
    filename: (req, file, cb) => {
      try {
        const filename = generateUniqueFilename(file.originalname, dest, keepOriginalName, prefix);
        cb(null, filename);
      } catch (err) {
        cb(err as Error, "");
      }
    },
  });
}

/** Normalize returned paths */
function makePaths(dest: string, filename: string) {
  const absolutePath = path.resolve(dest, filename);
  const relativePath = path
    .relative(process.cwd(), absolutePath)
    .split(path.sep)
    .join(path.posix.sep);
  return { absolutePath, relativePath, filename };
}

/**
 * Promisified single file upload
 * - returns: { filename, absolutePath, relativePath }
 */
export function uploadSingle(
  req: Request,
  res: Response,
  fieldName: string,
  opts: UploadOptions = {},
): Promise<{ filename: string; absolutePath: string; relativePath: string }> {
  const dest = opts.dest ?? "uploads";
  const maxSizeBytes = opts.maxSizeBytes ?? 5 * 1024 * 1024; // default 5MB
  const allowed = opts.allowedMimeTypes ?? null;

  const storage = createDiskStorage(dest, !!opts.keepOriginalName, opts.filenamePrefix);
  const upload = multer({
    storage,
    limits: { fileSize: maxSizeBytes },
    fileFilter: (req_, file, cb) => {
      if (allowed && !allowed.includes(file.mimetype)) {
        return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "Invalid file type"));
      }
      cb(null, true);
    },
  }).single(fieldName);

  return new Promise((resolve, reject) => {
    upload(req, res, (err: any) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_FILE_SIZE") {
            return reject(new Error(`File too large. Limit is ${maxSizeBytes} bytes.`));
          }
          if (err.code === "LIMIT_UNEXPECTED_FILE") {
            return reject(new Error("Invalid file type or unexpected file field."));
          }
          return reject(err);
        }
        return reject(err);
      }

      const anyReq = req as any;
      const file = anyReq.file as Express.Multer.File | undefined;
      if (!file) {
        return reject(new Error("No file uploaded."));
      }

      const { filename } = file;
      const paths = makePaths(dest, filename);
      resolve(paths);
    });
  });
}

/**
 * Promisified multiple files upload
 * - returns array of { filename, absolutePath, relativePath }
 */
export function uploadMultiple(
  req: Request,
  res: Response,
  fieldName: string,
  maxCount = 5,
  opts: UploadOptions = {},
): Promise<Array<{ filename: string; absolutePath: string; relativePath: string }>> {
  const dest = opts.dest ?? "uploads";
  const maxSizeBytes = opts.maxSizeBytes ?? 5 * 1024 * 1024;
  const allowed = opts.allowedMimeTypes ?? null;

  const storage = createDiskStorage(dest, !!opts.keepOriginalName, opts.filenamePrefix);
  const upload = multer({
    storage,
    limits: { fileSize: maxSizeBytes },
    fileFilter: (req_, file, cb) => {
      if (allowed && !allowed.includes(file.mimetype)) {
        return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "Invalid file type"));
      }
      cb(null, true);
    },
  }).array(fieldName, maxCount);

  return new Promise((resolve, reject) => {
    upload(req, res, (err: any) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_FILE_SIZE") {
            return reject(new Error(`File too large. Limit is ${maxSizeBytes} bytes.`));
          }
          if (err.code === "LIMIT_UNEXPECTED_FILE") {
            return reject(new Error("Invalid file type or unexpected file field."));
          }
          return reject(err);
        }
        return reject(err);
      }

      const anyReq = req as any;
      const files = anyReq.files as Express.Multer.File[] | undefined;
      if (!files || files.length === 0) {
        return reject(new Error("No files uploaded."));
      }

      const result = files.map((f) => makePaths(dest, f.filename));
      resolve(result);
    });
  });
}
