<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  // we don't want to use <svelte:window bind:online> here, because we only care about the online
  // state when the page first loads
  let online = typeof navigator !== 'undefined' ? navigator.onLine : true;
</script>

<svelte:head>
  <title>{$page.status}</title>
</svelte:head>

<div class="w-full lg:w-[75%] lg:mx-auto mt-24 lg:mt-14 pb-4">
  <div
    class="w-[90%] sm:w-[80%] md:w-[70%] lg:w-full relative flex flex-col gap-4 mx-auto lg:mx-0"
  >
    <section class="flex items-center h-full p-16">
      <div
        class="container flex flex-col items-center justify-center px-5 mx-auto my-8"
      >
        <div class="max-w-md text-center">
          <h2 class="mb-8 font-extrabold text-9xl text-black-600">
            <span class="sr-only">Error</span>{$page.status}
          </h2>
          {#if $page.status === 404}
            <p class="text-2xl font-semibold md:text-3xl">
              Disculpa, pero no pudimos encontrar la página que buscabas.
            </p>
            <p class="mt-4 mb-8 text-black-400">
              Revisa que la URL esté bien escrita o intenta con otra.
            </p>
          {:else if online}
            <p class="text-2xl font-semibold md:text-3xl">
              Disculpa, pero algo salió mal.
            </p>
            {#if $page.error?.message}
              <p class="mt-4 mb-8 text-black-400">
                {$page.status}: {$page.error.message}
              </p>
            {/if}
          {:else}
            <p class="text-2xl font-semibold md:text-3xl">
              Parece que estás sin conexión.
            </p>
            <p class="mt-4 mb-8 text-gray-400">
              Recarga la página una vez que hayas encontrado internet.
            </p>
          {/if}
          <a
            rel="noopener noreferrer"
            href="/"
            class="px-8 py-3 font-semibold rounded bg-[#051127] text-white"
            >Página Principal</a
          >
        </div>
      </div>
    </section>
  </div>
</div>
