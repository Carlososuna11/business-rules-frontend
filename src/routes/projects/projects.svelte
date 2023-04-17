<script lang="ts">
  import ProjectCard from '../components/ProjectCard.svelte';
  import AddMore from '../../assets/svg/add-round-icon.svg';
  let loadingMore: boolean = false;
</script>

<section class="w-full flex flex-col gap-4 bg-[#F5F5F65C] p-2 rounded-md">
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
