import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";


class AuthService {
    client = new Client()
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwrite_url)
            .setProject(conf.appwrite_project_id);
        this.account = new Account(this.client);
    }


    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            console.log("User registered successfully.");

            if (userAccount) {
                // Call login method here
                return this.login({ email, password });
            }
            else {
                return userAccount
            }


        } catch (error) {
            console.error("Error registering user:", error);
        }
    }


    async login({ email, password }) {
        try {
            const user = await account.createEmailPasswordSession(email, password);
            return user;

        } catch (error) {
            console.error("Error logging in user:", error);
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user;

        } catch (error) {
            console.error("Error getting current user:", error);
        }
        return null;
    }

    async logout() {
        try {
            await account.deleteSessions();

        } catch (error) {
            console.error("Error logging out user:", error);
        }
    }
}

const authService = new AuthService();
export default new AuthService();