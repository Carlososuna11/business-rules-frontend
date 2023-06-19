<script lang="ts">
  import RuleForm from './RuleForm.svelte';
  import { Magnifier } from 'svelte-magnifier';
  import type { CommandInfo, Engine } from '../../types';
  import type { JSONSchema7 } from 'json-schema';
  import { extractProperties, engineToDiagram } from '../../utils';

  type Section = {
    modify: boolean;
    visualize: boolean;
  };

  export let commands: CommandInfo[] = [];
  export let engine: Engine;
  export let schema: JSONSchema7;
  let properties = extractProperties(schema);
  let diagram: string;
  export let initialEngine: Engine;
  export let uuid: string;
  export let section: Section = {
    modify: true,
    visualize: false,
  };

  async function updateDiagram() {
    diagram = (await engineToDiagram(engine)) || diagram;
  }

  $: schema && (properties = extractProperties(schema));
  $: engine && updateDiagram();

  updateDiagram();
</script>

<div class="w-full">
  <div
    class="grid max-w-lg grid-cols-2 gap-1 p-1 mx-auto my-2 rounded-lg bg-[#051127]"
    role="group"
  >
    <button
      type="button"
      on:click={() => {
        section.modify = true;
        section.visualize = false;
      }}
      class={section.modify
        ? 'px-5 py-1.5 text-xs font-medium bg-gray-300 text-gray-900 rounded-lg'
        : 'px-5 py-1.5 text-xs font-medium text-white hover:bg-black rounded-lg'}
    >
      Modificar
    </button>
    <button
      type="button"
      on:click={() => {
        section.modify = false;
        section.visualize = true;
      }}
      class={section.visualize
        ? 'px-5 py-1.5 text-xs font-medium bg-gray-300 text-gray-900 rounded-lg'
        : 'px-5 py-1.5 text-xs font-medium text-white hover:bg-black rounded-lg'}
    >
      Visualizar
    </button>
  </div>
  <div class="my-10" />
  {#if section.modify}
    <div class="w-fill md:w-[500px] lg:w-[800px] xl:w-[950px]">
      <RuleForm
        {commands}
        bind:properties
        bind:rules={engine.rules}
        initialRules={initialEngine.rules}
        {uuid}
      />
    </div>
  {:else if section.visualize}
    <div class="w-fill md:w-[500px] lg:w-[800px] xl:w-[950px]">
      <div class="w-full flex flex-col gap-1 pb-1 mx-auto mb-4">
        <h3 class="text-xl text-[#383838] font-Syne font-bold">
          Visualización de Reglas
        </h3>
        <p class="text-sm text-[#757575]">
          A continuación se muestra una Visualización de las reglas que componen
          el proyecto.
        </p>
        {#if diagram}
          <div class="w-full flex justify-center">
            <a
              class="bg-[#051127] text-white rounded-md px-4 py-2"
              href={diagram}
              target="_blank"
              download="diagrama.png"
              rel="noopener noreferrer"
            >
              Descargar Diagrama
            </a>
          </div>
          <div class="p-2 text-center rounded-lg overflow-hidden mx-auto">
            <Magnifier
              className="p-2 object-cover w-full md:object-scale-down"
              src={diagram}
              zoomImgSrc={diagram}
              alt="Diagrama de Dominio"
              zoomFactor={0.5}
              mgWidth={500}
              mgHeight={500}
              mgBorderWidth={0}
              mgShape="square"
            />
          </div>
        {:else}
          <div class="w-full flex justify-center">
            <p class="text-sm text-[#757575]">
              No hay reglas para visualizar o las reglas estan incompletas para
              renderizar
            </p>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>
