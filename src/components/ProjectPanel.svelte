<script lang="ts">
import { onMount } from "svelte";

import I18nKey from "../i18n/i18nKey";
import { i18n } from "../i18n/translation";
// import { getProjectUrlBySlug } from "../utils/url-utils";

export let tags: string[];
export let categories: string[];
export let sortedProjects: Project[] = [];

const params = new URLSearchParams(window.location.search);
tags = params.has("tag") ? params.getAll("tag") : [];
categories = params.has("category") ? params.getAll("category") : [];
const uncategorized = params.get("uncategorized");

interface Project {
	slug: string;
	data: {
		title: string;
		tags: string[];
		category?: string;
		published: Date;
	};
}

interface Group {
	year: number;
	projects: Project[];
}

let groups: Group[] = [];

function formatDate(date: Date) {
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");
	return `${month}-${day}`;
}

function formatTag(tagList: string[]) {
	return tagList.map((t) => `#${t}`).join(" ");
}

onMount(async () => {
	let filteredProjects: Project[] = sortedProjects;
	if (tags.length > 0) {
		filteredProjects = filteredProjects.filter(
			(project) =>
				Array.isArray(project.data.tags) &&
				project.data.tags.some((tag) => tags.includes(tag)),
		);
	}

	if (categories.length > 0) {
		filteredProjects = filteredProjects.filter(
			(project) =>
				project.data.category && categories.includes(project.data.category),
		);
	}

	if (uncategorized) {
		filteredProjects = filteredProjects.filter(
			(project) => !project.data.category,
		);
	}

	const grouped = filteredProjects.reduce(
		(acc, project) => {
			const year = project.data.published.getFullYear();
			if (!acc[year]) {
				acc[year] = [];
			}
			acc[year].push(project);
			return acc;
		},
		{} as Record<number, Project[]>,
	);

	const groupedProjectsArray = Object.keys(grouped).map((yearStr) => ({
		year: Number.parseInt(yearStr, 0),
		projects: grouped[Number.parseInt(yearStr, 0)],
	}));

	groupedProjectsArray.sort((a, b) => b.year - a.year);

	groups = groupedProjectsArray;
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
                    <div
                            class="h-3 w-3 bg-none rounded-full outline outline-[var(--primary)] mx-auto
                  -outline-offset-[2px] z-50 outline-3"
                    ></div>
                </div>
                <div class="w-[70%] md:w-[80%] transition text-left text-50">
                    {group.projects.length} {i18n(group.projects.length === 1 ? I18nKey.projectCount : I18nKey.projectsCount)}
                </div>
            </div>

            {#each group.projects as project}
                <a
                        href={project.slug}
                        aria-label={project.data.title}
                        class="group btn-plain !block h-10 w-full rounded-lg hover:text-[initial]"
                >
                    <div class="flex flex-row justify-start items-center h-full">
                        <!-- date -->
                        <div class="w-[15%] md:w-[10%] transition text-sm text-right text-50">
                            {formatDate(project.data.published)}
                        </div>

                        <!-- dot and line -->
                        <div class="w-[15%] md:w-[10%] relative dash-line h-full flex items-center">
                            <div
                                    class="transition-all mx-auto w-1 h-1 rounded group-hover:h-5
                       bg-[oklch(0.5_0.05_var(--hue))] group-hover:bg-[var(--primary)]
                       outline outline-4 z-50
                       outline-[var(--card-bg)]
                       group-hover:outline-[var(--btn-plain-bg-hover)]
                       group-active:outline-[var(--btn-plain-bg-active)]"
                            ></div>
                        </div>

                        <!-- project title -->
                        <div
                                class="w-[70%] md:max-w-[65%] md:w-[65%] text-left font-bold
                     group-hover:translate-x-1 transition-all group-hover:text-[var(--primary)]
                     text-75 pr-8 whitespace-nowrap overflow-ellipsis overflow-hidden"
                        >
                            {project.data.title}
                        </div>

                        <!-- tag list -->
                        <div
                                class="hidden md:block md:w-[15%] text-left text-sm transition
                     whitespace-nowrap overflow-ellipsis overflow-hidden text-30"
                        >
                            {formatTag(project.data.tags)}
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    {/each}
</div>
