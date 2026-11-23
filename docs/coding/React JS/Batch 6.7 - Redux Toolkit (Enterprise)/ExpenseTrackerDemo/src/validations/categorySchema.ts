import z from "zod";

export const makeCategorySchema = (existing: string[]) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(1, "Category Name is required")
      .refine(
        (value) =>
          !existing.some((c) => c.toLowerCase() === value.toLowerCase()),
        "Category already exists"
      )
      .refine(
        (value) => value.toLowerCase() !== "all",
        '"All" is reserved'
      ),
  });

export type CategoryFormValues = { name: string };