import API from "../api";

const GithubService = {
    /**
     * Search for repositories with filters
     * @param {Object} params - Query parameters
     * @param {string} params.q - Search query
     * @param {string} params.language - Programming language filter
     * @param {string} params.sort - Sort field (stars, updated, etc.)
     * @param {string} params.order - Sort order (desc, asc)
     * @param {number} params.page - Page number
     * @param {number} params.perPage - Items per page
     * @returns {Promise<Object>} - API response with meta and repos
     */
    searchRepositories: async (params = {}) => {
        try {
            const response = await API.get("/github/repos", { params });
            return response.data;
        } catch (error) {
            console.error("Error fetching repositories:", error);
            throw error;
        }
    },
};

export default GithubService;
