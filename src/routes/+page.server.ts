import { superValidate } from 'sveltekit-superforms/server';
import { newProjectSchema, importProjectSchema } from '$lib/schemas/project';

export const load = async () => {
  const createForm = await superValidate(newProjectSchema, {
    id: 'createForm',
  });

  const importForm = await superValidate(importProjectSchema, {
    id: 'importForm',
  });

  return { importForm, createForm };
};
