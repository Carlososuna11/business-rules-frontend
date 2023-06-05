<script lang="ts">
  import EditIcon from '../../assets/svg/edit-icon.svg';
  import DeleteIcon from '../../assets/svg/delete-icon.svg';
  import ExportIcon from '../../assets/svg/export-icon.svg';
  import ExportDiagramIcon from '../../assets/svg/export-diagram-icon.svg';
  import Modal from './Modal.svelte';
  import { api } from '../services/api.services';
  import { Tooltip } from 'flowbite-svelte';
  let showDeletePopupModal = false;
  export let title: string = 'Nombre de Proyecto';
  import { alertStore } from '../stores';
  import { goto } from '$app/navigation';
  export let uuid: string = '671dc846-fe22-4b15-a73a-31ffe89124cb';
  export let description: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas`;
  export let lastUpdate: string = '18:55 PM · Jul 15, 2021';
  export let engineFile: string | null = null;

  function getDiagram() {
    api.getDiagram(uuid).then(
      (response) => {
        window.open(response.diagram, '_blank', 'noopener,noreferrer');
      },
      (error) => {}
    );
  }

  function deleteProject() {
    api.deleteProject(uuid).then(
      (response) => {
        alertStore.set({
          message: 'Proyecto eliminado correctamente',
          color: 'green',
          visible: true,
        });
        showDeletePopupModal = false;
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      (error) => {}
    );
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="bg-gray-100 rounded-lg sm:w-auto h-[240px] justify-left p-2 sm:p-4 mb-2 flex flex-row cursor-pointer"
>
  <div class="w-full flex flex-col justify-between h-full">
    <div class="mb-3">
      <h3 class="text-base">{title}</h3>
      <p class="text-xs text-gray-600">{uuid}</p>
    </div>
    <p class="text-sm my-2 description-trucated">
      {#if description.length > 190}
        {description.substr(0, 190) + '...'}
      {:else}
        {description}
      {/if}
    </p>
    <div class="mt-auto">
      <span class="text-gray-700 text-xs font-source-sans-pro">
        Última Actualización: {lastUpdate}
      </span>
    </div>
  </div>
  <div class="mt-4 mb-2 space-y-1 px-4 flex flex-col items-end">
    <div>
      <div class="flex">
        <button
          id="edit-project"
          on:click={() => goto(`/projects/${uuid}`)}
          class="flex items-center justify-center w-10 h-10 bg-[#051127] text-white rounded-md hover:bg-[#505868]"
        >
          <img src={EditIcon} class="w-8 h-8" alt="Icono" />
        </button>
      </div>
      <Tooltip
        class="bg-[#051127] text-white pr-1 pl-1"
        triggeredBy="[id^='edit-project']"
        placement="left"
      >
        Editar Proyecto
      </Tooltip>
    </div>
    <div>
      <div class="flex">
        <button
          id="delete-project"
          on:click={() => (showDeletePopupModal = true)}
          class="flex items-center justify-center w-10 h-10 bg-[#051127] text-white rounded-md hover:bg-[#505868]"
        >
          <img src={DeleteIcon} class="w-7 h-7" alt="Icono" />
        </button>
      </div>
      <Tooltip
        class="bg-[#051127] text-white pr-1 pl-1"
        triggeredBy="[id^='delete-project']"
        placement="left"
      >
        Eliminar Proyecto
      </Tooltip>
    </div>
    {#if engineFile}
      <div>
        <div class="flex">
          <a
            id="export-engine"
            href={engineFile}
            target="_blank"
            class="pl-2 flex items-center justify-center w-10 h-10 bg-[#051127] text-white rounded-md hover:bg-[#505868]"
          >
            <img src={ExportIcon} class="w-7 h-7" alt="Icono" />
          </a>
        </div>
        <Tooltip
          class="bg-[#051127] text-white pr-1 pl-1"
          triggeredBy="[id^='export-engine']"
          placement="left"
        >
          Exportar Proyecto
        </Tooltip>
      </div>
      <div>
        <div class="flex">
          <button
            id="export-diagram"
            on:click={getDiagram}
            class="flex items-center justify-center w-10 h-10 bg-[#051127] text-white rounded-md hover:bg-[#505868]"
          >
            <img src={ExportDiagramIcon} class="w-6 h-6" alt="Icono" />
          </button>
        </div>
        <Tooltip
          class="bg-[#051127] text-white pr-1 pl-1"
          triggeredBy="[id^='export-diagram']"
          placement="left"
        >
          Exportar Diagrama
        </Tooltip>
      </div>
    {/if}
  </div>
</div>

{#if showDeletePopupModal}
  <Modal
    bind:showModal={showDeletePopupModal}
    title="Eliminar Projecto"
    description="¿Estas seguro que deseas eliminar el Proyecto?"
  >
    <div class="button-row flex justify-between mt-2 md:ml-[20%] md:mr-[15%]">
      <button
        on:click={() => (showDeletePopupModal = false)}
        class="flex lg:w-40 items-center cursor-pointer border border-gray-700 rounded-md justify-center items-center p-2 hover:bg-[#A6A6A645]"
      >
        <p>No, Cancelar</p>
      </button>
      <button
        on:click={() => {
          deleteProject();
        }}
        class="flex lg:w-40 cursor-pointer text-white bg-[#051127] rounded-md justify-center items-center p-2 hover:bg-[#505868]"
      >
        <p>Si, Estoy Seguro</p>
      </button>
    </div>
  </Modal>
{/if}
