<script lang="ts">
  export let title: string;
  export let title_description: string;
</script>

<div class="flex justify-between flex-col">
  <h1
    class="font-bold font-Syne text-xl sm:text-2xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#3A6B9D] to-[#6196C2] truncate"
  >
    {title}
  </h1>
  <p class="text-sm text-[#383838]">
    {title_description}
  </p>
</div>
