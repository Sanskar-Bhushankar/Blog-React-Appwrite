//note for future :- upgrade if i want to change the baas change this auth file class data but keep the same params

import conf from '../src/conf/conf.js'; // Importing configuration for Appwrite connection
import { Client, Account,ID } from 'appwrite';


export class AuthService {
    client = new Client();
    account; //got an error earlier as i didnt defined account outside the constructor and used it directly inside 
    //so i am using this empty declation here 

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwrtieProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        //used try catch coz got appwrite stuck previously and returned null not found
        try{
            const userAccount = await this.account.create(
                ID.unique(), // Generate a unique user iD
                email,
                password,
                name
            );
            if(userAccount){
                    return this.login({email, password}); // Automatically will log in after account creation  
            } else{
                return userAccount
            }
        }
        catch (error) {
            console.error('Error creating account:', error);
        }
    }

    async login({email, password}) {
        try{
           return await this.account.createEmailSession(email, password);
        }catch (error) {
            console.error('Error logging in:', error);
        }

    }

    async getCurrentUser() {
        try{
            await this.account.get(); // This will throw an error if the user is not logged in
        }catch (error) {
            console.error('Error fetching current user:', error);
        }

        return null; // If the user is not logged in, return null and webpage will not reload 
    }

    async logout() {
        try{
            await this.account.deleteSessions(); // Deletes all current session on every browser for logging out from current session use deleteSession not deleteSessions
            return true; // Return true if logout was successful
        }catch(error){
            console.error('Error logging out:', error);
        }
    }
}

const authService = new AuthService();

export default authService;