
export const requestWithToken =  async (url: string, options: RequestInit) => {

    const token = localStorage.getItem('token');
    if(!token) throw new Error("Token not available");

    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();

    return data

}