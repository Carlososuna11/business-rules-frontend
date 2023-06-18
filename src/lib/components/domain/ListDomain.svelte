<script lang="ts">
  import { api } from '$lib/services/api.services';
  import { onMount } from 'svelte';
  import InfiniteScroll from '$lib/components/InfiniteScroll.svelte';
  import type { DomainContext, FieldSchema } from '$lib/types';
  import AddMore from '../../../assets/svg/add-round-icon.svg';
  import NestingAccordions from './NestingAccordions.svelte';
  import type { JSONSchema7 } from 'json-schema';

  /*****Pagination*/

  let loadingMore: boolean = false;
  let page = 1;
  let limit = 10;
  let nextUrl = '';
  let domains: DomainContext[] = [];
  let newDomains: DomainContext[] = [];
  export let actualSchema: JSONSchema7;
  export let dataFields: FieldSchema[] = [];
  export let extraFields: FieldSchema[] = [];

  async function getDomains() {
    loadingMore = true;
    try {
      const response = await api.getDomains(page, limit);
      nextUrl = response.next;
      newDomains = response.data;
      page++;
    } catch (error) {
      console.log('error', error);
    }
    loadingMore = false;
  }

  async function loadMore() {
    await getDomains();
  }

  $: domains = [...domains, ...newDomains];

  onMount(async () => {
    await getDomains();
  });
</script>

<div class="w-full lg:mx-auto">
  <section class="w-full flex flex-col gap-4 bg-[#F5F5F65C] p-2 rounded-md">
    <div class="w-full">
      {#each domains as domain}
        <div>
          <!-- file: /home/carlos/file.json. we neet only file.json from domain.file-->
          <div class="my-2">
            <h3
              class="text-lg text-left text-[#383838] font-Syne font-bold py-2"
            >
              {domain.data?.title ||
                domain.file.split('/').pop()?.split('.')[0]}
            </h3>
            <NestingAccordions schema={domain.data} required={true} />
            <div class="w-full flex justify-center mt-3">
              <button
                type="button"
                class="bg-[#051127] text-white rounded-md px-2 py-2"
                on:click={() => {
                  let data = JSON.parse(JSON.stringify(domain.data));
                  if (data.properties && !data.properties.data) {
                    data = {
                      title: data.title || 'Dominio',
                      type: 'object',
                      properties: {
                        data: {
                          type: 'object',
                          title: 'Estructura del Dominio',
                          properties: data.properties,
                          required: data.required,
                        },
                        extra: {
                          type: 'object',
                          title: 'Atributos Calculados',
                          properties: {},
                          required: [],
                        },
                      },
                      required: ['data'],
                    };
                  }
                  actualSchema = data;
                  dataFields = [];
                  extraFields = [];
                }}
              >
                Utilizar Dominio
              </button>
            </div>
          </div>
        </div>
      {/each}
      <InfiniteScroll
        hasMore={newDomains.length > 0}
        threshold={100}
        on:loadMore={loadMore}
        window={true}
      />
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      on:click={() => loadMore()}
      class="w-full flex items-center justify-center flex-col py-4 cursor-pointer rounded-md hover:bg-[#FFFFFF50]"
    >
      {#if loadingMore}
        <div
          class="w-4 h-4 rounded-full border-2 border-[#021529] border-l-transparent animate-spin"
        />
      {:else if nextUrl}
        <img src={AddMore} alt="Add icon" />
      {/if}
    </div>
  </section>
</div>
