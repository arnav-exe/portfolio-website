<script>
    import { LightSwitch } from "@skeletonlabs/skeleton"

    import Icon from "./Icon.svelte";

    $: stroke = "#111111";

    const changeStroke = _ => {
        console.log("STROKE CHANGED")
        stroke = "#EDE5D1";
    }
</script>


<div class="p-8 space-y-8">
    <div class="flex justify-between items-center h-full mx-auto">
    <LightSwitch on:click={changeStroke}/>
    
	<!-- <a href="/"><img src="../logo.svg" class="w-8" alt=""></a> -->
    <a href="/" class="w-8">
        <Icon {stroke}/>
    </a>
    
	<a class="justify-end" href="/">&lt;- HOME</a>
	</div>

    <div class="flex justify-center items-center h-full flex-col mx-auto max-w-[90%]">

        <h1 class="h1 m-4">BLOG</h1>

		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati delectus possimus temporibus voluptatibus explicabo ex neque atque? Inventore aspernatur non, soluta fugiat quo in alias, provident, quia fugit consequatur id.
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati delectus possimus temporibus voluptatibus explicabo ex neque atque? Inventore aspernatur non, soluta fugiat quo in alias, provident, quia fugit consequatur id.</p>

    </div>					
</div>