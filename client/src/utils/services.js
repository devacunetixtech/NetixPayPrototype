// export const baseUrl = "https://acunetixpay-newapi.onrender.com/api"
export const baseUrl = "http://localhost:5000/api" 

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

export const getRequest = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed
        },
        // No need for a request body in a GET request
    });

    const data = await response.json();
    if (!response.ok) {
        let message;

        if (data?.message) {
            message = data.message;
        } else {
            message = data;
        }
        return { error: true, message };
    }

    return data;
};
