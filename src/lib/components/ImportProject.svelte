<script lang="ts">
  import { fail } from '@sveltejs/kit';
  import ImportBlackProjectIcon from '../../assets/svg/import-black-icon.svg';
  import type { Validation } from 'sveltekit-superforms';
  import { superForm } from 'sveltekit-superforms/client';
  import { importProjectSchema } from '$lib/schemas/project';
  import { api } from '$lib/services/api.services';
  import { alertStore } from '$lib/stores';
  import type { ImportProjectDto } from '$lib/types/project/import.project';

  export let data: Validation<typeof importProjectSchema>;
  export let onClose = () => {};
  let formDiv: HTMLFormElement;

  let file: File | undefined;

  function handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      file = input.files[0];
      $form.file = file;
      formDiv.requestSubmit();
    }
  }
  const importProject = async (project: ImportProjectDto) => {
    try {
      const response = await api.importProject(project);
      alertStore.set({
        color: 'green',
        message: 'Proyecto importado exitosamente',
        visible: true,
      });
      return response;
    } catch (error) {
      /* empty */
    }
  };

  const { form, errors, enhance, constraints } = superForm(data, {
    validators: importProjectSchema,
    SPA: true,
    onUpdate: async ({ form }) => {
      console.log(form);
      console.log(typeof form.data.file);
      if (!form.valid) return fail(400, { form });

      const body = form.data as ImportProjectDto;

      const response = await importProject(body);

      if (!response) return fail(400, { form });

      setTimeout(async () => {
        await onClose();
        window.location.reload();
      }, 600);
    },
  });
</script>

<form method="POST" action="?/import" use:enhance bind:this={formDiv}>
  <label class="cursor-pointer">
    <div
      class="max-w-600 mx-auto p-8 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 focus:outline-none"
    >
      <img
        src={ImportBlackProjectIcon}
        class="w-15 h-15 fill-current mr-auto ml-auto"
        alt="Import project icon"
      />
      <p class="mt-4 text-gray-500 text-center">
        Arrastre o seleccione un archivo: Formato válido: .TSBR
      </p>
      <input
        type="file"
        name="file"
        id="file"
        class="hidden"
        accept=",.tsbr"
        bind:value={file}
        on:change={handleFileInput}
      />
    </div>
  </label>
  {#if $errors.file}
    <p class="mt-1 text-sm text-red-500">{$errors.file}</p>
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
    <!-- <button
      type="submit"
      class="w-40 flex items-center justify-around px-2 py-2 text-xs text-white bg-[#051127] rounded-md mt-2
          hover:bg-[#505868]"
    >
      Importar proyecto
      <img src={ImportWhiteProjectIcon} class="w-4" alt="Import project" />
    </button> -->
  </div>
</form>
