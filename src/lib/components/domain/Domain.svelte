<script lang="ts">
  import { Magnifier } from 'svelte-magnifier';
  import NestingAccordions from '$lib/components/domain/NestingAccordions.svelte';
  import { getUrlDiagram, jsonSchemaToPlantUML } from '$lib/utils';
  import type { FieldSchema, SetContextDto } from '$lib/types';
  import SchemaForm from '$lib/components/domain/SchemaForm.svelte';
  import type { JSONSchema7 } from 'json-schema';
  import { api } from '$lib/services/api.services';
  import { alertStore } from '$lib/stores';

  type Section = {
    domain: boolean;
    visualize: boolean;
    staticDomains: boolean;
  };

  let dataFields: FieldSchema[] = [];
  let extraFields: FieldSchema[] = [];
  export let schema: JSONSchema7;
  export let dataSchema: JSONSchema7;
  export let extraSchema: JSONSchema7;
  export let initialSchema: JSONSchema7;
  export let uuid: string;
  export let section: Section = {
    domain: true,
    visualize: false,
    staticDomains: false,
  };
  /* API */
  const setContext = async (uuid: string, context: SetContextDto) => {
    try {
      const response = await api.setContext(uuid, context);
      initialSchema = JSON.parse(JSON.stringify(response));
      schema = JSON.parse(JSON.stringify(response));
      alertStore.set({
        color: 'green',
        message: 'Dominio actualizado exitosamente',
        visible: true,
      });
      return response;
    } catch (error) {
      /* empty */
    }
  };
</script>

<div class="w-full">
  <div
    class="grid max-w-lg grid-cols-3 gap-1 p-1 mx-auto my-2 rounded-lg bg-[#051127]"
    role="group"
  >
    <button
      type="button"
      on:click={() => {
        section.domain = true;
        section.visualize = false;
        section.staticDomains = false;
      }}
      class={section.domain
        ? 'px-5 py-1.5 text-xs font-medium bg-gray-300 text-gray-900 rounded-lg'
        : 'px-5 py-1.5 text-xs font-medium text-white hover:bg-black rounded-lg'}
    >
      Modificar Dominio
    </button>
    <button
      type="button"
      on:click={() => {
        section.domain = false;
        section.visualize = true;
        section.staticDomains = false;
      }}
      class={section.visualize
        ? 'px-5 py-1.5 text-xs font-medium bg-gray-300 text-gray-900 rounded-lg'
        : 'px-5 py-1.5 text-xs font-medium text-white hover:bg-black rounded-lg'}
    >
      Visualizar
    </button>
    <button
      type="button"
      on:click={() => {
        section.domain = false;
        section.visualize = false;
        section.staticDomains = true;
      }}
      class={section.staticDomains
        ? 'px-5 py-1.5 text-xs font-medium bg-gray-300 text-gray-900 rounded-lg'
        : 'px-5 py-1.5 text-xs font-medium text-white hover:bg-black rounded-lg'}
    >
      Dominios Estáticos
    </button>
  </div>
  <div class="my-10" />
  <div class="w-fill md:w-[500px] lg:w-[800px] xl:w-[950px]">
    {#if section.domain === true}
      <div class="w-auto">
        <div class="w-full flex flex-col gap-1 pb-1 mx-auto mb-4">
          <h3 class="text-xl text-[#383838] font-Syne font-bold">
            Modificar Dominio
          </h3>
          <p class="text-sm text-[#757575]">
            A continuación se muestra un formulario que te permitirá definir el
            dominio al cual aplicarle las reglas de negocio.
          </p>
        </div>
        <form>
          <div class="flex flex-wrap -mx-3 mb-4">
            <div class="w-full md:w-1/2 px-3 mb-2 md:mb-0">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="project-name"
                >
                  Nombre del Dominio
                </label>
                <input
                  class="flex items-center bg-inherit rounded-md px-2 appearance-none block w-full border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none border-gray-800 focus:bg-white-200 focus:border-gray-500"
                  id="project-name"
                  type="text"
                  bind:value={schema.title}
                />
              </div>
            </div>
          </div>
          <h3
            class="text-lg text-center text-[#383838] font-Syne font-bold mb-2"
          >
            Estructura del Dominio
          </h3>
          <SchemaForm bind:schema={dataSchema} bind:fields={dataFields} />
          <hr class="h-px my-4 border-0 bg-gray-700 mx-[20%]" />
          <h3
            class="text-lg text-center text-[#383838] font-Syne font-bold mb-2"
          >
            Atributos Calculados
          </h3>
          <SchemaForm bind:schema={extraSchema} bind:fields={extraFields} />
          <div class="w-full flex justify-center mt-3">
            <button
              type="button"
              class="bg-[#C1C1C1] text-black rounded-md px-4 py-2 mr-3"
              on:click={() => {
                schema = JSON.parse(JSON.stringify(initialSchema));
                dataFields = [];
                extraFields = [];
              }}
            >
              Resetear
            </button>
            <button
              type="submit"
              on:click={async (event) => {
                event.preventDefault();
                await setContext(uuid, {
                  context: schema,
                });
              }}
              class="bg-[#051127] text-white rounded-md px-4 py-2"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    {:else if section.visualize === true}
      <div class="w-auto">
        <div class="w-full flex flex-col gap-1 pb-1 mx-auto mb-4">
          <h3 class="text-xl text-[#383838] font-Syne font-bold">
            Visualizar Dominio
          </h3>
          <p class="text-sm text-[#757575]">
            A continuación se muestra la estructura final del dominio. Puedes
            consultar sus propiedades y tipos. También puedes ver la estructura
            en forma de diagrama para una mejor visualización.
          </p>
        </div>
        <div class="w-full flex flex-col gap-1 pb-1 mx-auto mb-4">
          <h3 class="text-lg text-center text-[#383838] font-Syne font-bold">
            Dominio
          </h3>
        </div>
        <NestingAccordions bind:schema required={true} />
        <div class="my-2" />
        <hr class="h-px my-2 border-0 bg-gray-700" />
        <div class="my-2" />
        <div class="w-full flex flex-col gap-1 pb-1 mx-auto mb-4">
          <h3 class="text-lg text-center text-[#383838] font-Syne font-bold">
            Diagrama
          </h3>
        </div>
        <div class="w-full flex justify-center">
          <a
            class="bg-[#051127] text-white rounded-md px-4 py-2"
            href={getUrlDiagram(jsonSchemaToPlantUML(schema))}
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
            src={getUrlDiagram(jsonSchemaToPlantUML(schema))}
            zoomImgSrc={getUrlDiagram(jsonSchemaToPlantUML(schema))}
            alt="Diagrama de Dominio"
            zoomFactor={0.5}
            mgWidth={500}
            mgHeight={500}
            mgBorderWidth={0}
            mgShape="square"
          />
        </div>
      </div>
    {/if}
  </div>
</div>
