<script lang="ts">
  import Modal from '../Modal.svelte';
  import type {
    CommandInfo,
    CommandTypesOptions,
    CateroryInfo,
    Data,
    CommandType,
    Property,
  } from '../../types';
  import SearchIcon from '../../../assets/svg/search-icon.svg';
  import { Accordion, AccordionItem } from 'flowbite-svelte';
  import ValueField from './ValueField.svelte';

  export let commands: CommandInfo[] = [];
  export let data: Data | number | string | Array<number | string> | undefined;
  export let deep: number = 0;
  export let isContextDropdown: boolean = false;
  export let acceptedTypes: CommandTypesOptions[] = ['unknown'];
  export let canDelete: boolean = true;
  export let properties: Property[] = [];
  export let onDelete: () => void = () => {};

  let dataCommand: unknown[] = [];

  function getCategories() {
    const categories: CateroryInfo[] = [];
    commands.forEach((command) => {
      const category = categories.find((c) => c.id === command.category.id);
      if (!category) {
        categories.push(command.category);
      }
    });
    return categories;
  }

  const commandMap: Record<CommandType, string> = {
    function: '$fn.',
    operator: '$op.',
    context: '$ctx.',
  };

  let modalInfo = {
    command: false,
    value: false,
  };

  const categories: CateroryInfo[] = getCategories();
  let commandSelected: CommandInfo | undefined = idToCommand(data);

  function onSelectedCommand() {
    // remove all values from data
    if (!commandSelected) return;
    // vaciar data (sin quitar referencia)
    data = {};
    // get base command
    const base = commandMap[commandSelected.type];
    // set command to data
    data[`${base}${commandSelected.id}`] = dataCommand;
  }

  function idToCommand(data: Data | unknown) {
    if (typeof data !== 'object') return;
    if (typeof data === 'object' && Array.isArray(data)) return;
    if (!data) return;
    if (!Object.keys(data).length) return;
    const id = Object.keys(data)[0];
    const commandId = id.split('.')[1];
    const command = commands.find((command) => command.id === commandId);
    if (command) {
      // if data has key copy the dataCommand
      let dataObject = data as Data;
      if (dataObject[id]) {
        dataCommand = dataObject[id] as unknown[];
      }
    }
    return command;
  }

  function getType(
    value:
      | number
      | string
      | boolean
      | Array<unknown>
      | object
      | null
      | undefined
  ): CommandTypesOptions | undefined {
    if (typeof value === 'string') {
      return 'string';
    } else if (typeof value === 'number') {
      return 'number';
    } else if (typeof value === 'boolean') {
      return 'boolean';
    } else if (Array.isArray(value)) {
      return 'array';
    } else if (value === null || value === undefined) {
      return 'null';
    } else if (typeof value === 'object') {
      return 'object';
    } else {
      return 'unknown';
    }
  }

  $: dataCommand.length > -1 && onSelectedCommand();
  $: !commandSelected &&
    (typeof data !== 'object' || Array.isArray(data)) &&
    (modalInfo.value = true);
</script>

<div>
  {#if !commandSelected && modalInfo.value === false}
    <div
      class={`w-full flex justify-center mt-3 ${
        deep === 0 ? '' : 'bg-gray-800'
      }`}
    >
      <div class="">
        <p class={`mb-2 ${deep === 0 ? 'text-black' : 'text-gray-400'}`}>
          {deep === 0
            ? 'Prueba agregando un comando para utilizar en las reglas'
            : 'Prueba agregando un comando o una constante para utilizar en las reglas'}
        </p>
        <div class="flex justify-center">
          {#if deep > 0 && canDelete}
            <button
              type="button"
              on:click={onDelete}
              class="bg-red-600 text-white rounded-md px-2 py-1 mr-2"
            >
              Eliminar
            </button>
          {/if}
          <slot />
          <button
            type="button"
            on:click={() => {
              modalInfo.command = true;
              modalInfo.value = false;
            }}
            class={`rounded-md px-2 ${
              deep === 0
                ? 'bg-[#051127] text-white py-2 bg-[#051127]'
                : 'mr-2 bg-gray-300 text-gray-900 py-1'
            }`}
          >
            Agregar Comando
          </button>
          {#if deep > 0}
            <button
              type="button"
              on:click={() => {
                modalInfo.command = false;
                modalInfo.value = true;
                data = '';
              }}
              class="bg-gray-300 text-gray-900 rounded-md px-2 py-1"
            >
              Agregar Constante
            </button>
          {/if}
        </div>
      </div>
    </div>
  {:else if commandSelected}
    <Accordion
      class="bg-[#051127] my-2 group-first:rounded-b-xl"
      activeClasses="bg-gray-800 text-white focus:ring-4 focus:ring-gray-800 group-first:rounded-b-xl"
      inactiveClasses="text-gray-400 bg-gray-800 group-first:rounded-b-xl"
      defaultClass="text-gray-400 group-first:rounded-b-xl"
    >
      <AccordionItem id={`condition-${deep}`}>
        <span slot="header">
          <p>
            <span class="font-bold">{commandSelected.name}</span>
          </p>
        </span>
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          {commandSelected.description}
        </p>

        {#if commandSelected.argumentType === 'variable'}
          <!-- Means Have infinites arguments -->

          {#each dataCommand as value, index}
            <svelte:self
              {commands}
              bind:properties
              bind:data={dataCommand[index]}
              onDelete={() => {
                // remove value from data
                dataCommand = [
                  ...dataCommand.slice(0, index),
                  ...dataCommand.slice(index + 1),
                ];
              }}
              deep={deep + 1}
              acceptedTypes={Array.isArray(commandSelected.arguments)
                ? commandSelected.arguments[0].acceptedTypes
                : commandSelected.arguments.acceptedTypes}
            />
          {/each}

          <div class="w-full flex justify-center mt-3">
            <button
              type="button"
              on:click={() => {
                dataCommand = [...dataCommand, {}];
              }}
              class="text-[#051127] bg-white rounded-md px-4 py-2"
            >
              Agregar Argumento
            </button>
          </div>
        {/if}
        {#if commandSelected.argumentType === 'non-variable'}
          {#if Array.isArray(commandSelected.arguments)}
            {#each commandSelected.arguments as argument, index}
              <div class="bg-gray-800">
                <span class="text-center">
                  <p class="mb-2 mt-3 text-gray-400">
                    <strong>{argument.name}</strong>
                    <code
                      class="text-sm sm:text-base flex inline-flex text-center items-center text-center space-x-4 bg-gray-800 text-white p-1"
                    >
                      {#each argument.acceptedTypes as type, index}
                        {type}{#if index < argument.acceptedTypes.length - 1}{' '}||{' '}{/if}
                      {/each}</code
                    >
                  </p>
                  <p class="my-2 text-gray-400">
                    {argument.description}
                  </p>
                </span>
                <p />
                <svelte:self
                  {commands}
                  bind:properties
                  bind:data={dataCommand[index]}
                  deep={deep + 1}
                  acceptedTypes={commandSelected.type === 'context' &&
                  index === 0
                    ? acceptedTypes
                    : argument.acceptedTypes}
                  canDelete={false}
                  isContextDropdown={commandSelected.type === 'context' &&
                  index === 0
                    ? true
                    : false}
                  onDelete={() => {
                    // no remove, just set undefined
                    dataCommand[index] = {};
                    dataCommand = [...dataCommand];
                  }}
                />
              </div>
            {/each}
          {/if}
        {/if}
        <button
          type="button"
          class="my-1 bg-red-600 text-white rounded-md px-2 py-1 mr-2"
          on:click={() => {
            commandSelected = undefined;
            dataCommand = [];
            data = {};
          }}
        >
          Eliminar
        </button>
      </AccordionItem>
    </Accordion>
  {:else if modalInfo.value && !isContextDropdown}
    <ValueField
      bind:value={data}
      onDelete={() => {
        data = {};
        modalInfo.value = false;
        modalInfo.command = false;
      }}
      acceptedTypes={acceptedTypes?.filter((type) =>
        ['string', 'boolean', 'unknown', 'null', 'number'].includes(type)
      )}
      type={getType(data) ?? 'unknown'}
    />
  {:else if modalInfo.value && isContextDropdown}
    <Accordion
      class="bg-[#051127] my-2 group-first:rounded-b-xl"
      activeClasses="bg-gray-800 text-white focus:ring-4 focus:ring-gray-800 group-first:rounded-b-xl"
      inactiveClasses="text-gray-400 bg-gray-800 group-first:rounded-b-xl"
      defaultClass="text-gray-400 group-first:rounded-b-xl"
    >
      <AccordionItem id={`condition-${deep}`}>
        <span slot="header">
          <p>
            <span class="font-bold">Clave</span>
          </p>
        </span>
        <div class="w-full flex flex-col">
          <div class="flex flex-wrap mb-2">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                for={`value-type`}
              >
                Atributo
              </label>
              <div class="relative">
                <select
                  class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id={`value-type`}
                  bind:value={data}
                >
                  {#each properties as property, index}
                    {#if acceptedTypes.includes(property.type) || acceptedTypes.length == 0 || acceptedTypes.includes('unknown')}
                      <option
                        value={property.value}
                        on:click={() => {
                          data = property.value;
                        }}>{property.name}</option
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
              <button
                type="button"
                class="my-1 bg-red-600 text-white rounded-md px-2 py-1 mr-2"
                on:click={() => {
                  commandSelected = undefined;
                  dataCommand = [];
                  data = {};
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  {/if}
</div>

{#if modalInfo.command}
  <Modal
    title={'Selección de Comando'}
    description={'Selecione un comando para utilizar en las reglas'}
    bind:showModal={modalInfo.command}
    onClose={() => {
      modalInfo.command = false;
      modalInfo.value = false;
    }}
    size="lg"
  >
    <div
      class="w-full lg:w-100% flex items-center relative z-30 justify-between"
    >
      <div class="w-full h-8 flex gap-5 px-2 rounded-md bg-gray-300 text-black">
        <input
          type="text"
          class="w-full h-ful outline-none pl-1 text-sm bg-inherit text-black"
          placeholder="Búsqueda"
        />
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <img class="cursor-pointer" src={SearchIcon} alt="Search icon" />
      </div>
    </div>
    <span class="my-2" />
    <Accordion
      class="bg-[#051127] my-2 "
      activeClasses="bg-gray-800 text-white focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800"
      inactiveClasses="text-gray-400 bg-gray-800"
      defaultClass="text-gray-400"
    >
      {#each categories as category}
        {#if commands.filter((command) => command.category.id === category.id && (acceptedTypes.includes(command.returnType) || command.returnType === 'unknown' || acceptedTypes.includes('unknown'))).length}
          <AccordionItem id={category.id}>
            <span slot="header">
              <p>
                <span class="font-bold">{category.name}</span>
              </p>
            </span>
            <p class="mb-2 text-gray-500 dark:text-gray-400">
              {category.description}
            </p>

            <Accordion
              class="bg-[#051127] my-2"
              activeClasses="bg-gray-800 text-white focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800"
              inactiveClasses="text-gray-400 bg-gray-800"
              defaultClass="text-gray-400"
            >
              {#each commands as command}
                {#if command.category.id === category.id && (acceptedTypes.includes(command.returnType) || command.returnType === 'unknown' || acceptedTypes.includes('unknown'))}
                  <AccordionItem id={command.id}>
                    <span slot="header">
                      <p>
                        <span class="font-bold">{command.name}</span>
                      </p>
                    </span>
                    <p class="mb-2 text-gray-500 dark:text-gray-400">
                      {command.description}
                    </p>
                    <span class="my-1" />

                    {#if command.examples.length}
                      <p
                        class="mb-2 text-gray-500 dark:text-gray-400 font-bold text-center"
                      >
                        Ejemplos
                      </p>

                      {#each command.examples as example}
                        <code
                          class="w-full flex justify-center text-sm sm:text-base inline-flex text-center items-center space-x-4 bg-gray-800 text-white p-1"
                        >
                          {example}
                        </code>
                      {/each}
                    {/if}
                    <div class="w-full flex justify-center mt-3">
                      <button
                        type="button"
                        on:click={() => {
                          data = {};
                          commandSelected = command;
                          if (
                            commandSelected.argumentType === 'non-variable' &&
                            Array.isArray(commandSelected.arguments)
                          ) {
                            dataCommand = commandSelected.arguments.map(
                              () => ({})
                            );
                            if (commandSelected.type === 'context') {
                              dataCommand[0] = '';
                            }
                          }
                          onSelectedCommand();
                          modalInfo.command = false;
                          modalInfo.value = false;
                          document.body.style.overflow = 'auto';
                        }}
                        class="text-[#051127] bg-white rounded-md px-4 py-2"
                      >
                        Utilizar
                      </button>
                    </div>
                  </AccordionItem>
                {/if}
              {/each}
            </Accordion>
          </AccordionItem>
        {/if}
      {/each}
    </Accordion>
  </Modal>
{/if}
