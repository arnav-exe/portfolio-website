<script>
	import Python from '../icons/skills/Python.svelte';
	import Pytorch from '../icons/skills/Pytorch.svelte';
	import Tensorflow from '../icons/skills/Tensorflow.svelte';
	import Langchain from '../icons/skills/Langchain.svelte';
	import Javascript from '../icons/skills/Javascript.svelte';
	import Typescript from '../icons/skills/Typescript.svelte';
	import Node from '../icons/skills/Node.svelte';
	import Svelte from '../icons/skills/Svelte.svelte';
	import Aws from '../icons/skills/AWS.svelte';
	import Docker from '../icons/skills/Docker.svelte';
	import Git from '../icons/skills/Git.svelte';

	const SKILL_GROUPS = [
		{
			category: 'Languages',
			skills: [
				{ name: 'Python', icon: Python, url: 'https://www.python.org/' },
				{ name: 'JavaScript', icon: Javascript, url: 'https://v8.dev/' },
				{ name: 'TypeScript', icon: Typescript, url: 'https://www.typescriptlang.org/' }
			]
		},
		{
			category: 'AI / ML',
			skills: [
				{ name: 'PyTorch', icon: Pytorch, url: 'https://pytorch.org/' },
				{ name: 'TensorFlow', icon: Tensorflow, url: 'https://www.tensorflow.org/' },
				{ name: 'LangChain', icon: Langchain, url: 'https://www.langchain.com/' },
				{ name: 'LangGraph', url: 'https://www.langchain.com/langgraph' },
				{ name: 'Google ADK', url: 'https://google.github.io/adk-docs/' },
				{ name: 'LiteLLM', url: 'https://www.litellm.ai/' },
				{ name: 'Weaviate', url: 'https://weaviate.io/' },
				{ name: 'LangFuse', url: 'https://langfuse.com/' },
				{ name: 'RAGFlow', url: 'https://ragflow.io/' },
			]
		},
		{
			category: 'Web & Backend',
			skills: [
				{ name: 'Node.js', icon: Node, url: 'https://nodejs.org/' },
				{ name: 'Svelte', icon: Svelte, url: 'https://svelte.dev/' }
			]
		},
		{
			category: 'Cloud & DevOps',
			skills: [
				{ name: 'AWS', icon: Aws, url: 'https://aws.amazon.com/' },
				{ name: 'Docker', icon: Docker, url: 'https://www.docker.com/' },
				{ name: 'Git', icon: Git, url: 'https://git-scm.com/' }
			]
		}
	];

	// derives a 2-letter mark for skills with no matching icon, e.g.
	// "LangGraph" -> "LG", "Google ADK" -> "GA", "LiteLLM" -> "LL"
	function deriveMonogram(name) {
		const words = name.trim().split(/\s+/);
		if (words.length > 1) {
			return (words[0][0] + words[1][0]).toUpperCase();
		}
		const word = words[0];
		for (let i = 1; i < word.length; i++) {
			if (/[A-Z]/.test(word[i])) {
				return (word[0] + word[i]).toUpperCase();
			}
		}
		return word.slice(0, 2).toUpperCase();
	}
</script>

<div class="skills-manifest">
	{#each SKILL_GROUPS as group}
		<div class="skill-category-row">
			<div class="skill-category-label">{group.category}</div>
			<div class="skill-list">
				{#each group.skills as skill, i}
					<a class="skill-item" href={skill.url} target="_blank" rel="noopener">
						{#if skill.icon}
							<span class="skill-icon"><svelte:component this={skill.icon} /></span>
						{:else}
							<span class="skill-mono">{deriveMonogram(skill.name)}</span>
						{/if}
						<span>{skill.name}</span>
					</a>
					{#if i < group.skills.length - 1}
						<span class="skill-sep">/</span>
					{/if}
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	.skills-manifest {
		display: flex;
		flex-direction: column;
		width: fit-content;
		max-width: 100%;
		margin: 0 auto;
	}

	.skill-category-row {
		display: flex;
		gap: 1.75rem;
		padding: 1.1rem 0;
		border-bottom: 1px solid rgb(var(--color-primary-500) / 0.15);
		align-items: baseline;
	}

	.skill-category-row:first-child {
		padding-top: 0;
	}

	.skill-category-row:last-child {
		border-bottom: none;
	}

	.skill-category-label {
		flex: 0 0 10rem;
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: rgb(var(--color-secondary-700));
	}

	:global(.dark) .skill-category-label {
		color: rgb(var(--color-secondary-500));
	}

	.skill-list {
		flex: 1;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		font-size: 1.35rem;
		line-height: 1.9;
	}

	.skill-item {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		color: inherit;
	}

	.skill-icon {
		display: inline-flex;
		align-items: center;
		height: 1.05em;
		flex-shrink: 0;
	}

	:global(.skill-icon svg) {
		height: 100%;
		width: auto;
		display: block;
	}

	.skill-mono {
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.02em;
		color: rgb(var(--color-secondary-700));
	}

	:global(.dark) .skill-mono {
		color: rgb(var(--color-secondary-500));
	}

	.skill-sep {
		color: rgb(var(--color-primary-500) / 0.15);
		margin: 0 0.6rem;
	}

	@media (max-width: 640px) {
		.skill-category-row {
			flex-direction: column;
			gap: 0.5rem;
		}

		.skill-category-label {
			flex: none;
		}
	}
</style>
