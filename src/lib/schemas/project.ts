import { z } from 'zod';

export const newProjectSchema = z.object({
  // name. Required, string, min 3 chars
  name: z
    .string()
    .min(3, 'El nombre debe contener más de 3 Caracteres')
    .nonempty('Este campo no puede estar vacio'),
  // description. string, min 3 chars
  description: z.string().optional(),
});

// 5 MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const importProjectSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file !== null, 'Archivo .tsbr es requerido')
    .refine(
      (file) => file?.size >= MAX_FILE_SIZE,
      'El archivo no puede pesar más de 5MB'
    ),
});
