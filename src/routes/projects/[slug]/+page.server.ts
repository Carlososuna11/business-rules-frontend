import { superValidate } from 'sveltekit-superforms/server';
import { newProjectSchema } from '$lib/schemas/project';
import { error } from '@sveltejs/kit';
import { api } from '$lib/services/api.services';
import { alertStore } from '$lib/stores/index.js';

export const load = async ({ params }) => {
  const updateForm = await superValidate(newProjectSchema, {
    id: 'updateForm',
  });

  let project = null;

  try {
    project = await api.getProject(params.slug);
  } catch (err) {
    alertStore.set({ color: 'red', message: String(err), visible: false });
    throw error(404, 'Not found');
  }

  if (!project) {
    throw error(404, 'Not found');
  }

  return { project, updateForm };
};
