<script lang="ts">
  import Title from '$lib/components/Title.svelte';
  import EngineContainer from '$lib/components/engine/EngineContainer.svelte';
  import type { PageData } from './$types';
  import type { Project } from '$lib/types';
  import type { JSONSchema7 } from 'json-schema';
  import UpdateProject from '$lib/components/UpdateProject.svelte';
  import Domain from '$lib/components/domain/Domain.svelte';

  let title = 'Modificar Proyecto';
  let description =
    'Visualice la información del proyecto permitiendo modificarla';

  export let data: PageData;
  let initialSchema: JSONSchema7 = JSON.parse(JSON.stringify(data.schema));
  let schema: JSONSchema7 = JSON.parse(JSON.stringify(data.schema));
  let extraSchema: JSONSchema7 = schema.properties?.extra as JSONSchema7;
  let dataSchema: JSONSchema7 = schema.properties?.data as JSONSchema7;
  let initialEngine = JSON.parse(JSON.stringify(data.engine));
  let engine = JSON.parse(JSON.stringify(data.engine));

  const commands = data.commands;
  const project: Project = data.project;

  $: schema.properties?.data &&
    (dataSchema = schema.properties?.data as JSONSchema7);

  $: schema.properties?.extra &&
    (extraSchema = schema.properties?.extra as JSONSchema7);

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
      section: {
        modify: true,
        visualize: false,
      },
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
              <Domain
                bind:schema
                bind:extraSchema
                bind:dataSchema
                bind:initialSchema
                bind:section={stepperInfo.domain.section}
                uuid={project.uuid}
              />
            {:else if stepperInfo.rules.active}
              <EngineContainer
                {commands}
                bind:schema
                bind:engine
                {initialEngine}
                uuid={project.uuid}
                bind:section={stepperInfo.rules.section}
              />
            {/if}
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
