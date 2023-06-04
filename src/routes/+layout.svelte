<script lang="ts">
  import Background from '../lib/components/Background.svelte';
  import Footer from '../lib/components/Footer.svelte';
  import Navbar from '../lib/components/Navbar.svelte';
  import NavbarMobile from '../lib/components/NavbarMobile.svelte';
  import '../styles/global.css';
  import '../styles/index.css';
  import { alertStore } from '../lib/stores';
  import { onDestroy } from 'svelte';
  import type { Alert as AlertType } from '../lib/types';

  let alertContent: AlertType;

  const unsubscribe = alertStore.subscribe((value) => {
    alertContent = value;
  });

  //   when alertContent.visible is true, apply a timeout to hide the alert
  $: if (alertContent?.visible) {
    setTimeout(() => {
      alertStore.set({ ...alertContent, visible: false });
    }, 8000);
  }

  onDestroy(() => {
    unsubscribe();
  });
</script>

{#if alertContent?.visible}
  <div
    class={'absolute z-50 sm:w-[100%] md:w-[50%] sm:top-18 md:top-16 right-0 py-3 pl-4 pr-10 leading-normal rounded-lg ' +
      (alertContent.color === 'green'
        ? 'text-emerald-700 bg-emerald-100'
        : alertContent.color === 'red'
        ? 'text-red-700 bg-red-100'
        : alertContent.color === 'blue'
        ? 'text-sky-700 bg-sky-100'
        : alertContent.color === 'yellow'
        ? 'text-yellow-700'
        : 'text-gray-700 bg-gray-100')}
    role="alert"
  >
    <span class="absolute inset-y-0 left-0 flex items-center ml-4"
      ><svg
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"
        /></svg
      >
    </span>
    <p class="ml-6">{alertContent.message}</p>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span
      on:click={() =>
        alertStore.set({
          ...alertContent,
          visible: false,
        })}
      class="absolute inset-y-0 right-0 flex items-center mr-4"
    >
      <svg class="w-4 h-4 fill-current" role="button" viewBox="0 0 20 20"
        ><path
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
          fill-rule="evenodd"
        /></svg
      >
    </span>
  </div>
{/if}
<div>
  <Background />
  <div class="w-full min-h-screen flex flex-col font-Sans bg-[#A9A9A930]">
    <div class="hidden lg:block">
      <Navbar />
    </div>
    <div class="lg:hidden">
      <NavbarMobile />
    </div>
    <slot />
    <footer class="w-full mt-auto relative">
      <Footer />
    </footer>
  </div>
</div>
