import { getAllPosts } from '$lib/utils/blog.js';

export async function load() {
	const posts = await getAllPosts();

	// Extract unique tags from all posts
	const allTags = [...new Set(posts.flatMap(post => post.tags || []))].sort();

	return {
		posts,
		allTags
	};
}
