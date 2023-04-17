<script lang="ts">
  import Background from './components/Background.svelte';
  import Footer from './components/Footer.svelte';
  import Navbar from './components/Navbar.svelte';
  import NavbarMobile from './components/NavbarMobile.svelte';
  import '../styles/global.css';
  import '../styles/index.css';
</script>

<div>
  <Background />
  <div class="w-full min-h-screen flex flex-col font-Sans bg-[#A9A9A930]">
    <div class="hidden lg:block">
      <Navbar />
    </div>
    <div class="lg:hidden">
      <NavbarMobile />
    </div>
    <div class="w-full lg:w-[75%] lg:mx-auto mt-24 lg:mt-14 pb-4">
      <div
        class="w-[90%] sm:w-[80%] md:w-[70%] lg:w-full relative flex flex-col gap-4 mx-auto lg:mx-0"
      >
        <slot />
      </div>
    </div>
    <footer class="w-full mt-auto relative z-10">
      <Footer />
    </footer>
  </div>
</div>
