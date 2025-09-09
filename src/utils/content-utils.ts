import {
	getCollection,
	type InferEntrySchema,
	type Render,
	type RenderedContent,
} from "astro:content";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { getCategoryUrl } from "@utils/url-utils.ts";

interface Project {
	slug: string;
	data: {
		title: string;
		tags: string[];
		category?: string;
		published: Date;
	};
}

let cachedProjects: Project[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 30 * 60 * 1000;

export async function getSortedProjects(): Promise<Project[]> {
	const now = Date.now();

	if (cachedProjects && now - cacheTimestamp < CACHE_DURATION) {
		return cachedProjects;
	}

	const res = await fetch("https://api.github.com/users/Slimaeus/repos");
	const meiRes = await fetch("https://api.github.com/users/MeiCloudie/repos");
	const hutechCJRes = await fetch(
		"https://api.github.com/users/HUTECHCJ/repos",
	);

	const slimaeusProjects: {
		name: string;
		html_url: string;
		created_at: string;
		topics: string[];
	}[] = await res.json();
	const meiProjects: {
		name: string;
		html_url: string;
		created_at: string;
		topics: string[];
	}[] = await meiRes.json();

	const hutechCJProjects: {
		name: string;
		html_url: string;
		created_at: string;
		topics: string[];
	}[] = await hutechCJRes.json();

	const allProjects = [
		...(slimaeusProjects.length
			? slimaeusProjects.filter((data) => data.topics.includes("project"))
			: []),
		...(meiProjects.length
			? meiProjects.filter((data) => data.topics.includes("hutech-project"))
			: []),
		...(hutechCJProjects.length
			? hutechCJProjects.filter((data) => data.topics.includes("hutech"))
			: []),
	];

	const mappedProjects: Project[] = allProjects.map((data) => ({
		slug: data.html_url,
		data: {
			title: data.name,
			tags: [],
			published: new Date(data.created_at),
		},
	}));

	const sorted = mappedProjects.sort(
		(a, b) => +b.data.published - +a.data.published,
	);

	cachedProjects = sorted;
	cacheTimestamp = now;

	return sorted;
}

export async function getSortedPosts(): Promise<
	{
		id: string;
		render(): Render[".md"];
		slug: string;
		body: string;
		collection: "posts";
		data: InferEntrySchema<"posts">;
		rendered?: RenderedContent;
		filePath?: string;
	}[]
> {
	const allBlogPosts = await getCollection("posts", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});

	const sorted = allBlogPosts.sort((a, b) => {
		const dateA = new Date(a.data.published);
		const dateB = new Date(b.data.published);
		return dateA > dateB ? -1 : 1;
	});

	for (let i = 1; i < sorted.length; i++) {
		sorted[i].data.nextSlug = sorted[i - 1].slug;
		sorted[i].data.nextTitle = sorted[i - 1].data.title;
	}
	for (let i = 0; i < sorted.length - 1; i++) {
		sorted[i].data.prevSlug = sorted[i + 1].slug;
		sorted[i].data.prevTitle = sorted[i + 1].data.title;
	}

	return sorted;
}

export type Tag = {
	name: string;
	count: number;
};

export async function getTagList(): Promise<Tag[]> {
	const allBlogPosts = await getCollection<"posts">("posts", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});

	const countMap: { [key: string]: number } = {};
	allBlogPosts.forEach((post: { data: { tags: string[] } }) => {
		post.data.tags.forEach((tag: string) => {
			if (!countMap[tag]) countMap[tag] = 0;
			countMap[tag]++;
		});
	});

	// sort tags
	const keys: string[] = Object.keys(countMap).sort((a, b) => {
		return a.toLowerCase().localeCompare(b.toLowerCase());
	});

	return keys.map((key) => ({ name: key, count: countMap[key] }));
}

export type Category = {
	name: string;
	count: number;
	url: string;
};

export async function getCategoryList(): Promise<Category[]> {
	const allBlogPosts = await getCollection<"posts">("posts", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});
	const count: { [key: string]: number } = {};
	allBlogPosts.forEach((post: { data: { category: string | null } }) => {
		if (!post.data.category) {
			const ucKey = i18n(I18nKey.uncategorized);
			count[ucKey] = count[ucKey] ? count[ucKey] + 1 : 1;
			return;
		}

		const categoryName =
			typeof post.data.category === "string"
				? post.data.category.trim()
				: String(post.data.category).trim();

		count[categoryName] = count[categoryName] ? count[categoryName] + 1 : 1;
	});

	const lst = Object.keys(count).sort((a, b) => {
		return a.toLowerCase().localeCompare(b.toLowerCase());
	});

	const ret: Category[] = [];
	for (const c of lst) {
		ret.push({
			name: c,
			count: count[c],
			url: getCategoryUrl(c),
		});
	}
	return ret;
}
