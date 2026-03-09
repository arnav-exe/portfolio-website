/**
 * calculate reading time for a given text
 * @param {string} text - The text content
 * @returns {number} Estimated reading time in minutes
 */
export function calculateReadingTime(text) {
	const wordsPerMinute = 200;
	if (!text || !text.trim()) return 0;
	const words = text.trim().split(/\s+/).length;
	const minutes = Math.ceil(words / wordsPerMinute);
	return minutes;
}

/**
 * Remove mdsvex frontmatter from a post source string
 * @param {string} source
 * @returns {string}
 */
function stripFrontmatter(source) {
	if (!source) return '';
	return source.replace(/^---[\s\S]*?---\s*/, '');
}

/**
 * get all blog posts with their metadata
 * @returns {Promise<Array>} Array of blog post objects
 */
export async function getAllPosts() {
	const modules = import.meta.glob('/src/routes/blog/posts/**/*.svx', { eager: true });
	const rawModules = import.meta.glob('/src/routes/blog/posts/**/*.svx', {
		eager: true,
		query: '?raw',
		import: 'default'
	});

	const posts = [];

	for (const path in modules) {
		const module = modules[path];
		const slug = path.split('/').pop().replace('.svx', '');
		const rawPost = rawModules[path] || '';
		const readingTime = calculateReadingTime(stripFrontmatter(rawPost));

		if (module.metadata) {
			posts.push({
				slug,
				...module.metadata,
				readingTime
			});
		}
	}
	// sort by date, newest first
	posts.sort((a, b) => new Date(b.date) - new Date(a.date));

	return posts;
}
