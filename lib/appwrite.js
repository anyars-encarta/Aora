import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.encarta.aora',
    projectId: '66815fef000167873b1c',
    databaseId: '6681622f00122baee818',
    userCollectionId: '668162720029f36ab0e5',
    videoCollectionId: '668162b50000f4fef7c3',
    storageId: '668164df0037f2892435'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username)

        if(!newAccount) throw new Error;

        const avatarURL = avatars.getInitials(username)

        await signIn(email, password)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarURL
            }
        )

        return newUser
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}

// Sign In User
export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)

        return session;
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}