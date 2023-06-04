<script lang="ts">
  import { fail } from '@sveltejs/kit';
  import type { Validation } from 'sveltekit-superforms';
  import { superForm } from 'sveltekit-superforms/client';
  import ArrowRightIcon from '../../assets/svg/arrow-right-icon.svg';
  import { api } from '$lib/services/api.services';
  import { alertStore } from '$lib/stores';
  import { newProjectSchema } from '$lib/schemas/project';
  import type { ProjectDto } from '$lib/types/project/create.project';

  export let onClose = () => {};

  const focus = {
    name: false,
    description: false,
  };
  export let data: Validation<typeof newProjectSchema>;

  const createProject = async (project: ProjectDto) => {
    try {
      const response = await api.createProject(project);
      alertStore.set({
        color: 'green',
        message: 'Proyecto creado exitosamente',
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
      if (!form.valid) return fail(400, { form });

      const body = form.data as ProjectDto;

      const response = await createProject(body);

      if (!response) return fail(400, { form });

      setTimeout(async () => {
        await onClose();
        window.location.reload();
      }, 600);
    },
  });
</script>

<form method="POST" action="?/create" use:enhance>
  <div class="w-full flex flex-col gap-2 lg:gap-1">
    <p class="text-sm">Nombre del proyecto</p>
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
    <p class="text-sm">Descripción del Proyecto</p>
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
      <button
        type="button"
        on:click={onClose}
        class="w-40 text-xs flex items-center justify-around py-2 px-2 bg-[#C1C1C1] rounded-md mt-2
              hover:bg-[#D3D3D3]"
      >
        Cancelar
      </button>
      <button
        type="submit"
        class="w-40 flex items-center justify-around px-2 py-2 text-xs text-white bg-[#051127] rounded-md mt-2
              hover:bg-[#505868]"
      >
        Crear Proyecto
        <img src={ArrowRightIcon} class="w-4" alt="Import project" />
      </button>
    </div>
  </div>
</form>
