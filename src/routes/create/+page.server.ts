import { fail } from '@sveltejs/kit';
import type { ServerLoadEvent } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { newProjectSchema } from '$lib/schemas/project';

export const load = async (event: ServerLoadEvent) => {
  const form = superValidate(event, newProjectSchema);
  return {
    form,
  };
};

export const actions = {
  default: async (event) => {
    const form = await superValidate(event, newProjectSchema);
    console.log(form);

    if (!form.valid) {
      return fail(400, form);
    }
    return { form };
  },
};
