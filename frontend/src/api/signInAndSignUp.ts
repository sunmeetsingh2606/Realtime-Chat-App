export async function login(email: string, password: string){
    try {
        const res = await fetch(`${import.meta.env.VITE_API_ADDRESS}/auth/login`,{
            method:'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        const data = await res.json();
        return data;
        
    } catch(err){
        console.error(err);
    }

}

export async function register(formdata:any){
    try {
        const res = await fetch(`${import.meta.env.VITE_API_ADDRESS}/auth/register`,{
            method:'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formdata)
        })
        const data = await res.json();
        return data;

    } catch(err){
        console.error(err);
    }

}