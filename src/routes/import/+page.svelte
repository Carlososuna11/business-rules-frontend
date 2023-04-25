<script lang="ts">
  import Form from '../../lib/components/Form.svelte';
  import { superForm } from 'sveltekit-superforms/client';
  import ImportBlackProjectIcon from '../../assets/svg/import-black-icon.svg';
  import ImportWhiteProjectIcon from '../../assets/svg/import-file-icon.svg';
  import type { PageData } from './$types';

  let title: string = 'Importar Proyecto';
  let description: string = [
    'Importar Proyecto te ayuda a',
    'recuperar un proyecto guardado',
    'previamente. Esta herramienta te permite',
    'cargar un proyecto desde una ubicación',
    'específica, lo que significa que puedes',
    'comenzar a trabajar sin perder tiempo.',
  ].join(' ');

  export let data: PageData;

  // const { form, errors, enhance, constraints } = superForm(data.form, {
  //   validators: ,
  // });
</script>

<Form {title} {description}>
  <form method="POST">
    <div class="import-file-view">
      <img
        src={ImportBlackProjectIcon}
        class="w-15 h-15 fill-current mr-auto ml-auto"
        alt="Import project icon"
      />
      <p class="mt-4 text-gray-500 text-center">
        Arrastre o seleccione un archivo: Formato válido: .TSBR
      </p>
    </div>
    <div class="button-row flex justify-between mt-10">
      <button
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
</Form>

<style>
  @import 'tailwindcss/base';
  @import 'tailwindcss/components';
  @import 'tailwindcss/utilities';

  .import-file-view {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    border: 2px dashed #e2e8f0;
    border-radius: 0.25rem;
  }
</style>
