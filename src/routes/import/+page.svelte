<script lang="ts">
  import Form from '../../lib/components/Form.svelte';
  let title: string = 'Importar Proyecto';
  let description: string = [
    'Importar Proyecto te ayuda a',
    'recuperar un proyecto guardado',
    'previamente. Esta herramienta te permite',
    'cargar un proyecto desde una ubicación',
    'específica, lo que significa que puedes',
    'comenzar a trabajar sin perder tiempo.',
  ].join(' ');
</script>

<Form {title} {description} />
