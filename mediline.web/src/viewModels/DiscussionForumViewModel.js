import { discussionPostsList, discussionProfiles, repliesTable, baseUserList } from '../assets/js/const';
import axiosInstance from '../assets/js/api';

class DiscussionForumViewModel {
    // Form Data
    inputs = {
        title: "",
        content: "",
        bio: "",
        userId: "",
        postId: "",
        comment: ""
    }

    // Initialize the view model with mock data
    posts = [...discussionPostsList];
    users = [...baseUserList];

    // The super user's token
    async getSuperToken() {
        try {
            const response = await axiosInstance.post(`/auth/login`, {
                password: "password123",
                username: "pthompson@example.org"
            });

            const token = response.data.token;

            // Split the JWT into three parts (Header, Payload, Signature)
            const payloadBase64 = token.split(".")[1];

            // Decode the Base64 string and parse the JSON
            const decodedPayload = JSON.parse(atob(payloadBase64));
            console.log(`Decoded Token: ${decodedPayload}`);

            // Stores the super user's token in local storage
            localStorage.setItem("jwtToken", token);
        } catch (error) {
            console.error("Error:", error);
        }
        return localStorage.getItem("jwtToken");
    }

    isTokenExpired(token) {
        try {
            // Split the JWT into its parts (Header, Payload, Signature)
            const payloadBase64 = token.split(".")[1];

            // Decode the Base64 string and parse the JSON
            const decodedPayload = JSON.parse(atob(payloadBase64));

            // Check if the token has expired
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            return decodedPayload.exp < currentTime; // `exp` is the expiration time in the token payload
        } catch (error) {
            console.error("Error decoding token:", error);
            return true; // Treat the token as expired if there's an error
        }
    }

    async fetchDiscussionData() {
        if (!localStorage.getItem("jwtToken") || this.isTokenExpired(localStorage.getItem("jwToken"))) {
            await this.getSuperToken();
        }

        try {
            // Step 1: Fetch posts
            const posts = await this.fetchPosts();
            if (posts.length === 0) {
                console.log("No posts found.");
                return { posts: [], message: "No posts found" };
            }

            // Step 2: Fetch user information
            const userIds = posts.map((post) => post.user_id);
            const users = await this.fetchUsers(userIds);

            // Step 3: Fetch comments
            const postIds = posts.map((post) => post.post_id);
            const comments = await this.fetchComments(postIds);

            // Step 4: Combine all data
            const combinedPosts = await this.combinePosts(posts, users, comments);

            return {
                posts: combinedPosts,
            };
        } catch (error) {
            console.error("Error fetching discussion data:", error);
            return {
                posts: [],
                error: error.response?.data || error.message,
            };
        }
    }

    async fetchPosts() {
        try {
            const response = await axiosInstance.get("/social_media/", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
            });

            const posts = response.data || [];
            console.log(`Fetched Posts:\n${JSON.stringify(posts, null, 2)}`);
            return posts;
        } catch (error) {
            console.error("Error fetching posts:", error);
            return [];
        }
    }

    async fetchUsers(userIds) {
        const uniqueUserIds = [...new Set(userIds)];
        const users = [];

        for (const userId of uniqueUserIds) {
            try {
                console.log(userId);
                const response = await axiosInstance.get(`/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                    },
                });
                users.push(response.data);
            } catch (error) {
                console.error(`Error fetching user info for User ID ${userId}:`, error);
            }
        }
        console.log(`Fetched Users:\n${JSON.stringify(users, null, 2)}`);
        return users;
    }

    async fetchComments(postIds) {
        const comments = [];

        for (const postId of postIds) {
            try {
                const response = await axiosInstance.get(`/social_media/${postId}/comments`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                    },
                });
                comments.push(...response.data);
            } catch (error) {
                console.error(`Error fetching comments for Post ID ${postId}:`, error);
            }
        }

        console.log(`Fetched Comments:\n${JSON.stringify(comments, null, 2)}`);
        return comments;
    }

    async combinePosts(posts, users, comments) {
        const userCache = new Map(); // Cache to store user data by user_id

        // Helper function to fetch user data and cache it
        const fetchUserData = async (userId) => {
            if (userCache.has(userId)) {
                return userCache.get(userId); // Return cached user data
            }

            const user = await this.getUser(userId); // Fetch user data from the API
            if (user) {
                userCache.set(userId, user); // Cache the user data
            }
            return user;
        };

        // Enrich comments with user data
        const enrichedComments = await Promise.all(
            comments.map(async (comment) => {
                const user = await fetchUserData(comment.user_id); // Fetch user data for the comment author
                return {
                    ...comment,
                    user: user ? { first_name: user.first_name, last_name: user.last_name } : null, // Attach only the required fields
                };
            })
        );

        // Enrich posts with comments and user data
        const enrichedPosts = posts.map((post) => {
            const postComments = enrichedComments.filter((comment) => comment.post_id === post.post_id);
            const user = users.find((user) => user.user_id === post.user_id);

            return {
                ...post,
                user, // Attach the matched user
                comments: postComments, // Attach enriched comments
            };
        });

        console.log(`Enriched Posts:\n${JSON.stringify(enrichedPosts, null, 2)}`);
        return enrichedPosts;
    }


    async getUser(userId) {
        try {
            const response = await axiosInstance.get(`/user/${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });
            console.log(`User fetched!\n${JSON.stringify(response.data, null, 2)}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching a user:", error);
        }
    }

    //async getCommentsById(postId) {
    //    try {
    //        const response = await axiosInstance.post(`/social_media/${postId}/comments`, {
    //            headers: {
    //                "Content-Type": "application/json",
    //                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
    //            }
    //        });

    //        return response.data;
    //    } catch (error) {
    //        console.error("Error:", error);
    //    }
    //}

    async createPost(title, content, id) {
        try {
            const payload = {
                content: content,
                title: title,
            }

            console.log(`User ${id} Post fields: ${JSON.stringify(payload, null, 2)}`);

            const response = await axiosInstance.post(`/social_media/${id}/post`, payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });
            
            console.log(`Successfully created a post!\n${JSON.stringify(response.data)}`);

            return response.data;
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async postComment(userId, postId, content) {
        try {
            const payload = {
                content: content,
            }

            console.log(`My current payload:\n${JSON.stringify(payload, null, 2)}`)

            const response = await axiosInstance.post(`/social_media/${userId}/post/${postId}/comment`, payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });

            return response.data;
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // Converts a date string into a Date object
    convertToDate(dateString) {
        try {
            // Parse the date string into a Date object
            const date = new Date(dateString);

            // Check if the date is valid
            if (isNaN(date.getTime())) {
                throw new Error("Invalid date format");
            }

            return date;
        } catch (error) {
            console.error(`Error converting date string: ${error.message}`);
            return null; // Return null if the date is invalid
        }
    }

    // Helper method to generate a timestamp for posts
    generateTimestamp(date) {
        if (!date || !(date instanceof Date)) {
            throw new Error("Invalid date. Please provide a valid Date object.");
        }

        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000); // Difference in seconds

        if (diffInSeconds < 0) {
            return "In the future"; // Handle future dates
        }

        if (diffInSeconds < 10) {
            return "Just now";
        }

        if (diffInSeconds < 60) {
            return `${diffInSeconds} seconds ago`;
        }

        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return `${diffInMinutes} minutes ago`;
        }

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            return `${diffInHours} hours ago`;
        }

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) {
            return `${diffInDays} days ago`;
        }

        const diffInWeeks = Math.floor(diffInDays / 7);
        if (diffInWeeks < 4) {
            return `${diffInWeeks} weeks ago`;
        }

        const diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths < 12) {
            return `${diffInMonths} months ago`;
        }

        const diffInYears = Math.floor(diffInDays / 365);
        return `${diffInYears} years ago`;
    }

    // Helper method to retrieve posts
    //getPosts() {
    //    return this.posts; // Return the current list of posts
    //}

    // Helper method to retrieve replies to a post by post ID
    getPostReplies(postId, offset, limit) {
        const replies = repliesTable.filter(reply => reply.postId === postId);

        const sortedReplies = replies.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));

        return sortedReplies.slice(offset, offset + limit);
    }

    // Helper method to add a new reply
    addReply({ postId, parentReplyId, content }) {
        if (!postId || !content) {
            throw new Error("Invalid reply object. Ensure postId and content are provided.");
        }

        // Generate ID and createDate
        const newReply = {
            id: Math.random().toString(36).substr(2, 9),
            postId: postId,
            parentReplyId: parentReplyId || null,
            content: content,
            createDate: new Date().toISOString(),
        };

        // Add the new reply to the Replies table
        this.repliesTable = [...this.repliesTable, newReply];
    }
    // Helper method to retrieve nested replies for a given parent reply ID
    getNestedReplies(postID, parentReplyID) {
        const postReplies = repliesTable.filter(reply => reply.postId === postID);

        const nestedReplies = postReplies.filter(reply => reply.parentReplyId === parentReplyID);

        return nestedReplies
    }

    // Helper method to retrieve the number of replies to a discussion post
    getReplyCount(postId) {
        const numReplies = repliesTable.filter(reply => reply.postId === postId);
        
        return numReplies.length;
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