<script lang="ts">
import I18nKey from "@i18n/i18nKey";
import { getLang, getTranslation } from "@i18n/translation";

export let words: number;
export let minutes: number;

$: t = getTranslation(getLang());
</script>

<div class="text-sm text-black/30 dark:text-white/30 flex gap-4 transition">
  <div>
    {words} {words === 1 ? t[I18nKey.wordCount] : t[I18nKey.wordsCount]}
  </div>
  <div>|</div>
  <div>
    {minutes} {minutes === 1 ? t[I18nKey.minuteCount] : t[I18nKey.minutesCount]}
  </div>
</div>