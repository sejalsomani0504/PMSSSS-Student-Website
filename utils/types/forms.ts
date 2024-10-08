import { z } from 'zod';

export const signupSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    aicteId: z.string().min(10, 'AICTE ID must be at least 10 characters'),
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const studentAddSchema = z.object({
    studentName: z.string().min(5, 'Student name is required'),
    studentId: z.string().min(5, 'Student ID is required'),
    course: z.string().min(5, 'Course name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number is required'),
    address: z.string().min(1, 'Address is required'),
    gender: z.enum(['male', 'female', 'other']),
    dob: z.date({ required_error: 'A date of birth is required.' }),
    // fatherName: z.string().min(1, "Father's name is required"),
    // fatherPhone: z.string().min(1, "Father's phone number is required"),
});

export const studentSignInSchema = z.object({
    email: z.string().email('Invalid email address'),
});

export const studentOtpSchema = z.object({
    email: z.string().email('Invalid email address'),
    otp: z.string().min(6, 'OTP must be at least 6 characters'),
});

type StudentOtpFormData = z.infer<typeof studentOtpSchema>;
type StudentSignInFormData = z.infer<typeof studentSignInSchema>;
type SignupFormData = z.infer<typeof signupSchema>;
type LoginFormData = z.infer<typeof loginSchema>;
type StudentAddFormData = z.infer<typeof studentAddSchema>;

export type {
    SignupFormData,
    LoginFormData,
    StudentAddFormData,
    StudentSignInFormData,
    StudentOtpFormData,
};
