<script lang="ts">
  import EyeIcon from '../../assets/svg/eye-icon.svg';
  import EditIcon from '../../assets/svg/edit-icon.svg';
  import DeleteIcon from '../../assets/svg/delete-icon.svg';
  import ExportIcon from '../../assets/svg/export-icon.svg';
  import ExportDiagramIcon from '../../assets/svg/export-diagram-icon.svg';
  import Modal from './Modal.svelte';
  import { api } from '../services/api.services';
  import { Tooltip } from 'flowbite-svelte';
  let showDeletePopupModal = false;
  export let title: string = 'Nombre de Proyecto';
  export let uuid: string = '671dc846-fe22-4b15-a73a-31ffe89124cb';
  export let description: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas`;
  export let lastUpdate: string = '18:55 PM · Jul 15, 2021';
  export let engineFile: string | null = null;

  function getDiagram() {
    api.getDiagram(uuid).then(
      (response) => {
        window.open(response.diagram, '_blank', 'noopener,noreferrer');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  function deleteProject() {
    api.deleteProject(uuid).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
</script>

<div
  class="bg-gray-100 rounded-lg sm:w-auto h-full justify-left p-2 sm:p-4 mb-2 flex flex-col"
>
  {#if engineFile}
    <div class="flex flex-col">
      <div>
        <div class="flex relative">
          <a
            id="export-engine"
            href={engineFile}
            target="_blank"
            class="absolute top-0 right-0 p-2 pl-3 flex items-center justify-center w-10 h-10 bg-[#051127] text-white rounded-md hover:bg-[#505868]"
          >
            <img src={ExportIcon} class="w-6 h-6" alt="Icono" />
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
        <div class="flex relative">
          <button
            id="export-diagram"
            on:click={getDiagram}
            class="absolute top-12 right-0 flex items-center justify-center w-10 h-10 bg-[#051127] text-white rounded-md hover:bg-[#505868]"
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
    </div>
  {/if}
  <div>
    <div class="mb-3">
      <h3 class="text-base">{title}</h3>
      <p class="text-xs text-gray-600">{uuid}</p>
    </div>
    <p class="text-sm my-2">
      {description}
    </p>
    <div class="mt-3">
      <span class="text-gray-700 text-xs font-source-sans-pro">
        Última Actualización: {lastUpdate}
      </span>
    </div>
  </div>
  <div class="mt-4 mb-2 w-full justify-evenly px-4 flex items-center">
    <div
      class="flex lg:w-40 mr-2 items-center cursor-pointer border border-gray-700 rounded-md justify-between items-center p-2 hover:bg-[#A6A6A645]"
    >
      <p>Ver</p>
      <img src={EyeIcon} class="w-6 h-6" alt="Eye icon" />
    </div>
    <div
      class="flex lg:w-40 mr-2 items-center cursor-pointer border border-gray-700 rounded-md justify-between items-center p-2 hover:bg-[#A6A6A645]"
    >
      <p>Editar</p>
      <img src={EditIcon} class="w-6 h-6" alt="Edit icon" />
    </div>
    <button
      on:click={() => (showDeletePopupModal = true)}
      class="flex lg:w-40 items-center cursor-pointer border border-gray-700 rounded-md justify-between items-center p-2 hover:bg-[#A6A6A645]"
    >
      <p>Eliminar</p>
      <img src={DeleteIcon} class="w-6 h-6" alt="Trash icon" />
    </button>
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
          showDeletePopupModal = false;
        }}
        class="flex lg:w-40 cursor-pointer text-white bg-[#051127] rounded-md justify-center items-center p-2 hover:bg-[#505868]"
      >
        <p>Si, Estoy Seguro</p>
      </button>
    </div>
  </Modal>
{/if}
