<script>
  import Logo from '../../assets/svg/brand-blue.svg';
  import { goto } from '$app/navigation';

  const handleHomeClick = () => {
    goto('/');
  };
</script>

<div class="w-full h-14 fixed flex bg-[#F5F5F5] z-40 shadow">
  <div class="w-[75%] h-full flex items-center justify-between mx-auto">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <figure on:click={handleHomeClick}>
      <img id="home-icon" src={Logo} class="w-16" alt="Oha logo" />
    </figure>
  </div>
</div>
