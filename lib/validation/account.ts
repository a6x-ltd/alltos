// lib/validation/account.ts
import { z } from "zod";

export const updateAccountSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
});

export const addressSchema = z.object({
  label: z.string().trim().max(50).optional(),
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  address: z.string().trim().min(1, "Address is required").max(200),
  city: z.string().trim().min(1, "City is required").max(100),
  postcode: z.string().trim().min(1, "Postcode is required").max(20),
  country: z.string().trim().min(1).max(100).default("United Kingdom"),
});
