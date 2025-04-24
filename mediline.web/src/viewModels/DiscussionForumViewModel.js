import { discussionPosts, userList } from '../assets/js/const';
import { discussionPostsList, discussionProfiles, repliesTable, baseUserList } from '../assets/js/const';

class DiscussionForumViewModel {
    // Initialize the view model with mock data
    posts = [...discussionPostsList];
    users = [...baseUserList];

    // Helper method to retrieve posts
    getPosts() {
        return this.posts; // Return the current list of posts
    }

    // Helper method to retrieve replies to a post by post ID
    getPostReplies(postId, offset, limit) {
        const replies = repliesTable.filter(reply => reply.postId === postId);

        const sortedReplies = replies.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));

        return sortedReplies.slice(offset, offset + limit);
    }

    // Helper method to retrieve users
    getUsers() {
        return this.users; // Return the list of users that authored the posts
    }

    // Helper method to retrieve discussion forum profiles
    getProfiles() {
        return this.discussionProfiles; // Return the list of profiles
    }

    // Helper method to retrieve discussion forum profiles by ID
    getProfilesById(id) {
        const record = discussionProfiles.find(user => user.userId === id);

        if (!record) {
            return [];
        }

        return record;
    }

    // Helper method to add a new post
    addPost(newPost) {
        if (!newPost.title || !newPost.content || !newPost.author) {
            throw new Error("Missing required fields: title, content, or author.");
        }
        const timestamp = "Just now"; // Mock timestamp
        const replies = 0; // New posts start with no replies

        // Create the new post object
        const post = {
            ...newPost,
            timestamp,
            replies,
        };

        // Add the new post to the list
        this.posts.unshift(post);
    }

    // Helper to simulate deleting a post
    deletePost(index) {
        if (index < 0 || index >= this.posts.length) {
            throw new Error("Invalid index for post deletion.");
        }
        this.posts.splice(index, 1);
    }
}

export const discussionForumViewModel = new DiscussionForumViewModel();