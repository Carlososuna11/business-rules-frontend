<script lang="ts">
  import { onMount } from 'svelte';
  import { AccordionItem, Accordion } from 'flowbite-svelte';
  import type {
    JSONSchema7,
    JSONSchema7TypeName,
    JSONSchema7Definition,
  } from 'json-schema';

  import type { FieldSchema } from '../../types';

  export let schema: JSONSchema7 = {
    type: 'object',
    properties: {},
    required: [],
  };

  export const fieldTypes: {
    value: JSONSchema7TypeName;
    label: string;
  }[] = [
    { value: 'string', label: 'Texto' },
    { value: 'number', label: 'Número' },
    { value: 'boolean', label: 'Booleano' },
    { value: 'object', label: 'Objeto' },
    { value: 'array', label: 'Arreglo' },
  ];

  export let mode: 'object' | 'array' = 'object';
  export let fields: FieldSchema[] = [];
  export let withError = false;
  let fieldObjectNames: string[] = [];
  let fieldCount = 0;

  function addField(index: number | undefined) {
    const field: FieldSchema = {
      objectName: `field${fieldCount}`,
      schema: { type: 'string' },
    };

    fields =
      index !== undefined && index < fields.length
        ? [...fields.slice(0, index + 1), field, ...fields.slice(index + 1)]
        : [...fields, field];

    fieldCount++;
    updateFields();
  }

  function removeField(index: number) {
    fields = fields.filter((_, i) => i !== index);
    updateFields();
  }

  function updateField(
    fieldName: string,
    field: JSONSchema7Definition,
    required?: boolean
  ) {
    if (mode === 'object' && schema.properties) {
      schema.properties[fieldName] = field;
      if (schema.required === undefined) {
        schema.required = [];
      }
      if (required) {
        schema.required = Array.from(new Set([...schema.required, fieldName]));
      } else {
        schema.required = schema.required.filter((name) => name !== fieldName);
      }
    }
    if (mode === 'array' && schema.items) {
      schema.items = field;
    }
  }

  function updateFields() {
    mode === 'object' ? (schema.properties = {}) : (schema.items = {});
    fields.forEach((field) => {
      updateField(field.objectName, field.schema, field.required);
    });
  }

  function hasRepeatedNames() {
    const names = fields.map((field) => field.objectName);
    return new Set(names).size !== names.length;
  }

  $: fields.length > 0 && updateFields();
  $: withError = hasRepeatedNames();
  $: fields.length === 0 && updateSchemaFields();

  function updateSchemaFields() {
    if (mode == 'object' && schema.properties) {
      fields = Object.entries(schema.properties).map(([key, value]) => {
        if (typeof value === 'boolean') {
          value = { type: 'string' };
        }
        const field: FieldSchema = {
          objectName: key,
          schema: value,
        };
        if (schema.required) {
          field.required = schema.required.includes(key);
        }
        return field;
      });
    }
    if (mode == 'array' && schema.items) {
      fields = [
        {
          objectName: 'item',
          schema: schema.items as JSONSchema7,
        },
      ];
    }
  }

  onMount(() => {
    updateSchemaFields();
  });
</script>

<div class="mb-3">
  <div>
    {#each fields as field, index}
      <Accordion
        class="group-first:rounded-b-xl mb-4"
        activeClasses="bg-gray-100 text-black-900 focus:ring-gray-200 group-first:rounded-b-xl"
        inactiveClasses="text-black-500 hover:bg-gray-100 group-first:rounded-b-xl"
        defaultClass="text-black-500 group-first:rounded-b-xl"
      >
        <AccordionItem
          activeClasses="p-2 bg-gray-100 text-gray-900 focus:ring-4 focus:ring-gray-200"
        >
          <span slot="header"
            ><p>
              <span class="font-bold">{field.objectName}</span>
              <span class="font-bold">{field.required ? '*' : ''}</span>
              {' - '}<code
                class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-200 text-black rounded-lg p-1"
              >
                {field.schema.type}
              </code>
            </p>
          </span>
          <div class="w-full flex flex-col gap-2 lg:gap-1">
            <div class="flex flex-wrap -mx-3 mb-2">
              <div class="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for={`schema-property-${index}`}
                >
                  Nombre en Objecto
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id={`schema-property-${index}`}
                  type="text"
                  bind:value={field.objectName}
                  on:input={() => {
                    // check if the field.objectName is valid (regex)
                    const regex = new RegExp('^[a-zA-Z0-9_]+$');
                    if (!regex.test(field.objectName)) {
                      field.objectName = field.objectName.replace(
                        /[^a-zA-Z0-9_]/g,
                        ''
                      );
                    }
                    fieldObjectNames = fields.map((field) => field.objectName);
                  }}
                  pattern={'^[a-zA-Z0-9_]+$'}
                  required
                />
                <!-- If the array has more than one incidence -->
                {#if field.objectName.length < 1}
                  <p class="text-red-500 text-xs italic">
                    El nombre del campo es requerido.
                  </p>
                {/if}
                {#if fieldObjectNames.filter((name) => name === field.objectName).length > 1}
                  <p class="text-red-500 text-xs italic">
                    Ya existe un campo con este nombre.
                  </p>
                {/if}
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for={`schema-title-${index}`}
                >
                  Nombre a Mostrar
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id={`schema-title-${index}`}
                  type="text"
                  bind:value={field.schema.title}
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-2">
              <div class="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for={`schema-description-${index}`}
                >
                  Descripción
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id={`schema-description-${index}`}
                  type="text"
                  bind:value={field.schema.description}
                />
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for={`schema-type-${index}`}
                >
                  Tipo de Campo
                </label>
                <div class="relative">
                  <select
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id={`schema-type-${index}`}
                    bind:value={field.schema.type}
                  >
                    {#each Object.entries(fieldTypes) as [type, label]}
                      <option value={label.value}>{label.label}</option>
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
            </div>
            <div class="flex flex-wrap -mx-3 mb-2">
              <div class="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                <span
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 h-[16px]"
                />
                <div
                  class="flex items-center pl-4 py-3 px-4 border rounded border-gray-700 align-end"
                >
                  <input
                    id={`schema-required-${index}`}
                    type="checkbox"
                    bind:checked={field.required}
                    name="bordered-checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                  />
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold ml-2"
                    for="grid-first-name"
                  >
                    Requerido
                  </label>
                </div>
              </div>
            </div>
            <div class="w-full">
              {#if field.schema.type === 'object'}
                <!-- Titulo -->
                <p
                  class="text-center block uppercase tracking-wide text-gray-700 text-md font-bold mt-1 mb-2"
                >
                  Campos del Objeto
                </p>

                <svelte:self
                  bind:schema={field.schema}
                  mode="object"
                  bind:withError
                />
              {/if}
              {#if field.schema.type === 'array'}
                <!-- Titulo -->
                <p
                  class="text-center block uppercase tracking-wide text-gray-700 text-md font-bold mt-4 mb-2"
                >
                  Objeto del Arreglo
                </p>
                <svelte:self
                  bind:schema={field.schema}
                  mode="array"
                  bind:withError
                />
              {/if}
            </div>
            <hr class="h-[.5px] my-2 border-0 bg-gray-700 mx-[100%]" />
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <span
              on:click={() => removeField(index)}
              class="cursor-pointer mr-auto bg-red-600 text-white rounded-md px-4 py-2"
            >
              Eliminar
            </span>
          </div>
        </AccordionItem>
      </Accordion>
    {/each}
  </div>
  <div class="w-full flex justify-center mt-3">
    <button
      type="button"
      class="bg-[#051127] text-white rounded-md px-2 py-2"
      on:click={() => addField(undefined)}
    >
      Agregar campo
    </button>
  </div>
</div>
