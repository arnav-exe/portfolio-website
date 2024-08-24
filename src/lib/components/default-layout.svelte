<script>
    export let title = "default";
</script>



<svelte:head>
    <title>{title}</title>
</svelte:head>

<main>
    <h1 class="h1 text-center">{title}</h1>
    <slot />
</main>