export const generateKey = (prefix: string) => {
    return `${ prefix }_${ new Date().getTime() }`;
}

export const debounceTime = (function() {
    let timer: NodeJS.Timeout;
    return function (delay: number, fn: Function) {
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => fn(), delay);
    };
})();

export function redirectToLogin() {
    const params = new URLSearchParams({
        redirect_uri: process.env.REACT_APP_KEYCLOAK_REDIRECT_URI as string,
        client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID as string,
        response_type: 'code',
        scope: 'write read',
        from: '/'
    });

    //window.location.href = `${process.env.REACT_APP_KEYCLOAK_LOGIN_URL}?${params.toString()}`;
    window.location.href = `/sso/?from=/`;
}

export function isJsonParsable (string: string) {
    try {
        JSON.parse(string);
    } catch (e) {
        return false;
    }
    return true;
}

export function handleUrlParam(key:string, value:string | null) {
    if (window.history.replaceState) {
        let searchParams = new URLSearchParams(window.location.search);

        if(!value){
            searchParams.delete(key);
        } else {
            searchParams.set(key, value);
        }

        let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
        window.history.replaceState({path: newurl}, '', newurl);
    }
}
