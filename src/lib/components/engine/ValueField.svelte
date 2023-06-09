<script lang="ts">
  import type { fieldTypes, CommandTypesOptions } from '../../types';
  import { Accordion, AccordionItem } from 'flowbite-svelte';

  export const fieldTypesDict: {
    value: fieldTypes;
    label: string;
  }[] = [
    { value: 'string', label: 'Texto' },
    { value: 'number', label: 'Número' },
    { value: 'boolean', label: 'Booleano' },
    // { value: 'object', label: 'Objeto' },
    // { value: 'array', label: 'Arreglo' },
    { value: 'null', label: 'Nulo' },
  ];

  export let onDelete: () => void = () => {};
  export let type: CommandTypesOptions = 'string';

  export let title = 'Valor';
  export let acceptedTypes: CommandTypesOptions[] = [];
  export let value: number | string | boolean | Array<unknown> | object | null =
    null;
  let booleanValue: boolean = false;

  function setInitialType(type: CommandTypesOptions | string) {
    switch (type) {
      case 'string':
        if (typeof value !== 'string') value = '';
        break;
      case 'number':
        if (typeof value !== 'number') value = 0;
        break;
      case 'boolean':
        if (typeof value !== 'boolean') value = false;
        break;
      case 'object':
        if (typeof value !== 'object') value = {};
        break;
      case 'array':
        if (!Array.isArray(value)) value = [];
        break;
      case 'null':
        if (value !== null) value = null;
        break;
      default:
        type = 'string';
        value = '';
        break;
    }
  }

  function castValue() {
    switch (type) {
      case 'string':
        value = String(value);
        break;
      case 'number':
        value = Number(value);
        break;
      case 'boolean':
        value = Boolean(value);
        break;
      case 'object':
        value = Object(value);
        break;
      case 'array':
        value = Array(value);
        break;
      case 'null':
        value = null;
        break;
      default:
        type = 'string';
        value = '';
        break;
    }
  }

  $: typeof value === 'boolean' && (booleanValue = value);
</script>

<Accordion
  class="bg-[#051127] my-2 group-first:rounded-b-xl"
  activeClasses="bg-gray-800 text-white focus:ring-4 focus:ring-gray-800 group-first:rounded-b-xl"
  inactiveClasses="text-gray-400 bg-gray-800 group-first:rounded-b-xl"
  defaultClass="text-gray-400 group-first:rounded-b-xl"
>
  <AccordionItem>
    <span slot="header">
      <p>
        <span class="font-bold">{title}</span>
      </p>
    </span>
    <div class="w-full flex flex-col gap-2 lg:gap-1">
      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for={`value-type`}
          >
            Tipo de Campo
          </label>
          <div class="relative">
            <select
              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id={`value-type`}
              bind:value={type}
            >
              {#each Object.entries(fieldTypesDict) as [type, label]}
                {#if acceptedTypes.includes(label.value) || acceptedTypes.length == 0 || acceptedTypes.includes('unknown')}
                  <option
                    value={label.value}
                    on:click={() => {
                      type = label.value;
                      setInitialType(type);
                      castValue();
                    }}>{label.label}</option
                  >
                {/if}
              {/each}
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                ><path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                /></svg
              >
            </div>
          </div>
        </div>
        {#if type == 'string'}
          <div class="w-full md:w-1/2 px-3 mb-2 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for={`object-value`}
            >
              Valor
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id={`object-value`}
              type="text"
              bind:value
            />
          </div>
        {:else if type == 'number'}
          <div class="w-full md:w-1/2 px-3 mb-2 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for={`object-value`}
            >
              Valor
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id={`object-value`}
              type="number"
              bind:value
            />
          </div>
        {:else if type == 'boolean'}
          <div class="w-full md:w-1/3 px-3 mb-2 md:mb-0">
            <span
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 h-[24px] bg-white-400"
            />
            <div
              class="flex items-center pl-4 py-[10px] px-4 border rounded border-white align-end"
            >
              <input
                id={`object-value`}
                type="checkbox"
                bind:checked={booleanValue}
                on:change={() => (value = booleanValue)}
                class="w-4 h-4 text-white-600 bg-gray-100 border-gray-300 rounded focus:ring-white-600 ring-offset-white focus:ring-2 bg-white border-white"
              />
              <label
                class="block uppercase tracking-wide text-white text-xs font-bold ml-2"
                for={`object-value`}
              >
                Valor
              </label>
            </div>
          </div>
        {/if}
      </div>
    </div>
    <button
      type="button"
      class="my-1 bg-red-600 text-white rounded-md px-2 py-1 mr-2"
      on:click={onDelete}
    >
      Eliminar
    </button>
  </AccordionItem>
</Accordion>
