<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import ArrowRightIcon from '../../assets/svg/arrow-right-icon.svg';
  import { newProjectSchema } from '$lib/schemas/project';
  import type { PageData } from './$types';
  import Form from '../../lib/components/Form.svelte';

  const focus = {
    name: false,
    description: false,
  };

  const title: string = 'Proyecto Nuevo';
  const description: string = [
    'Esta función te permite',
    'crear un nuevo proyecto',
    'para desarrollar. Puedes',
    'especificar un nombre para',
    'el proyecto, y otros detalles.',
    'Una vez creado, el proyecto estará',
    'listo para empezar a desarrollar.',
  ].join(' ');

  export let data: PageData;

  const { form, errors, enhance, constraints } = superForm(data.form, {
    validators: newProjectSchema,
  });
</script>

<Form {title} {description}>
  <form method="POST" use:enhance>
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
          placeholder="Ingresa una descripción del proyecto..."
          on:blur={() => (focus.description = false)}
          on:focus={() => (focus.description = true)}
          bind:value={$form.description}
        />
      </div>
      {#if $errors.description}
        <p class="mt-1 text-sm text-red-500">{$errors.description}</p>
      {/if}
      <div class="flex gap-2 justify-between">
        <button
          type="submit"
          class="w-32 flex items-center justify-around px-2 py-2 text-xs text-white bg-[#051127] rounded-md mt-2"
        >
          Crear Proyecto
          <img src={ArrowRightIcon} class="w-4" alt="Arrow left icon" />
        </button>
      </div>
    </div>
  </form>
</Form>
