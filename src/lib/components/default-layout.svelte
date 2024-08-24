<script>
    export let title = "default";
</script>



<svelte:head>
    <title>{title}</title>
</svelte:head>

<main>
    <h1>{title}</h1>
    <slot />
</main>