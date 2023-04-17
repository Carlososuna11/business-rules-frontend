<script>
  import Title from './../components/Title.svelte';
  import Search from './search.svelte';
  import Projects from './projects.svelte';
</script>

<div
  class="w-[90%] sm:w-[80%] md:w-[70%] lg:w-full relative flex flex-col gap-4 mx-auto lg:mx-0"
>
  <div class="w-full sm:mt-6 lg:mt-14 mx-auto lg:mx-0 pb-3">
    <Title
      title="Proyectos"
      title_description="Visualice sus proyectos actuales"
    />
    <Search />
  </div>
  <div class="w-full lg:mx-auto">
    <Projects />
  </div>
</div>
