import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
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

export const actions = {
  import: async ({ request }) => {
    const importForm = await superValidate(request, importProjectSchema, {
      id: 'importForm',
    });

    if (!importForm.valid) return fail(400, { importForm });
    return message(importForm, 'Importación de Proyecto exitosa');
  },
};
