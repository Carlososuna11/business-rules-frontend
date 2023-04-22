<script lang="ts">
  import LogoIcon from '../../assets/svg/brand-blue.svg';
  export let title: string;
  export let description: string;
</script>

<div class="w-full h-full relative z-20 pt-48">
  <div class="flex items-center justify-center h-full w-full">
    <div
      class="w-[90%] sm:w-[450px] lg:w-[650px] h-auto flex items-center justify-center flex-col gap-4 rounded-xl border border-[#00000030] bg-[#FAFAFA] shadow-md overflow-y-auto"
    >
      <div class="w-full h-[96%] overflow-y-auto scroll">
        <div
          class="w-full h-full flex items-center flex-col gap-4 rounded-xl py-4 lg:py-8"
        >
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <figure>
            <img src={LogoIcon} class="w-20" alt="Logo" />
          </figure>

          <div class="w-[80%] flex flex-col gap-3 mx-auto pb-4">
            <div class="w-full flex flex-col gap-1">
              <div class="w-full flex flex-col gap-1 pb-1 mx-auto mb-4">
                <h3 class="text-xl text-[#383838] font-Syne font-bold">
                  {title}
                </h3>
                <p class="text-sm text-[#757575]">
                  {description}
                </p>
              </div>
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
