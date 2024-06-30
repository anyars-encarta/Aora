import { Account, Client, ID } from 'react-native-appwrite';

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

// Register User
export const createUser = () => {
    account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
        .then(function (response) {
            console.log(response);
        }, function (error) {
            console.log(error);
        });
}
