<script>
    export let title = "default";
</script>



<svelte:head>
    <title>{title}</title>
</svelte:head>

<main>
    <div class="flex flex-col justify-center m-16">
        <h1 class="h1 text-center">{title}</h1>
        <slot />
    </div>
</main>