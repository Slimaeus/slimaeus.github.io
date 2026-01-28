<script lang="ts">
import { onMount } from "svelte";
import I18nKey from "../i18n/i18nKey";
import { i18n } from "../i18n/translation";

interface Project {
	slug: string;
	data: {
		title: string;
		tags: string[];
		category?: string | null;
		published: Date | string;
	};
}

interface Group {
	year: number;
	projects: Project[];
}

export let sortedProjects: Project[] = [];

let tags: string[] = [];
let categories: string[] = [];
let groups: Group[] = [];

function formatDate(date: Date | string) {
	const d = new Date(date);
	const month = (d.getMonth() + 1).toString().padStart(2, "0");
	const day = d.getDate().toString().padStart(2, "0");
	return `${month}-${day}`;
}

function formatTag(tagList: string[]) {
	if (!tagList) return "";
	return tagList.map((t) => `#${t}`).join(" ");
}

onMount(async () => {
	// Access window safely inside onMount
	const params = new URLSearchParams(window.location.search);
	tags = params.getAll("tag");
	categories = params.getAll("category");
	const uncategorized = params.has("uncategorized");

	let filteredProjects: Project[] = [...sortedProjects];

	if (tags.length > 0) {
		filteredProjects = filteredProjects.filter((p) =>
			p.data.tags?.some((tag) => tags.includes(tag)),
		);
	}

	if (categories.length > 0) {
		filteredProjects = filteredProjects.filter(
			(p) => p.data.category && categories.includes(p.data.category),
		);
	}

	if (uncategorized) {
		filteredProjects = filteredProjects.filter((p) => !p.data.category);
	}

	const grouped = filteredProjects.reduce(
		(acc, project) => {
			const year = new Date(project.data.published).getFullYear();
			if (!acc[year]) acc[year] = [];
			acc[year].push(project);
			return acc;
		},
		{} as Record<number, Project[]>,
	);

	groups = Object.keys(grouped)
		.map((yearStr) => ({
			year: Number.parseInt(yearStr),
			projects: grouped[Number.parseInt(yearStr)],
		}))
		.sort((a, b) => b.year - a.year);
});
</script>

<div class="card-base px-8 py-6">
    {#each groups as group}
        <div>
            <div class="flex flex-row w-full items-center h-[3.75rem]">
                <div class="w-[15%] md:w-[10%] transition text-2xl font-bold text-right text-75">
                    {group.year}
                </div>
                <div class="w-[15%] md:w-[10%]">
                    <div class="h-3 w-3 bg-none rounded-full outline outline-[var(--primary)] mx-auto -outline-offset-[2px] z-50 outline-3"></div>
                </div>
                <div class="w-[70%] md:w-[80%] transition text-left text-50">
                    {group.projects.length} {i18n(group.projects.length === 1 ? I18nKey.projectCount : I18nKey.projectsCount)}
                </div>
            </div>

            {#each group.projects as project}
                <a href={project.slug} aria-label={project.data.title} class="group btn-plain !block h-10 w-full rounded-lg hover:text-[initial]">
                    <div class="flex flex-row justify-start items-center h-full">
                        <div class="w-[15%] md:w-[10%] transition text-sm text-right text-50">
                            {formatDate(project.data.published)}
                        </div>
                        <div class="w-[15%] md:w-[10%] relative dash-line h-full flex items-center">
                            <div class="transition-all mx-auto w-1 h-1 rounded group-hover:h-5 bg-[oklch(0.5_0.05_var(--hue))] group-hover:bg-[var(--primary)] outline outline-4 z-50 outline-[var(--card-bg)] group-hover:outline-[var(--btn-plain-bg-hover)] group-active:outline-[var(--btn-plain-bg-active)]"></div>
                        </div>
                        <div class="w-[70%] md:max-w-[65%] md:w-[65%] text-left font-bold group-hover:translate-x-1 transition-all group-hover:text-[var(--primary)] text-75 pr-8 whitespace-nowrap overflow-ellipsis overflow-hidden">
                            {project.data.title}
                        </div>
                        <div class="hidden md:block md:w-[15%] text-left text-sm transition whitespace-nowrap overflow-ellipsis overflow-hidden text-30">
                            {formatTag(project.data.tags)}
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    {/each}
</div>