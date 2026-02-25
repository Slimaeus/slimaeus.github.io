<script lang="ts">
import I18nKey from "@i18n/i18nKey";
import { getLang, getTranslation } from "@i18n/translation";
import Icon from "@iconify/svelte";
import { url } from "@utils/url-utils";
import type { NavBarLink } from "@/types/config";
import { LinkPreset } from "@/types/config";

export let links: (NavBarLink | LinkPreset)[] = [];

// Resolve presets dynamically using current language
function resolveLinks(rawLinks: (NavBarLink | LinkPreset)[]): NavBarLink[] {
	const t = getTranslation(getLang());
	const presetMap = {
		[LinkPreset.Home]: { name: t[I18nKey.home], url: "/" },
		[LinkPreset.About]: { name: t[I18nKey.about], url: "/about/" },
		[LinkPreset.Archive]: { name: t[I18nKey.archive], url: "/archive/" },
		[LinkPreset.Projects]: { name: t[I18nKey.projects], url: "/projects/" },
	};
	return rawLinks.map((item) =>
		typeof item === "number" ? presetMap[item] : item,
	);
}

$: resolvedLinks = resolveLinks(links);
</script>

{#each resolvedLinks as l}
  <a
    aria-label={l.name}
    href={l.external ? l.url : url(l.url)}
    target={l.external ? "_blank" : undefined}
    class="btn-plain scale-animation rounded-lg h-11 font-bold px-5 active:scale-95"
  >
    <div class="flex items-center">
      {l.name}
      {#if l.external}
        <Icon icon="fa6-solid:arrow-up-right-from-square"
          class="text-[0.875rem] transition -translate-y-[1px] ml-1 text-black/[0.2] dark:text-white/[0.2]" />
      {/if}
    </div>
  </a>
{/each}