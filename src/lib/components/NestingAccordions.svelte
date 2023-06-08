<!-- NestingAccordions.svelte -->
<script lang="ts">
  import { AccordionItem, Accordion } from 'flowbite-svelte';
  import type { JSONSchema7 } from 'json-schema';

  // Propiedades del componente
  export let schema: JSONSchema7;
  export let title: string | undefined = undefined;
  export let required: boolean | undefined = undefined;
</script>

<Accordion
  class="bg-[#051127]"
  activeClasses="bg-gray-800 text-white focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800"
  inactiveClasses="text-gray-400 bg-gray-800"
  defaultClass="text-gray-400"
>
  <!-- String Element -->
  {#if schema.type === 'string' || schema.type === 'number' || schema.type === 'integer' || schema.type === 'boolean'}
    <AccordionItem>
      <span slot="header"
        ><p>
          <span class="font-bold">{title || schema.title || schema.type}</span
          ><span class="font-bold">{required ? '*' : ''}</span>{' - '}<code
            class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-1"
          >
            {schema.type}
          </code>
        </p></span
      >
      <p class="mb-2 text-gray-500 dark:text-gray-400">
        <span class="font-bold">{schema.title || ''}</span>
      </p>
      {#if required}
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          <span class="font-bold">Requerido</span>
        </p>
      {/if}
      <p class="mb-2 text-gray-500 dark:text-gray-400">
        {schema.description || ''}
      </p>
      <p class="mb-2 text-gray-500 dark:text-gray-400">
        <span class="font-bold">Tipo</span>:
        <code
          class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-1"
        >
          {schema.type}
        </code>
      </p>
      <!-- if required -->
      {#if schema.enum}
        <span class="mb-2 text-gray-500 dark:text-gray-400"
          ><span class="font-bold">Valores Posibles</span>:
          <code
            class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-1"
          >
            <span class="flex gap-4">
              <span class="flex-1">
                <span>{'[ ' + schema.enum.join(', ') + ' ]'}</span>
              </span>
            </span>
          </code>
        </span>
      {/if}
      {#if schema.multipleOf}
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          <span class="font-bold">Multiplo de</span>:<code
            class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-1"
          >
            {schema.multipleOf}
          </code>
        </p>
      {/if}
      {#if schema.minimum !== (null || undefined) || schema.maximum !== (null || undefined) || schema.exclusiveMaximum !== (null || undefined) || schema.exclusiveMinimum !== (null || undefined)}
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          <span class="font-bold">Rango de Valores</span>:
          <code
            class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-1"
          >
            {#if schema.maximum !== (null || undefined)}
              {' ≤ ' + String(schema.maximum)}
            {/if}
            {#if schema.exclusiveMaximum !== (null || undefined)}
              {' < ' + String(schema.exclusiveMaximum)}
            {/if}
            valor
            {#if schema.minimum !== (null || undefined)}
              {' ≥ ' + String(schema.minimum)}
            {/if}
            {#if schema.exclusiveMinimum !== (null || undefined)}
              {' > ' + String(schema.exclusiveMinimum)}
            {/if}
          </code>
        </p>
      {/if}
      {#if schema.minLength !== (null || undefined)}
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          <span class="font-bold">Mínimo de Caracteres</span>
          <code
            class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-1"
            >{schema.minLength}
          </code>
        </p>
      {/if}
      {#if schema.maxLength !== (null || undefined)}
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          <span class="font-bold">Máximo de Caracteres</span>
          <code
            class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-1"
            >{schema.maxLength}
          </code>
        </p>
      {/if}
      {#if schema.pattern}
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          <span class="font-bold">Patrón</span>:<code
            class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-1"
            >{schema.pattern}</code
          >
        </p>
      {/if}
      {#if schema.format}
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          <span class="font-bold">Formato</span>:<code
            class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-1"
            >{schema.format}</code
          >
        </p>
      {/if}
      {#if schema.const}
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          <span class="font-bold">Constante</span>:<code
            class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-1"
            >{schema.const}</code
          >
        </p>
      {/if}
      {#if schema.default}
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          <span class="font-bold">Valor por Defecto</span>:<code
            class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-1"
            >{schema.default}</code
          >
        </p>
      {/if}
    </AccordionItem>
  {:else if schema.type === 'object'}
    <AccordionItem>
      <span slot="header"
        ><p>
          <span class="font-bold">{title || schema.title || schema.type}</span
          ><span class="font-bold">{required ? '*' : ''}</span>{' - '}<code
            class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-1"
          >
            {schema.type}
          </code>
        </p></span
      >
      <p class="mb-2 text-gray-500 dark:text-gray-400">
        <span class="font-bold">{schema.title || ''}</span>
      </p>
      {#if required}
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          <span class="font-bold">Requerido</span>
        </p>
      {/if}
      <p class="mb-2 text-gray-500 dark:text-gray-400">
        {schema.description || ''}
      </p>
      <!-- if required -->
      {#if schema.minProperties !== (null || undefined)}
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          <span class="font-bold">Mínimo de Propiedades</span>:<code
            class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-1"
          >
            {schema.minProperties}
          </code>
        </p>
      {/if}
      {#if schema.maxProperties !== (null || undefined)}
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          <span class="font-bold">Máximo de Propiedades</span>:<code
            class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-1"
          >
            {schema.maxProperties}
          </code>
        </p>
      {/if}
      {#if schema.patternProperties}
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          <span class="font-bold">Patrón de Propiedades</span>:<code
            class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-1"
          >
            {schema.patternProperties}
          </code>
        </p>
      {/if}
      {#if schema.additionalProperties}
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          <span class="font-bold">¿Propiedades Adicionales?</span>:<code
            class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-1"
          >
            {schema.additionalProperties}
          </code>
        </p>
      {/if}
      {#if schema.dependencies}
        <span class="mb-2 text-gray-500 dark:text-gray-400"
          ><span class="font-bold">Dependencias</span>:
          {#if Array.isArray(schema.dependencies)}
            <code
              class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-1"
            >
              <span class="flex gap-4">
                <span class="flex-1">
                  <span>{'[ ' + schema.dependencies.join(', ') + ' ]'}</span>
                </span>
              </span>
            </code>
          {:else}
            <code
              class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-1"
            >
              {schema.dependencies}
            </code>
          {/if}
        </span>
      {/if}
      {#if schema.propertyNames}
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          <span class="font-bold">Nombre de Propiedades</span>:<code
            class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-1"
          >
            {schema.propertyNames}
          </code>
        </p>
      {/if}
      {#if schema.default}
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          <span class="font-bold">Valor por Defecto</span>:<code
            class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-1"
          >
            {schema.default}
          </code>
        </p>
      {/if}
      <!-- Recorrer cada elemento y llamar al componente de nuevo -->
      {#if schema.properties && typeof schema.properties === 'object'}
        {#each Object.keys(schema.properties) as key}
          <!--  -->
          <svelte:self
            schema={schema.properties[key]}
            title={key}
            required={Array.isArray(schema.required) &&
            schema.required.includes(key)
              ? true
              : false}
          />
        {/each}
      {/if}
    </AccordionItem>
  {:else if schema.type === 'array'}
    <AccordionItem>
      <span slot="header"
        ><p>
          <span class="font-bold">{title || schema.title || schema.type}</span
          ><span class="font-bold">{required ? '*' : ''}</span>{' - '}<code
            class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-1"
          >
            {schema.type}
          </code>
        </p></span
      >
      <p class="mb-2 text-gray-500 dark:text-gray-400">
        <span class="font-bold">{schema.title || ''}</span>
      </p>
      {#if required}
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          <span class="font-bold">Requerido</span>
        </p>
      {/if}
      <p class="mb-2 text-gray-500 dark:text-gray-400">
        {schema.description || ''}
      </p>
      <!-- if required -->
      {#if schema.uniqueItems}
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          <span class="font-bold">Items Únicos</span>
        </p>
      {/if}
      {#if schema.minItems}
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          <span class="font-bold">Mínimo de Items</span>:<code
            class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-1"
          >
            {schema.minItems}
          </code>
        </p>
      {/if}
      {#if schema.maxItems}
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          <span class="font-bold">Máximo de Items</span>:<code
            class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-1"
          >
            {schema.maxItems}
          </code>
        </p>
      {/if}
      {#if schema.additionalItems}
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          <span class="font-bold">¿Items Adicionales?</span>:<code
            class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-1"
          >
            {schema.additionalItems}
          </code>
        </p>
      {/if}
      {#if schema.items}
        {#if Array.isArray(schema.items)}
          {#each schema.items as item, index}
            <!--  -->
            <svelte:self
              schema={schema.items[index]}
              title={`Item[${index}]`}
            />
          {/each}
        {/if}
        {#if typeof schema.items === 'object'}
          <!--  -->
          <svelte:self schema={schema.items} title="Item" />
        {/if}
      {/if}
      {#if schema.contains}
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          <span class="font-bold">¿Es Contenido?</span>:<code
            class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-1"
          >
            {schema.contains}
          </code>
        </p>
        <p class="mb-2 text-gray-500 dark:text-gray-400" />
      {/if}
      {#if schema.default}
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          <span class="font-bold">Valor por Defecto</span>:<code
            class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-1"
          >
            {schema.default}
          </code>
        </p>
      {/if}
    </AccordionItem>
  {/if}
</Accordion>
