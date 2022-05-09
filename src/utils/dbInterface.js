
const host = "https://easy-to-go-crawler-back-end.herokuapp.com"

export async function loginAPI({username, password}){
    try{
        const response = await fetch(host+"/users/authenticate", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password}),
        })

        if(response.ok){
            const data = await response.json();
            return {ok: response.ok, message:"User Autenticated", data};
        }else{
            const data = await response.json();
            return {ok: response.ok, message:data.message, data}
        }
    }catch(err){
        console.log(err)
        return {ok: false, message: "Error with the connection", data: undefined}
    }
}

export async function singupAPI({username, password, firstName, lastName}){
    try{
        const response = await fetch(host+"/users/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password, firstName, lastName}),
        })

        if(response.ok){
            const data = await response.json();
            return {ok: response.ok, message:"User Registered", data};
        }else{
            const data = await response.json();
            return {ok: response.ok, message:data.message, data}
        }
    }catch(err){
        console.log(err)
        return {ok: false, message: "Error with the connection", data: undefined}
    }
}

export async function scanAPI({userId, target, token}){
    try{
        const response = await fetch(host+"/crawls/scan", {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userId, target}),
        })

        if(response.ok){
            const data = await response.json();
            return {ok: response.ok, message:"Crawling initiated", data};
        }else{
            const data = await response.json();
            return {ok: response.ok, message:data.message, data}
        }
    }catch(err){
        console.log(err)
        return {ok: false, message: "Error with the connection", data: undefined}
    }
}

export async function getCrawlsAPI({id, token}){
    try{
        const response = await fetch(host+"/crawls/"+id, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
        })

        if(response.ok){
            const data = await response.json();
            return {ok: response.ok, message:"Crawls retreived", data};
        }else{
            const data = await response.json();
            return {ok: response.ok, message:data.message, data}
        }
    }catch(err){
        console.log(err)
        return {ok: false, message: "Error with the connection", data: undefined}
    }
}

export async function deleteCrawlAPI({id, token}){
    try{
        const response = await fetch(host+"/crawls/"+id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
        })

        if(response.ok){
            return {ok: response.ok, message:"Crawl deleted, Refresh"};
        }else{
            const data = await response.json();
            return {ok: response.ok, message:data.message}
        }
    }catch(err){
        console.log(err)
        return {ok: false, message: "Error with the connection"}
    }
}