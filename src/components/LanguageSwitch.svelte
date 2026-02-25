<script lang="ts">
import { getLang, setLang } from "@i18n/translation";
import Icon from "@iconify/svelte";

function showPanel() {
	const panel = document.querySelector("#language-panel");
	panel?.classList.remove("float-panel-closed");
}

function hidePanel() {
	const panel = document.querySelector("#language-panel");
	panel?.classList.add("float-panel-closed");
}
</script>

<!-- z-50 make the panel higher than other float panels -->
<div class="relative z-50" role="menu" tabindex="-1" onmouseleave={hidePanel}>
    <button aria-label="Language" role="menuitem" class="relative btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90" id="language-switch" onclick={()=>{}} onmouseenter={showPanel}>
        <div class="absolute" class:opacity-0={true}>
            <Icon icon="material-symbols:globe" class="text-[1.25rem]"></Icon>
        </div>
        <div class="absolute" class:opacity-0={false}>
            <Icon icon="material-symbols:globe" class="text-[1.25rem]"></Icon>
        </div>
    </button>

    <div id="language-panel" class="hidden lg:block absolute transition float-panel-closed top-11 -right-2 pt-5" >
        <div class="card-base float-panel p-2">
            <button class="flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95 mb-0.5"
                    class:current-theme-btn={getLang() == "en"}
                    onclick={() => {
                        setLang("en")}}
            >
                <Icon icon="circle-flags:us" class="text-[1.25rem] mr-3"></Icon>
                {"English"}
            </button>
            <button class="flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95"
                    class:current-theme-btn={getLang() == "vi"}
                    onclick={() => {
                        setLang("vi")
                    }}
            >
                <Icon icon="circle-flags:vn" class="text-[1.25rem] mr-3"></Icon>
                {"Vietnamese"}
            </button>
        </div>
    </div>
</div>