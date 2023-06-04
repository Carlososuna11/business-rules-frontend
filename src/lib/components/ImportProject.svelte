<script lang="ts">
  import ImportBlackProjectIcon from '../../assets/svg/import-black-icon.svg';
  import ImportWhiteProjectIcon from '../../assets/svg/import-file-icon.svg';
  import type { Validation } from 'sveltekit-superforms';
  import { superForm } from 'sveltekit-superforms/client';
  import { importProjectSchema } from '$lib/schemas/project';

  export let data: Validation<typeof importProjectSchema>;

  export let onClose = () => {};

  const { form, errors, enhance, constraints } = superForm(data, {
    validators: importProjectSchema,
  });
</script>

<form method="POST" action="?/import" use:enhance>
  <div
    class="max-w-600 mx-auto p-8 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 focus:outline-none"
  >
    <label class="cursor-pointer">
      <img
        src={ImportBlackProjectIcon}
        class="w-15 h-15 fill-current mr-auto ml-auto"
        alt="Import project icon"
      />
      <p class="mt-4 text-gray-500 text-center">
        Arrastre o seleccione un archivo: Formato válido: .TSBR
      </p>
      <input type="file" name="file_upload" class="hidden" accept=",.tsbr" />
    </label>
  </div>
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
      Importar proyecto
      <img src={ImportWhiteProjectIcon} class="w-4" alt="Import project" />
    </button>
  </div>
</form>
