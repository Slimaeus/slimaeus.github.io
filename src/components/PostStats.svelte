<script lang="ts">
import I18nKey from "@i18n/i18nKey";
import { getLang, getTranslation } from "@i18n/translation";
import Icon from "@iconify/svelte";

export let words: number;
export let minutes: number;

$: t = getTranslation(getLang());
</script>

<div class="flex flex-row text-black/30 dark:text-white/30 gap-5 mb-3 transition onload-animation">
  <div class="flex flex-row items-center">
    <div class="transition h-6 w-6 rounded-md bg-black/5 dark:bg-white/10 text-black/50 dark:text-white/50 flex items-center justify-center mr-2">
      <Icon icon="material-symbols:notes-rounded" />
    </div>
    <div class="text-sm">{words} {t[I18nKey.wordsCount]}</div>
  </div>
  <div class="flex flex-row items-center">
    <div class="transition h-6 w-6 rounded-md bg-black/5 dark:bg-white/10 text-black/50 dark:text-white/50 flex items-center justify-center mr-2">
      <Icon icon="material-symbols:schedule-outline-rounded" />
    </div>
    <div class="text-sm">
      {minutes} {minutes === 1 ? t[I18nKey.minuteCount] : t[I18nKey.minutesCount]}
    </div>
  </div>
</div>