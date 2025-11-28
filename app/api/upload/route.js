/**
 * File Upload API
 * Handle file uploads using Multer
 */

import { authOptions } from '@/backend/shared/config/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

/**
 * POST /api/upload
 * Upload files (images or documents)
 */
export async function POST(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get upload type from query params
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'image'; // 'image' or 'document'

    // Convert request to form data
    const formData = await request.formData();
    const files = formData.getAll('files');

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    // Validate file count
    if (files.length > 5) {
      return NextResponse.json(
        { error: 'Maximum 5 files allowed per upload' },
        { status: 400 }
      );
    }

    const uploadedFiles = [];
    const errors = [];

    for (const file of files) {
      try {
        // Validate file
        if (!(file instanceof File)) {
          errors.push({ filename: 'unknown', error: 'Invalid file' });
          continue;
        }

        // Check file size
        const maxSize = type === 'image' ? 5 * 1024 * 1024 : 10 * 1024 * 1024;
        if (file.size > maxSize) {
          errors.push({
            filename: file.name,
            error: `File size exceeds ${maxSize / (1024 * 1024)}MB limit`
          });
          continue;
        }

        // Validate file type
        if (type === 'image') {
          const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
          if (!allowedTypes.includes(file.type)) {
            errors.push({
              filename: file.name,
              error: 'Only JPEG, PNG, and WebP images are allowed'
            });
            continue;
          }
        } else if (type === 'document') {
          const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/zip',
            'application/x-zip-compressed'
          ];
          if (!allowedTypes.includes(file.type)) {
            errors.push({
              filename: file.name,
              error: 'Only PDF, DOC, DOCX, and ZIP files are allowed'
            });
            continue;
          }
        }

        // Save file
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate unique filename
        const timestamp = Date.now();
        const random = Math.round(Math.random() * 1E9);
        const ext = file.name.split('.').pop();
        const nameWithoutExt = file.name.replace(`.${ext}`, '');
        const sanitizedName = nameWithoutExt.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
        const filename = `${sanitizedName}-${timestamp}-${random}.${ext}`;

        // Determine directory
        const fs = require('fs');
        const path = require('path');
        const uploadDir = type === 'image' 
          ? path.join(process.cwd(), 'public', 'uploads', 'services')
          : path.join(process.cwd(), 'public', 'uploads', 'documents');

        // Ensure directory exists
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Write file
        const filePath = path.join(uploadDir, filename);
        fs.writeFileSync(filePath, buffer);

        // Generate URL
        const url = type === 'image'
          ? `/uploads/services/${filename}`
          : `/uploads/documents/${filename}`;

        uploadedFiles.push({
          filename: file.name,
          savedAs: filename,
          url: url,
          size: file.size,
          type: file.type
        });

      } catch (error) {
        console.error('Error uploading file:', error);
        errors.push({
          filename: file.name,
          error: error.message || 'Upload failed'
        });
      }
    }

    // Return response
    if (uploadedFiles.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No files were uploaded successfully',
          errors
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      files: uploadedFiles,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'File upload failed', details: error.message },
      { status: 500 }
    );
  }
}
