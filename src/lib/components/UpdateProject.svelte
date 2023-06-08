<script lang="ts">
  import { fail } from '@sveltejs/kit';
  import type { Validation } from 'sveltekit-superforms';
  import { superForm } from 'sveltekit-superforms/client';
  import ArrowRightIcon from '../../assets/svg/arrow-right-icon.svg';
  import { api } from '$lib/services/api.services';
  import { alertStore } from '$lib/stores';
  import { newProjectSchema } from '$lib/schemas/project';
  import type { ProjectDto, Project } from '$lib/types/project';
  import { onMount } from 'svelte';

  const focus = {
    name: false,
    description: false,
  };
  let loading = false;
  export let data: Validation<typeof newProjectSchema>;
  export let uuid: string;
  export let project: Project;

  export const updateProject = async (uuid: string, project: ProjectDto) => {
    try {
      const response = await api.updateProject(uuid, project);
      alertStore.set({
        color: 'green',
        message: 'Proyecto actualizado exitosamente',
        visible: true,
      });
      return response;
    } catch (error) {
      /* empty */
    }
  };

  const { form, errors, enhance } = superForm(data, {
    validators: newProjectSchema,
    SPA: true,
    onUpdate: async ({ form }) => {
      loading = true;
      if (!form.valid) {
        form.data.name = project.name;
        form.data.description = project.description;
        loading = false;
        return fail(400, { form, loading });
      }

      const body = form.data as ProjectDto;

      const response = await updateProject(uuid, body);

      loading = false;
      if (!response) {
        form.data.name = project.name;
        form.data.description = project.description;
        return fail(400, { form });
      }
    },
  });

  onMount(async () => {
    if (project) {
      $form.name = project.name;
      $form.description = project.description;
    }
  });
</script>

<form method="POST" action="?/create" use:enhance>
  <div class="w-full flex flex-col gap-2 lg:gap-1">
    <label
      class="block mt-2 uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
      for="name"
    >
      Nombre del Proyecto
    </label>
    <div
      class={`w-full h-9 flex items-center bg-inherit rounded-md px-2 ${
        focus.name
          ? 'border-[2px] border-blue-600'
          : 'border border-[#00000040]'
      }`}
    >
      <input
        type="text"
        id="name"
        name="name"
        class="w-full h-6 outline-none bg-inherit text-sm pr-1"
        placeholder="Ingresa el nombre del proyecto..."
        on:blur={() => (focus.name = false)}
        on:focus={() => (focus.name = true)}
        required
        bind:value={$form.name}
      />
    </div>
    {#if $errors.name}
      <p class="mt-1 text-sm text-red-500">{$errors.name}</p>
    {/if}
  </div>
  <div class="flex flex-col gap-2 bg-inherit lg:gap-1">
    <label
      class="block mt-2 uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
      for="description"
    >
      Descripción del Proyecto
    </label>
    <div
      class={`w-full flex items-center bg-inherit rounded-md px-2 ${
        focus.description
          ? 'border-[2px] border-blue-600'
          : 'border border-[#00000040]'
      }`}
    >
      <textarea
        class="resize-none w-full outline-none bg-inherit text-sm pr-1"
        cols="30"
        rows="4"
        id="description"
        name="description"
        placeholder="Ingresa una descripción del proyecto..."
        on:blur={() => (focus.description = false)}
        on:focus={() => (focus.description = true)}
        bind:value={$form.description}
      />
    </div>
    {#if $errors.description}
      <p class="mt-1 text-sm text-red-500">{$errors.description}</p>
    {/if}
    <div class="button-row flex justify-between mt-10">
      {#if loading === true}
        <div
          class="w-4 h-4 rounded-full border-2 border-[#021529] border-l-transparent animate-spin"
        />
      {:else}
        <button
          type="submit"
          class="w-40 flex items-center justify-around px-2 py-2 text-xs text-white bg-[#051127] rounded-md mt-2
                hover:bg-[#505868]"
        >
          Actualizar Proyecto
          <img src={ArrowRightIcon} class="w-4" alt="Update project" />
        </button>
      {/if}
    </div>
  </div>
</form>
