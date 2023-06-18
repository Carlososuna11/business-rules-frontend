<script lang="ts">
  import RuleForm from './RuleForm.svelte';
  import type { CommandInfo, Engine } from '../../types';

  type Section = {
    modify: boolean;
    visualize: boolean;
  };

  export let commands: CommandInfo[] = [];
  export let engine: Engine;
  export let initialEngine: Engine;
  export let uuid: string;
  export let section: Section = {
    modify: true,
    visualize: false,
  };
</script>

<div class="w-full">
  <div
    class="grid max-w-lg grid-cols-3 gap-1 p-1 mx-auto my-2 rounded-lg bg-[#051127]"
    role="group"
  >
    <button
      type="button"
      on:click={() => {
        section.modify = true;
        section.visualize = false;
      }}
      class={section.modify
        ? 'px-5 py-1.5 text-xs font-medium bg-gray-300 text-gray-900 rounded-lg'
        : 'px-5 py-1.5 text-xs font-medium text-white hover:bg-black rounded-lg'}
    >
      Modificar
    </button>
    <button
      type="button"
      on:click={() => {
        section.modify = false;
        section.visualize = true;
      }}
      class={section.visualize
        ? 'px-5 py-1.5 text-xs font-medium bg-gray-300 text-gray-900 rounded-lg'
        : 'px-5 py-1.5 text-xs font-medium text-white hover:bg-black rounded-lg'}
    >
      Visualizar
    </button>
  </div>
  <div class="my-10" />
  <div class="w-fill md:w-[500px] lg:w-[800px] xl:w-[950px]">
    <RuleForm
      {commands}
      bind:rules={engine.rules}
      initialRules={initialEngine.rules}
      {uuid}
    />
  </div>
</div>
