<script lang="ts">
  import Title from '../lib/components/Title.svelte';
  import ProjectCard from '../lib/components/ProjectCard.svelte';
  import AddMore from '../assets/svg/add-round-icon.svg';
  import SearchIcon from '../assets/svg/search-icon.svg';
  import ImportProjectIcon from '../assets/svg/import-file-icon.svg';
  import CreateProjectIcon from '../assets/svg/create-file-icon.svg';
  import { goto } from '$app/navigation';
  let loadingMore: boolean = false;
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
              />
              <img src={SearchIcon} alt="Search icon" />
            </div>
          </div>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            class="w-full lg:w-60 px-2 flex justify-center items-center gap-2 h-8 text-white bg-[#051127] rounded-md cursor-pointer"
            on:click={() => goto('/import')}
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
            on:click={() => goto('/create')}
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
          <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
            <!--  -->
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </div>
          <div
            class="w-full flex items-center justify-center flex-col py-4 cursor-pointer rounded-md hover:bg-[#FFFFFF50]"
          >
            {#if loadingMore}
              <div
                class="w-4 h-4 rounded-full border-2 border-[#021529] border-l-transparent animate-spin"
              />
            {:else}
              <img src={AddMore} alt="Add icon" />
              <p class="text-sm text-[#383838]">VER MÁS</p>
            {/if}
          </div>
        </section>
      </div>
    </div>
  </div>
</div>
