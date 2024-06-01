const API_ORIGIN = 'https://localhost:443'

export async function makeRequest(path: string, headers: any, method: string = 'GET') {
    const auth: string = sessionStorage.getItem('Authorization') ?? '';

    return fetch(API_ORIGIN + path, { headers: { Authorization: auth, ...headers }, method: 'GET' })
        .then((a: Response) => {
            if (a.ok && !auth) {
                sessionStorage.setItem('Authorization', JSON.stringify(headers.Authorization))
            }
            return a.ok;
        }).catch((reason: any) => false);


}