<script lang="ts">
  import SearchIcon from '../../assets/svg/search-icon.svg';
  import ImportProjectIcon from '../../assets/svg/import-file-icon.svg';
  import CreateProjectIcon from '../../assets/svg/create-file-icon.svg';

  export let showCreateProjectModal: boolean;
  export let showImportProjectModal: boolean;
</script>

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
      />
      <img src={SearchIcon} alt="Search icon" />
    </div>
  </div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="w-full lg:w-60 px-2 flex justify-center items-center gap-2 h-8 text-white bg-[#051127] rounded-md cursor-pointer"
    on:click={() => {
      showImportProjectModal = true;
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
    class="w-full lg:w-60 px-2 flex justify-center items-center gap-2 h-8 text-white bg-[#051127] rounded-md cursor-pointer"
    on:click={() => {
      showCreateProjectModal = true;
    }}
  >
    <p class="hidden lg:block text-xs font-medium font-Syne">Nuevo Proyecto</p>
    <p class="lg:hidden text-xs font-medium font-Syne">Nuevo</p>
    <img src={CreateProjectIcon} class="w-6 h-6" alt="Search icon" />
  </div>
</div>
