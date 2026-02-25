import { siteConfig } from "../config";
import type I18nKey from "./i18nKey";
import { en } from "./languages/en";
import { vi } from "./languages/vi";

export type Translation = {
	[K in I18nKey]: string;
};

const defaultTranslation = en;

const map: { [key: string]: Translation } = {
	en: en,
	en_us: en,
	en_gb: en,
	en_au: en,
	vi: vi,
};

export function getTranslation(lang: string): Translation {
	return map[lang.toLowerCase()] || defaultTranslation;
}

export function getLang(): string {
	if (typeof localStorage !== "undefined") {
		return localStorage.getItem("lang") || siteConfig.lang || "en";
	}
	return siteConfig.lang || "en";
}

export function setLang(lang: string) {
	localStorage.setItem("lang", lang);
	window.location.reload();
}

export function i18n(key: I18nKey): string {
	const lang = getLang();
	return getTranslation(lang)[key];
}
