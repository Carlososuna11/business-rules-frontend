<script lang="ts">
  import Title from '$lib/components/Title.svelte';
  import NestingAccordions from '$lib/components/NestingAccordions.svelte';
  import EngineContainer from '$lib/components/engine/EngineContainer.svelte';
  import type { PageData } from './$types';
  import type { Project, FieldSchema, SetContextDto } from '$lib/types';
  import type { JSONSchema7 } from 'json-schema';
  import UpdateProject from '$lib/components/UpdateProject.svelte';
  import { Magnifier } from 'svelte-magnifier';
  import { getUrlDiagram, jsonSchemaToPlantUML } from '$lib/utils';
  import SchemaForm from '$lib/components/SchemaForm.svelte';
  import { api } from '$lib/services/api.services';
  import { alertStore } from '$lib/stores';

  let title = 'Modificar Proyecto';
  let description =
    'Visualice la información del proyecto permitiendo modificarla';

  export let data: PageData;
  let initialSchema: JSONSchema7 = JSON.parse(JSON.stringify(data.schema));
  let schema: JSONSchema7 = JSON.parse(JSON.stringify(data.schema));
  let fields: FieldSchema[] = [];
  const project: Project = data.project;

  const stepperInfo = {
    project: {
      active: true,
      title: 'Modificar Proyecto',
      description:
        'Visualice la información del proyecto permitiendo modificarla',
      form: data.updateForm,
    },
    domain: {
      active: false,
      title: 'Modificar Dominio de Objeto',
      description:
        'Visualice la información del dominio permitiendo modificarla',
      section: {
        domain: true,
        visualize: false,
        staticDomains: false,
      },
    },
    rules: {
      active: false,
      title: 'Modificar Reglas de Negocio',
      description:
        'Visualice la información de las reglas de negocio permitiendo modificarla',
    },
  };

  const activateStep = (step: string) => {
    switch (step) {
      case 'project':
        stepperInfo.project.active = true;
        stepperInfo.domain.active = false;
        stepperInfo.rules.active = false;
        title = stepperInfo.project.title;
        description = stepperInfo.project.description;
        break;
      case 'domain':
        stepperInfo.project.active = false;
        stepperInfo.domain.active = true;
        stepperInfo.rules.active = false;
        title = stepperInfo.domain.title;
        description = stepperInfo.domain.description;
        break;
      case 'rules':
        stepperInfo.project.active = false;
        stepperInfo.domain.active = false;
        stepperInfo.rules.active = true;
        title = stepperInfo.rules.title;
        description = stepperInfo.rules.description;
        break;
      default:
        break;
    }
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

<div class="w-full lg:w-[75%] lg:mx-auto mt-24 lg:mt-14">
  <div
    class="w-[90%] sm:w-[80%] md:w-[70%] lg:w-full relative flex flex-col gap-4 mx-auto lg:mx-0"
  >
    <div class="w-full sm:mt-6 lg:mt-14 mx-auto lg:mx-0">
      <Title {title} title_description={description} />
    </div>
  </div>
</div>
<div class="w-full lg:w-[90%] lg:mx-auto pb-4">
  <div class="mt-4 w-full lg:w-full relative flex flex-col gap-4 mx-0">
    <section class="w-full flex flex-col gap-4 bg-[#F5F5F65C] p-2 rounded-md">
      <div class="container mx-0">
        <div class="grid grid-cols-6 p-4 md:p-6">
          <div
            class="flex justify-center px-3 col-span-full md:col-span-1 md:flex-col md:justify-start md:items-start"
          >
            <button
              class={'text-center w-full p-2 border-b-2 md:border-l-2 md:border-b-0 md:py-2 md:text-left ' +
                (stepperInfo.project.active
                  ? 'md:py-3 border-[#051127] text-black bg-[#051127] bg-opacity-10'
                  : 'md:py-2 border-gray-300 text-gray-700 hover:bg-gray-200')}
              on:click={() => activateStep('project')}
            >
              <p>Proyecto</p>
            </button>
            <button
              class={'text-center w-full p-2 border-b-2 md:border-l-2 md:border-b-0 md:py-2 md:text-left ' +
                (stepperInfo.domain.active
                  ? 'md:py-3 border-[#051127] text-black bg-[#051127] bg-opacity-10'
                  : 'md:py-2 border-gray-300 text-gray-700 hover:bg-gray-200')}
              on:click={() => activateStep('domain')}
            >
              <p>Dominio</p>
            </button>
            <button
              class={'text-center w-full p-2 border-b-2 md:border-l-2 md:border-b-0 md:py-2 md:text-left ' +
                (stepperInfo.rules.active
                  ? 'md:py-3 border-[#051127] text-black bg-[#051127] bg-opacity-10'
                  : 'md:py-2 border-gray-300 text-gray-700 hover:bg-gray-200')}
              on:click={() => activateStep('rules')}
            >
              <p>Reglas</p>
            </button>
          </div>
          <div
            class="grid w-full content-center place-content-evenly py-4 text-center col-span-full md:col-span-5 md:text-left"
          >
            {#if stepperInfo.project.active}
              <div class="w-[90%] sm:w-[450px] lg:w-[650px]">
                <UpdateProject
                  {project}
                  uuid={project.uuid}
                  bind:data={stepperInfo.project.form}
                />
              </div>
            {:else if stepperInfo.domain.active}
              <div class="w-full">
                <div
                  class="grid max-w-lg grid-cols-3 gap-1 p-1 mx-auto my-2 rounded-lg bg-[#051127]"
                  role="group"
                >
                  <button
                    type="button"
                    on:click={() => {
                      stepperInfo.domain.section.domain = true;
                      stepperInfo.domain.section.visualize = false;
                      stepperInfo.domain.section.staticDomains = false;
                    }}
                    class={stepperInfo.domain.section.domain
                      ? 'px-5 py-1.5 text-xs font-medium bg-gray-300 text-gray-900 rounded-lg'
                      : 'px-5 py-1.5 text-xs font-medium text-white hover:bg-black rounded-lg'}
                  >
                    Modificar Dominio
                  </button>
                  <button
                    type="button"
                    on:click={() => {
                      stepperInfo.domain.section.domain = false;
                      stepperInfo.domain.section.visualize = true;
                      stepperInfo.domain.section.staticDomains = false;
                    }}
                    class={stepperInfo.domain.section.visualize
                      ? 'px-5 py-1.5 text-xs font-medium bg-gray-300 text-gray-900 rounded-lg'
                      : 'px-5 py-1.5 text-xs font-medium text-white hover:bg-black rounded-lg'}
                  >
                    Visualizar
                  </button>
                  <button
                    type="button"
                    on:click={() => {
                      stepperInfo.domain.section.domain = false;
                      stepperInfo.domain.section.visualize = false;
                      stepperInfo.domain.section.staticDomains = true;
                    }}
                    class={stepperInfo.domain.section.staticDomains
                      ? 'px-5 py-1.5 text-xs font-medium bg-gray-300 text-gray-900 rounded-lg'
                      : 'px-5 py-1.5 text-xs font-medium text-white hover:bg-black rounded-lg'}
                  >
                    Dominios Estáticos
                  </button>
                </div>
                <div class="my-10" />
                <div class="w-fill md:w-[500px] lg:w-[800px] xl:w-[950px]">
                  {#if stepperInfo.domain.section.domain === true}
                    <div class="w-auto">
                      <div class="w-full flex flex-col gap-1 pb-1 mx-auto mb-4">
                        <h3 class="text-xl text-[#383838] font-Syne font-bold">
                          Modificar Dominio
                        </h3>
                        <p class="text-sm text-[#757575]">
                          A continuación se muestra un formulario que te
                          permitirá definir el dominio al cual aplicarle las
                          reglas de negocio.
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
                        <SchemaForm bind:schema bind:fields />
                        <div class="w-full flex justify-center mt-3">
                          <button
                            type="button"
                            class="bg-[#C1C1C1] text-black rounded-md px-4 py-2 mr-3"
                            on:click={() => {
                              schema = JSON.parse(
                                JSON.stringify(initialSchema)
                              );
                              fields = [];
                            }}
                          >
                            Resetear
                          </button>
                          <button
                            type="submit"
                            on:click={async (event) => {
                              event.preventDefault();
                              await setContext(project.uuid, {
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
                  {:else if stepperInfo.domain.section.visualize === true}
                    <div class="w-auto">
                      <div class="w-full flex flex-col gap-1 pb-1 mx-auto mb-4">
                        <h3 class="text-xl text-[#383838] font-Syne font-bold">
                          Visualizar Dominio
                        </h3>
                        <p class="text-sm text-[#757575]">
                          A continuación se muestra la estructura final del
                          dominio. Puedes consultar sus propiedades y tipos.
                          También puedes ver la estructura en forma de diagrama
                          para una mejor visualización.
                        </p>
                      </div>
                      <div class="w-full flex flex-col gap-1 pb-1 mx-auto mb-4">
                        <h3
                          class="text-lg text-center text-[#383838] font-Syne font-bold"
                        >
                          Dominio
                        </h3>
                      </div>
                      <NestingAccordions bind:schema required={true} />
                      <div class="my-2" />
                      <hr class="h-px my-2 border-0 bg-gray-700" />
                      <div class="my-2" />
                      <div class="w-full flex flex-col gap-1 pb-1 mx-auto mb-4">
                        <h3
                          class="text-lg text-center text-[#383838] font-Syne font-bold"
                        >
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
                      <div
                        class="p-2 text-center rounded-lg overflow-hidden mx-auto"
                      >
                        <Magnifier
                          className="p-2 object-cover w-full md:object-scale-down"
                          src={getUrlDiagram(jsonSchemaToPlantUML(schema))}
                          zoomImgSrc={getUrlDiagram(
                            jsonSchemaToPlantUML(schema)
                          )}
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
            {:else if stepperInfo.rules.active}
              <EngineContainer />
            {/if}
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
