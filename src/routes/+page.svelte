<script lang="ts">
  import Title from '../lib/components/Title.svelte';
  import ProjectCard from '../lib/components/ProjectCard.svelte';
  import Modal from '../lib/components/Modal.svelte';
  import CreateProject from '../lib/components/CreateProject.svelte';
  import ImportProject from '../lib/components/ImportProject.svelte';
  import SearchIcon from '../assets/svg/search-icon.svg';
  import AddMore from '../assets/svg/add-round-icon.svg';
  import ImportProjectIcon from '../assets/svg/import-file-icon.svg';
  import CreateProjectIcon from '../assets/svg/create-file-icon.svg';
  import { api } from '../lib/services/api.services';
  import { onMount } from 'svelte';
  import InfiniteScroll from '../lib/components/InfiniteScroll.svelte';
  import type { Project } from '../lib/types';
  import moment from 'moment';
  import type { PageData } from './$types';
  import { getUrlSearchParams, replaceStateWithQuery } from '../lib/utils';

  /*******************************PAGINATION*********************************************/
  let loadingMore: boolean = false;
  let searching: boolean = false;
  let page = 1;
  let limit = 6;
  let nextUrl = '';
  let projects: Project[] = [];
  let newProjects: Project[] = [];
  let search: string = '';

  async function getProjects() {
    loadingMore = true;
    try {
      const response = await api.getProjects(page, limit, search);
      nextUrl = response.links.next;
      newProjects = response.data;
    } catch (error) {}
    loadingMore = false;
  }

  async function loadMore() {
    page++;
    await getProjects();
  }

  $: projects = [...projects, ...newProjects];

  // if search is not empty, filter projects
  const searchProjects = () => {
    if (search && search.length > 0 && !searching) {
      searching = true;
      projects = [];
      page = 1;
      newProjects = [];
      nextUrl = '';
      getProjects();
      searching = false;
    }
  };

  function delayedSearchProjects() {
    if (searching) return;
    setTimeout(() => {
      searchProjects();
    }, 1000);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event?.key === 'Enter') {
      delayedSearchProjects();
    }
  }

  /********************************************************************************/

  /***************************CREATE/IMPORT PROJECT****************************************/
  export let data: PageData;

  const actionProjectInfo = {
    create: {
      visible: false,
      title: 'Proyecto Nuevo',
      description: [
        'Esta función te permite',
        'crear un nuevo proyecto',
        'para desarrollar. Puedes',
        'especificar un nombre para',
        'el proyecto, y otros detalles.',
        'Una vez creado, el proyecto estará',
        'listo para empezar a desarrollar.',
      ].join(' '),
      form: data.createForm,
    },
    import: {
      visible: false,
      title: 'Importar Proyecto',
      description: [
        'Importar Proyecto te ayuda a',
        'recuperar un proyecto guardado',
        'previamente. Esta herramienta te permite',
        'cargar un proyecto desde una ubicación',
        'específica, lo que significa que puedes',
        'comenzar a trabajar sin perder tiempo.',
      ].join(' '),
      form: data.importForm,
    },
  };

  /*********************************************************************************/
  onMount(async () => {
    const searchParams = getUrlSearchParams();
    const action = searchParams.action;
    switch (action) {
      case 'import':
        actionProjectInfo.import.visible = true;
        actionProjectInfo.create.visible = false;
        break;
      case 'create':
        actionProjectInfo.import.visible = false;
        actionProjectInfo.create.visible = true;
        break;

      default:
        actionProjectInfo.import.visible = false;
        actionProjectInfo.create.visible = false;
        break;
    }
    await getProjects();
  });
</script>

<div class="w-full lg:w-[75%] lg:mx-auto mt-24 lg:mt-14 pb-4">
  <div
    class="w-[90%] sm:w-[80%] md:w-[70%] lg:w-full relative flex flex-col gap-4 mx-auto lg:mx-0"
  >
    <div
      class="w-[90%] sm:w-[80%] md:w-[70%] lg:w-full relative flex flex-col gap-4 mx-auto lg:mx-0"
    >
      <div class="w-full sm:mt-6 lg:mt-14 mx-auto lg:mx-0 pb-3">
        <Title
          title="Proyectos"
          title_description="Visualice sus proyectos actuales"
        />
        <div
          class="w-full flex flex-col lg:flex-row gap-2 mt-4 bg-[#A6A6A645] p-2 rounded-md"
        >
          <div
            class="w-full lg:w-[calc(100%-160px)] flex items-center relative z-30 justify-between"
          >
            <div class="w-full h-8 flex gap-5 px-2 rounded-md bg-[#F6F6F6]">
              <input
                type="text"
                class="w-full h-ful outline-none pl-1 text-sm bg-inherit"
                placeholder="Búsqueda"
                bind:value={search}
                on:keydown={handleKeyDown}
              />
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <img
                class="cursor-pointer"
                src={SearchIcon}
                alt="Search icon"
                on:click={searchProjects}
              />
            </div>
          </div>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            class="w-full lg:w-60 px-2 flex justify-center items-center gap-2 h-8 text-white bg-[#051127] rounded-md cursor-pointer
            hover:bg-[#505868]"
            on:click={() => {
              actionProjectInfo.import.visible = true;
              replaceStateWithQuery({ action: 'import' });
            }}
          >
            <p class="hidden lg:block text-xs font-medium font-Syne">
              Importar Proyecto
            </p>
            <p class="lg:hidden text-xs font-medium font-Syne">Importar</p>
            <img src={ImportProjectIcon} class="w-6 h-6" alt="Search icon" />
          </div>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            class="w-full lg:w-60 px-2 flex justify-center items-center gap-2 h-8 text-white bg-[#051127] rounded-md cursor-pointer
            hover:bg-[#505868]"
            on:click={() => {
              actionProjectInfo.create.visible = true;
              replaceStateWithQuery({ action: 'create' });
            }}
          >
            <p class="hidden lg:block text-xs font-medium font-Syne">
              Nuevo Proyecto
            </p>
            <p class="lg:hidden text-xs font-medium font-Syne">Nuevo</p>
            <img src={CreateProjectIcon} class="w-6 h-6" alt="Search icon" />
          </div>
        </div>
      </div>
      <div class="w-full lg:mx-auto">
        <section
          class="w-full flex flex-col gap-4 bg-[#F5F5F65C] p-2 rounded-md"
        >
          <div class="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
            <!--  -->
            {#each projects as project}
              <ProjectCard
                uuid={project.uuid}
                title={project.name}
                description={project.description}
                lastUpdate={moment(project.updatedAt).format(
                  'HH:mm A · MMM DD, YYYY'
                )}
                engineFile={project.engineFile}
              />
            {/each}
            <InfiniteScroll
              hasMore={newProjects.length > 0}
              threshold={100}
              on:loadMore={loadMore}
              window={true}
            />
          </div>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            on:click={() => loadMore()}
            class="w-full flex items-center justify-center flex-col py-4 cursor-pointer rounded-md hover:bg-[#FFFFFF50]"
          >
            {#if loadingMore}
              <div
                class="w-4 h-4 rounded-full border-2 border-[#021529] border-l-transparent animate-spin"
              />
            {:else if nextUrl}
              <img src={AddMore} alt="Add icon" />
            {/if}
          </div>
        </section>
      </div>
    </div>
  </div>
</div>

{#if actionProjectInfo.import.visible}
  <Modal
    title={actionProjectInfo.import.title}
    description={actionProjectInfo.import.description}
    bind:showModal={actionProjectInfo.import.visible}
    onClose={() => {
      actionProjectInfo.import.visible = false;
      replaceStateWithQuery({ action: null });
    }}
    size="md"
  >
    <ImportProject
      bind:data={actionProjectInfo.import.form}
      onClose={() => {
        actionProjectInfo.import.visible = false;
        replaceStateWithQuery({ action: null });
      }}
    />
  </Modal>
{/if}

{#if actionProjectInfo.create.visible}
  <Modal
    title={actionProjectInfo.create.title}
    description={actionProjectInfo.create.description}
    bind:showModal={actionProjectInfo.create.visible}
    onClose={() => {
      actionProjectInfo.create.visible = false;
      replaceStateWithQuery({ action: null });
    }}
    size="md"
  >
    <CreateProject
      bind:data={actionProjectInfo.create.form}
      onClose={() => {
        actionProjectInfo.create.visible = false;
        replaceStateWithQuery({ action: null });
      }}
    />
  </Modal>
{/if}
