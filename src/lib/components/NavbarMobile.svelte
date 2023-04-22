<script>
  import Logo from '../../assets/svg/brand-blue.svg';
  import { goto } from '$app/navigation';

  const handleHomeClick = () => {
    goto('/');
  };
</script>

<div class="w-full h-16 fixed top-0 z-40 bg-[#F5F5F5]">
  <div class="w-full h-full bg-inherit relative z-20">
    <div
      class="w-[90%] sm:w-[80%] h-full flex items-center justify-between relative px-6 z-20 mx-auto"
    >
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <figure
        on:click={handleHomeClick}
        class="w-24 h-10 flex items-center justify-center"
      >
        <img src={Logo} class="w-full h-full object-contain" alt="TSBR logo" />
      </figure>
    </div>
  </div>
</div>
