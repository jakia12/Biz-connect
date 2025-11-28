import { z } from 'zod';

export const verificationRequestSchema = z.object({
  documents: z.array(z.string().url('Invalid document URL')).optional().default([]),
  message: z.string().min(20, 'Message must be at least 20 characters').max(500, 'Message cannot exceed 500 characters'),
});

export const verificationActionSchema = z.object({
  action: z.enum(['approve', 'reject'], { required_error: 'Action is required' }),
  rejectionReason: z.string().optional(),
}).refine(
  (data) => {
    if (data.action === 'reject' && (!data.rejectionReason || data.rejectionReason.trim().length < 10)) {
      return false;
    }
    return true;
  },
  {
    message: 'Rejection reason is required and must be at least 10 characters',
    path: ['rejectionReason'],
  }
);
