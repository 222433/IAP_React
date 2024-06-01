import { API_ORIGIN } from "./app-constants";

export async function getEmail() {
    const res = await fetch(API_ORIGIN + 'user/email', { credentials: 'include' }).then(resp => {
        return resp.text();
    }).then(resp => {
        return resp;
    });

    return res;
}

export async function getPicture() {
    const res = await fetch(API_ORIGIN + 'user/picture', { credentials: 'include' }).then(resp => {
        return resp.text();
    }).then(resp => {
        return resp;
    });

    return res;
}