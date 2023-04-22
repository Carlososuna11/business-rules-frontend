<script lang="ts">
  import Background from '../lib/components/Background.svelte';
  import Footer from '../lib/components/Footer.svelte';
  import Navbar from '../lib/components/Navbar.svelte';
  import NavbarMobile from '../lib/components/NavbarMobile.svelte';
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
    <slot />
    <footer class="w-full mt-auto relative">
      <Footer />
    </footer>
  </div>
</div>
