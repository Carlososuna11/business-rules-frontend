<script lang="ts">
  import { AccordionItem, Accordion, Tooltip } from 'flowbite-svelte';
  import CommandsInfo from './CommandsInfo.svelte';
  import { api } from '$lib/services/api.services';
  import { alertStore } from '$lib/stores';

  import type { RuleObject, CommandInfo, Property } from '$lib/types';

  export let uuid: string;
  export let rules: RuleObject[] = [];
  export let initialRules: RuleObject[] = [];
  export let properties: Property[] = [];
  let error: boolean = false;

  export let commands: CommandInfo[] = [];
  // API
  const setEngine = async (rules: RuleObject[]) => {
    try {
      const engine = await api.getEngine(uuid);
      engine.rules = rules;
      await api.setEngine(uuid, engine);
      initialRules = JSON.parse(JSON.stringify(rules));

      alertStore.set({
        color: 'green',
        message: 'Reglas actualizadas exitosamente',
        visible: true,
      });
    } catch (error) {
      /* empty */
    }
  };

  $: rules &&
  rules.filter((rule) => Object.keys(rule.condition).length < 1).length
    ? (error = true)
    : (error = false);
</script>

<div class="mb-3">
  {#if rules.length === 0}
    <div class="w-full flex flex-col gap-1 pb-1 mx-auto mb-4 px-3">
      <h3 class="text-lg text-center text-[#383838] font-Syne font-bold">
        Parece que no tienes ninguna regla. Agrega una para comenzar.
      </h3>
    </div>
  {/if}
  <div>
    {#each rules as rule, index}
      <Accordion
        class="group-first:rounded-b-xl mb-4"
        activeClasses="bg-gray-100 text-black-900 focus:ring-gray-200 group-first:rounded-b-xl"
        inactiveClasses="text-black-500 hover:bg-gray-100 group-first:rounded-b-xl"
        defaultClass="text-black-500 group-first:rounded-b-xl"
      >
        <AccordionItem
          activeClasses="p-2 bg-gray-100 text-gray-900 focus:ring-4 focus:ring-gray-200"
        >
          <span slot="header"
            ><p>
              <span class="font-bold">{rules[index].name}</span>
            </p>
          </span>
          <div class="w-full flex flex-col gap-2 lg:gap-1">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for={`name-property-${index}`}
                >
                  Nombre de la Regla*
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id={`name-property-${index}`}
                  type="text"
                  bind:value={rules[index].name}
                  required
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for={`description-property-${index}`}
                >
                  Descripción
                </label>
                <textarea
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id={`description-property-${index}`}
                  bind:value={rules[index].description}
                  required
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-2">
              <div class="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                <div class="flex items-center">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for={`priority-property-${index}`}
                  >
                    Prioridad
                  </label>
                  <span class="ml-1 mb-2" id="priority-final">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                      />
                    </svg>
                  </span>
                  <Tooltip
                    arrow={false}
                    class="bg-[#051127] text-white pr-1 pl-1 max-w-[270px]"
                    triggeredBy="[id^='priority-final']"
                    placement="top"
                  >
                    En caso de que existan múltiples reglas aptas para
                    ejecutarse durante la evaluación, lo que implica un conjunto
                    de conflictos mayor a 1, se dará prioridad a aquellas reglas
                    con mayor importancia para que sean disparadas primero,
                    siempre y cuando la estrategia de resolución de conflictos
                    se base en la prioridad.
                  </Tooltip>
                </div>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id={`priority-property-${index}`}
                  type="number"
                  bind:value={rules[index].priority}
                  min="0"
                  max="100"
                />
              </div>
              <div class="w-full md:w-1/3 px-3 md:mb-0">
                <span
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 h-[24px]"
                />
                <div
                  class="flex items-center pl-4 py-[10px] px-4 border rounded border-gray-700 align-end"
                >
                  <input
                    id={`final-property-${index}`}
                    type="checkbox"
                    name="bordered-checkbox"
                    bind:value={rules[index].final}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                  />
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold ml-2"
                    for={`final-property-${index}`}
                  >
                    ¿Es una regla finalizadora?
                  </label>
                  <span class="ml-1" id="help-final">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                      />
                    </svg>
                  </span>
                  <Tooltip
                    arrow={false}
                    class="bg-[#051127] text-white pr-1 pl-1 max-w-[270px]"
                    triggeredBy="[id^='help-final']"
                    placement="top"
                  >
                    Con el objetivo de mejorar la eficiencia, puede resultar
                    beneficioso detener el funcionamiento del motor en el
                    momento en que se active una regla determinada. Para hacerlo
                    posible, puede marcar este campo para hacerlo posible. Cabe
                    mencionar que, de manera predeterminada, esta propiedad está
                    desactivada.
                  </Tooltip>
                </div>
              </div>
              <div class="w-full md:w-1/3 px-3">
                <span class="flex items-center">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for={`activation-group-property-${index}`}
                  >
                    Grupo de Activación
                  </label>
                  <span class="ml-1 mb-2" id="help-activation-group">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                      />
                    </svg>
                  </span>
                  <Tooltip
                    arrow={false}
                    class="bg-[#051127] text-white pr-1 pl-1 max-w-[320px]"
                    triggeredBy="[id^='help-activation-group']"
                    placement="top"
                  >
                    Durante un ciclo de coincidencia-resolución-acto, solo una
                    regla del mismo grupo de activación será activada, siendo la
                    primera en activarse la que descartará todas las otras
                    reglas. Es posible establecer el grupo de activación de una
                    regla utilizando esta propiedad.
                  </Tooltip>
                </span>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id={`activation-group-property-${index}`}
                  type="text"
                  bind:value={rules[index].activationGroup}
                />
              </div>
            </div>
            <div class="bg-gray-200 py-2 my-2">
              <div class="w-full flex flex-col gap-1 pb-1 mx-auto mb-4 px-3">
                <h3
                  class="text-lg text-center text-[#383838] font-Syne font-bold"
                >
                  Pre Acciones
                </h3>
                <p class="text-sm text-[#383838]">
                  Las pre acciones se ejecutan antes de que la condición de la
                  regla sea evaluada. Estas acciones pueden ser utilizadas para
                  establecer valores en el contexto de ejecución del motor.
                </p>
              </div>
              <div class="w-full">
                {#if typeof rules[index].preActions === 'undefined'}
                  <span />
                {:else if Array.isArray(rules[index].preActions)}
                  {#each rules[index].preActions || [] as value, indexx}
                    <CommandsInfo
                      bind:properties
                      {commands}
                      bind:data={rules[index].preActions[indexx]}
                      deep={0}
                      acceptedTypes={['unknown']}
                    >
                      <button
                        type="button"
                        on:click={() =>
                          // @ts-ignore
                          (rules[index].preActions = rules[
                            index
                          ].preActions.filter((_, i) => i !== indexx))}
                        class="bg-red-600 text-white rounded-md px-2 py-1 mr-2"
                      >
                        Eliminar Pre Acción
                      </button>
                    </CommandsInfo>
                  {/each}
                {/if}
                <div class="w-full flex justify-center mt-3">
                  <button
                    type="button"
                    on:click={() => {
                      if (!Array.isArray(rules[index].preActions)) {
                        rules[index].preActions = [{}];
                      }
                      rules[index].preActions = [
                        ...(rules[index].preActions || []),
                        {},
                      ];
                    }}
                    class="bg-[#051127] text-white rounded-md px-2 py-2"
                  >
                    Agregar Pre Acción
                  </button>
                </div>
              </div>
            </div>
            <div class="bg-gray-200 py-2 my-2">
              <div class="w-full flex flex-col gap-1 pb-1 px-3 mx-auto mb-4">
                <h3
                  class="text-lg text-center text-[#383838] font-Syne font-bold"
                >
                  Condicion
                </h3>
                <p class="text-sm text-[#383838]">
                  Las condiciones son expresiones que se evalúan para determinar
                  si una regla debe activarse o no. Si la evaluación de la
                  condición de la regla es verdadera, se ejecutan las post
                  acciones
                </p>
              </div>
              <div class="w-full">
                <CommandsInfo
                  {commands}
                  bind:properties
                  bind:data={rules[index].condition}
                  deep={0}
                  acceptedTypes={['boolean']}
                />
                {#if Object.keys(rules[index].condition).length < 1}
                  <p class="text-center text-red-500 text-md italic">
                    No se ha agregado ninguna condición
                  </p>
                {/if}
              </div>
            </div>
            <div class="bg-gray-200 py-2 my-2">
              <div class="w-full flex flex-col gap-1 pb-1 mx-auto mb-4 px-3">
                <h3
                  class="text-lg text-center text-[#383838] font-Syne font-bold"
                >
                  Post Acciones
                </h3>
                <p class="text-sm text-[#383838]">
                  Las post acciones se ejecutan siempre y cuando la evaluación
                  de la condición de la regla sea verdadera.
                </p>
              </div>
              <div class="w-full">
                {#if typeof rules[index].postActions === 'undefined'}
                  <span />
                {:else if Array.isArray(rules[index].postActions)}
                  {#each rules[index].postActions || [] as value, indexx}
                    <CommandsInfo
                      {commands}
                      bind:properties
                      bind:data={rules[index].postActions[indexx]}
                      deep={0}
                      acceptedTypes={['unknown']}
                    >
                      <button
                        type="button"
                        on:click={() =>
                          // @ts-ignore
                          (rules[index].postActions = rules[
                            index
                          ].postActions.filter((_, i) => i !== indexx))}
                        class="bg-red-600 text-white rounded-md px-2 py-1 mr-2"
                      >
                        Eliminar Post Acción
                      </button>
                    </CommandsInfo>
                  {/each}
                {/if}
                <div class="w-full flex justify-center mt-3">
                  <button
                    type="button"
                    on:click={() => {
                      if (!Array.isArray(rules[index].postActions)) {
                        rules[index].postActions = [{}];
                      }
                      rules[index].postActions = [
                        ...(rules[index].postActions || []),
                        {},
                      ];
                    }}
                    class="bg-[#051127] text-white rounded-md px-2 py-2"
                  >
                    Agregar Post Acción
                  </button>
                </div>
              </div>
            </div>
            <button
              type="button"
              on:click={() => (rules = rules.filter((_, i) => i !== index))}
              class="cursor-pointer mr-auto bg-red-600 text-white rounded-md px-4 py-2"
            >
              Eliminar
            </button>
          </div>
        </AccordionItem>
      </Accordion>
    {/each}
  </div>

  <div class="w-full flex justify-center mt-3">
    <button
      type="button"
      on:click={() => {
        rules = [
          ...rules,
          {
            name: `Regla ${rules.length}`,
            description: '',
            priority: 0,
            final: false,
            activationGroup: '',
            condition: {},
            preActions: [],
            postActions: [],
          },
        ];
      }}
      class="bg-[#051127] text-white rounded-md px-2 py-2"
    >
      Agregar Regla
    </button>
  </div>
  <div class="w-full flex justify-center mt-3">
    <button
      type="button"
      class="bg-[#C1C1C1] text-black rounded-md px-4 py-2 mr-3"
      on:click={() => {
        rules = JSON.parse(JSON.stringify(initialRules));
      }}
    >
      Resetear
    </button>
    <button
      type="submit"
      on:click={async (event) => {
        event.preventDefault();
        if (error) {
          alertStore.set({
            color: 'red',
            message: 'Tienes errores en tus reglas. Por favor, revísalas.',
            visible: true,
          });
          return;
        }
        await setEngine(rules);
      }}
      class="bg-[#051127] text-white rounded-md px-4 py-2"
    >
      Guardar Cambios
    </button>
  </div>
</div>
