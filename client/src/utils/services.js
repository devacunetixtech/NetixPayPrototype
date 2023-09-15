export const baseUrl = "https://netix-pay-prot.onrender.com/api"

export const postRequest = async (url, body) =>{
    
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body,
    });

    const data = await response.json();
    if(!response.ok){
        let message

        if(data?.message){
            message = data.message;
        } else {
            message = data;
        }
        return {error: true, message};
    }
    return data
}; 