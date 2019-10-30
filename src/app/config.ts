export const config = {
    localStorage: {
        prefix: "notepad2",
        user: "notepad2-user",
        tags: "notepad2-tags",
        token: "notepad2-token"
    },
    authClients: {
        google: {
            authUrl: "https://notepad-api.herokuapp.com/api/auth/google",
            clientId: "762466157003-hq2jn040hivudvem4n0jjas9edu02ruj.apps.googleusercontent.com",
            redirectUri: window.location.origin + window.location.pathname
        }
    },
    notesUrl: "https://notepad-api.herokuapp.com/api/notes",
    usersUrl: "https://notepad-api.herokuapp.com/api/users"
};
