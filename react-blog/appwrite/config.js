import conf from '../src/conf/conf.js'; // Adjust the path as necessary
import {Client, ID, Databases, Storage, Query} from 'appwrite'; 

export class Service{
    client =new Client();
    Databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.Databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredimage,status,userId,authorName}){
        try{
            // Directly use Markdown content
            const markdownContent = content;

            // Create a Blob or File object from the Markdown string
            const markdownFile = new File([markdownContent], `${slug}.md`, { type: 'text/markdown' });

            // Upload the Markdown file to Appwrite storage
            const uploadedFile = await this.uploadFile(markdownFile);
            
            if (!uploadedFile) {
                throw new Error('Failed to upload Markdown file.');
            }

            // Store the file ID in the database\'s content field
            return await this.Databases.createDocument(
                conf.appwriteDatabaseId, // Database ID
                conf.appwriteCollectionId, // Collection ID
                slug, 
                {
                    title,
                    content: uploadedFile.$id, // Store file ID instead of content
                    featuredimage,
                    status,
                    userId,
                    authorName
                },
               
            )
        }catch(err){
            console.error('Error creating post:', err);
        }
    }

    

  async updatePost(slug,{title,content,featuredimage,status,authorName}){
        try{
            // First, get the existing post to retrieve the old content file ID
            const oldPost = await this.getPost(slug);
            if (oldPost && oldPost.content) {
                // Delete the old Markdown file
                await this.deleteFile(oldPost.content);
            }

            // Directly use Markdown content
            const markdownContent = content;

            // Create a Blob or File object from the Markdown string
            const markdownFile = new File([markdownContent], `${slug}.md`, { type: 'text/markdown' });

            // Upload the new Markdown file
            const uploadedFile = await this.uploadFile(markdownFile);

            if (!uploadedFile) {
                throw new Error('Failed to upload new Markdown file.');
            }
            
            return await this.Databases.updateDocument(
                conf.appwriteDatabaseId, // Database ID
                conf.appwriteCollectionId, // Collection ID
                slug, 
                {
                    title,
                    content: uploadedFile.$id, // Store new file ID
                    featuredimage,
                    status,
                    authorName
                },
            );
        }catch(err){
            console.error('Error updating post:', err);
        }
  }



  async deletePost(slug){
    try{
        await this.Databases.deleteDocument(
            conf.appwriteDatabaseId, // Database ID
            conf.appwriteCollectionId, // Collection ID
            slug // Document ID
        );
        return true; // Return true if deletion was successful
    }catch(err){
        console.error('Error deleting post:', err);
        return false; // Return false if deletion failed
    }
  }

  async getPost(slug){
    try{
        return await this.Databases.getDocument(
            conf.appwriteDatabaseId, // Database ID
            conf.appwriteCollectionId, // Collection ID
            slug // Document ID
        );
    }catch(err){
        console.error('Error fetching post:', err);
    }
  }

  async getPosts(queries = [Query.equal('status',"active")]){
    try{
        return await this.Databases.listDocuments(
            conf.appwriteDatabaseId, // Database ID
            conf.appwriteCollectionId, // Collection ID
            queries, // Queries to filter documents
        );
    }catch(err){
        console.error('Error fetching posts:', err);
    }
  }

  //this for file upload
  async uploadFile(file) {
   try{
    return await this.bucket.createFile(
        conf.appwriteBucketId, // Bucket ID
        ID.unique(), // Generate a unique file ID
        file // File to upload
    );
   }catch(err){
        console.error('Error uploading file:', err);
        return false
    }
  }

  async deleteFile(fileId) {
    try{
        await this.bucket.deleteFile(
            conf.appwriteBucketId, // Bucket ID
            fileId // File ID to delete
        );
        return true; // Return true if deletion was successful
    }catch(err){
        console.error('Error deleting file:', err);
    }
  }

  // in the documentation the get file preview dosent return any promise so we dont need async await in this so i didnt apply here
  getFileView(fileId){
    return this.bucket.getFileView(
        conf.appwriteBucketId, // Bucket ID
        fileId // File ID to get preview
    );
  }
}

const service =new Service();

export default service