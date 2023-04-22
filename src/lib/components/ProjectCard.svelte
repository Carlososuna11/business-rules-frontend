<script>
  import EyeIcon from '../../assets/svg/eye-icon.svg';
  import EditIcon from '../../assets/svg/edit-icon.svg';
  import DeleteIcon from '../../assets/svg/delete-icon.svg';
</script>

<div
  class="bg-gray-100 rounded-lg sm:w-auto h-full justify-center items-center p-2 sm:p-4 mb-2 flex flex-col"
>
  <div>
    <div class="mb-3">
      <h3 class="text-base">Nombre de Proyecto</h3>
      <p class="text-xs text-gray-600">671dc846-fe22-4b15-a73a-31ffe89124cb</p>
    </div>
    <p class="text-sm my-2">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
      efficitur, nulla in malesuada pellentesque, eros lorem maximus tellus, non
      blandit massa urna ut augue.
    </p>
    <div class="mt-3">
      <span class="text-gray-700 text-xs font-source-sans-pro">
        Última Actualización: 18:55 PM · Jul 15, 2021
      </span>
    </div>
  </div>
  <div class="mt-4 mb-2 w-full justify-evenly px-4 flex items-center">
    <div
      class="flex lg:w-40 mr-2 items-center cursor-pointer border border-gray-700 rounded-md justify-between items-center p-2"
    >
      <p>Ver</p>
      <img src={EyeIcon} class="w-6 h-6" alt="Eye icon" />
    </div>
    <div
      class="flex lg:w-40 mr-2 items-center cursor-pointer border border-gray-700 rounded-md justify-between items-center p-2"
    >
      <p>Editar</p>
      <img src={EditIcon} class="w-6 h-6" alt="Edit icon" />
    </div>
    <div
      class="flex lg:w-40 items-center cursor-pointer border border-gray-700 rounded-md justify-between items-center p-2"
    >
      <p>Eliminar</p>
      <img src={DeleteIcon} class="w-6 h-6" alt="Trash icon" />
    </div>
  </div>
</div>
