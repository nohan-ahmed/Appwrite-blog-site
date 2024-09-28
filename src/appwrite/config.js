import { Client, Databases, ID, Storage, Query } from "appwrite";
import conf from "../conf/conf";

class Service {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwrite_url)
            .setProject(conf.appwrite_project_id);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    };

    async createPost({ userId, title, slug, thumbnail, content, status }) {
        try {
            const result = await this.databases.createDocument(
                conf.appwrite_database_id, // databaseId
                conf.appwrite_collection_id, // collectionId
                ID.unique, // documentId 
                {
                    userId,
                    title,
                    thumbnail,
                    content,
                    status
                }, // data

            );

            return result;
        }
        catch (error) {
            console.error("Error creating post:", error);
            return null;
        }
    }
    async updatePost({ postId, title, thumbnail, content, status }) {
        try {
            const result = await this.databases.updateDocument(
                conf.appwrite_database_id, // databaseId
                conf.appwrite_collection_id, // collectionId
                postId, // documentId 
                {
                    title,
                    thumbnail,
                    content,
                    status
                }, // data

            );

            return result;
        }
        catch (error) {
            console.error("Error updating post:", error);
            return null;
        }
    }

    async deletePost(postId) {
        try {
            await this.databases.deleteDocument(
                conf.appwrite_database_id, // databaseId
                conf.appwrite_collection_id, // collectionId
                postId, // documentId 
            );

            return true;
        }
        catch (error) {
            console.error("Error deleting post:", error);
            return false;
        }
    }
    async getPost(postId) {
        try {
            const result = await this.databases.getDocument(
                conf.appwrite_database_id, // databaseId
                conf.appwrite_collection_id, // collectionId
                postId, // documentId 
            );

            return result;
        }
        catch (error) {
            console.error("Error getting post:", error);
            return null;
        }
    }

    async getAllPosts(queries = [Query.equal("status", "active")]) {
        try {
            const result = await this.databases.listDocuments(
                conf.appwrite_database_id, // databaseId
                conf.appwrite_collection_id, // collectionId
                queries, // queries
            );

            return result;
        }
        catch (error) {
            console.error("Error getting all posts:", error);
            return null;
        }
    }

    // File Upload service
    async uploadFile(file) {
        try {
            const response = await this.storage.createFile(
                conf.appwrite_bucket_id, // bucketId
                ID.unique(), // File ID
                file, // file
            );

            return response;
        } catch (error) {
            console.error("Error uploading file:", error);
            return null;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                conf.appwrite_bucket_id, // bucketId
                fileId // fileId
            );

            return true;
        } catch (error) {
            console.error("Error deleting file:", error);
            return false;
        }
    }


    getFilePreview(fileId) {
        try {
            const response = this.storage.getFilePreview(
                conf.appwrite_bucket_id, // bucketId
                fileId // fileId
            );

            return response;
        } catch (error) {
            console.error("Error getting file preview:", error);
            return null;
        }
    }
}
const service = new Service()

export default service
