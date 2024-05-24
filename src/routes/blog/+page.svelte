<script>
    import { LightSwitch } from "@skeletonlabs/skeleton"

    import Cursor from "../../lib/Cursor.svelte";
</script>



<Cursor />

<div class="p-8 space-y-8">
    <div class="flex justify-between items-center h-full mx-auto">
        <LightSwitch />
        
        <a href="/">
            <svg class="w-8 fill-surface-500 dark:fill-primary-500" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3000 1879.55"><polygon points="1085.04 0.2 957.42 221.26 957.3 221.05 1084.92 0 1085.04 0.2"/><polygon points="2042.46 1658.5 1914.84 1879.55 1914.63 1879.19 2042.25 1658.14 2042.46 1658.5"/><polygon points="3000 0.58 2872.38 221.63 2871.63 221.63 2042.25 1658.14 1914.63 1879.19 1787.01 1658.14 1085.05 442.31 255.25 1879.55 0 1879.55 957.42 221.26 1085.04 0.2 1212.66 221.26 1914.63 1437.1 2616.38 221.63 1978.65 221.63 1978.65 0.58 3000 0.58"/><polygon points="1212.79 221.05 1212.66 221.26 1085.04 0.2 1085.16 0 1212.79 221.05"/><polygon points="1914.63 1879.19 1914.42 1879.55 1786.8 1658.5 1787.01 1658.14 1914.63 1879.19"/><polygon points="2744.67 0.58 2744 0.58 2744.34 0 2744.67 0.58"/></svg>
        </a>
        <a class="justify-end" href="/">HOME</a>        
	</div>

    <div class="flex justify-center items-center h-full flex-col mx-auto max-w-[90%]">

        <h1 class="h1 m-4">BLOG</h1>

		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati delectus possimus temporibus voluptatibus explicabo ex neque atque? Inventore aspernatur non, soluta fugiat quo in alias, provident, quia fugit consequatur id.
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati delectus possimus temporibus voluptatibus explicabo ex neque atque? Inventore aspernatur non, soluta fugiat quo in alias, provident, quia fugit consequatur id.</p>


        <br><br><br><br>
        <p class="decoration-primary-600">asdfasdfasdf</p>
    </div>					
</div>


<style>
    ::selection {
        background: #0000ff;
    }
</style>