import { superValidate } from 'sveltekit-superforms/server';
import { newProjectSchema } from '$lib/schemas/project';
import type { CommandInfo, Engine } from '$lib/types';
import { error } from '@sveltejs/kit';
import { api } from '$lib/services/api.services';
import { alertStore } from '$lib/stores/index';

export const load = async ({ params }) => {
  const updateForm = await superValidate(newProjectSchema, {
    id: 'updateForm',
  });

  let project = null;
  let schema = null;
  let commands: CommandInfo[] | undefined = undefined;
  let engine: Engine | undefined = undefined;

  try {
    project = await api.getProject(params.slug);
    schema = await api.getContext(params.slug);
    engine = await api.getEngine(params.slug);
  } catch (err) {
    alertStore.set({ color: 'red', message: String(err), visible: false });
    throw error(404, 'Not found');
  }

  try {
    commands = await api.getCommands();
  } catch (err) {
    console.error(err);
    alertStore.set({ color: 'red', message: String(err), visible: false });
  }

  if (!project) {
    throw error(404, 'Not found');
  }

  if (!schema || Object.keys(schema).length < 1) {
    schema = {
      title: project.name,
      type: 'object',
      properties: {
        data: {
          type: 'object',
          title: 'Estructura del Dominio',
          properties: {},
          required: [],
        },
        extra: {
          type: 'object',
          title: 'Atributos Calculados',
          properties: {},
          required: [],
        },
      },
      required: ['data'],
    };
  }

  // When schema has properties but the first level is not { data: {}, extra: {} }
  if (schema.properties && !schema.properties.data) {
    schema = {
      title: project.name,
      type: 'object',
      properties: {
        data: {
          type: 'object',
          title: 'Estructura del Dominio',
          properties: schema.properties,
          required: schema.required,
        },
        extra: {
          type: 'object',
          title: 'Atributos Calculados',
          properties: {},
          required: [],
        },
      },
      required: ['data'],
    };
  }

  if (!commands || !Array.isArray(commands)) {
    commands = [];
  }

  if (!engine) {
    engine = {
      name: project.name,
      description: project.description,
      rules: [],
    };
  }

  return { project, schema, updateForm, commands, engine };
};
