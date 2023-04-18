<script lang="ts">
  import Title from './../components/Title.svelte';
  import Search from './search.svelte';
  import Projects from './projects.svelte';
  import Modal from '../components/Modal.svelte';

  // Creation Project Modal
  // TODO: get from query params the boolean
  let showCreateProjectModal: boolean = false;
  let titleCreateProjectModal: string = 'Proyecto Nuevo';
  let descriptionCreateProjectModal: string = [
    'Esta función te permite',
    'crear un nuevo proyecto',
    'para desarrollar. Puedes',
    'especificar un nombre para',
    'el proyecto, y otros detalles.',
    'Una vez creado, el proyecto estará',
    'listo para empezar a desarrollar.',
  ].join(' ');

  // Import Project Modal
  // TODO: get from query params the boolean
  let showImportProjectModal: boolean = false;
  let titleImportProjectModal: string = 'Importar Proyecto';
  let descriptionImportProjectModal: string = [
    'Importar Proyecto te ayuda a',
    'recuperar un proyecto guardado',
    'previamente. Esta herramienta te permite',
    'cargar un proyecto desde una ubicación',
    'específica, lo que significa que puedes',
    'comenzar a trabajar sin perder tiempo.',
  ].join(' ');
</script>

<div
  class="w-[90%] sm:w-[80%] md:w-[70%] lg:w-full relative flex flex-col gap-4 mx-auto lg:mx-0"
>
  <!-- Create Project Modal -->

  {#if showCreateProjectModal}
    <Modal
      bind:showModal={showCreateProjectModal}
      title={titleCreateProjectModal}
      description={descriptionCreateProjectModal}
    />
  {/if}
  {#if showImportProjectModal}
    <Modal
      bind:showModal={showImportProjectModal}
      title={titleImportProjectModal}
      description={descriptionImportProjectModal}
    />
  {/if}

  <div class="w-full sm:mt-6 lg:mt-14 mx-auto lg:mx-0 pb-3">
    <Title
      title="Proyectos"
      title_description="Visualice sus proyectos actuales"
    />
    <Search bind:showCreateProjectModal bind:showImportProjectModal />
  </div>
  <div class="w-full lg:mx-auto">
    <Projects />
  </div>
</div>
