/**
 * calculate reading time for a given text
 * @param {string} text - The text content
 * @returns {number} Estimated reading time in minutes
 */
export function calculateReadingTime(text) {
	const wordsPerMinute = 200;
	const words = text.trim().split(/\s+/).length;
	const minutes = Math.ceil(words / wordsPerMinute);
	return minutes;
}

/**
 * get all blog posts with their metadata
 * @returns {Promise<Array>} Array of blog post objects
 */
export async function getAllPosts() {
	const modules = import.meta.glob('/src/routes/blog/posts/**/*.svx', { eager: true });

	const posts = [];

	for (const path in modules) {
		const module = modules[path];
		const slug = path.split('/').pop().replace('.svx', '');

		if (module.metadata) {
			posts.push({
				slug,
				...module.metadata,
				// use readingTime from metadata or default to 5 minutes
				readingTime: module.metadata.readingTime || 5
			});
		}
	}
	// sort by date, newest first
	posts.sort((a, b) => new Date(b.date) - new Date(a.date));

	return posts;
}
