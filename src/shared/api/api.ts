const BASE_URL = 'https://test.tspb.su/test-task/';


export const getVehicles = async () => {
    try {
        const response = await fetch(`${BASE_URL}vehicles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(!response.ok) {
            const errorMessage = `Ошибка при запросе getVehicles: ${response.status}`;
            console.log(errorMessage);
            return response.status
        }
        return await response.json(); 
    }
    catch (error:any) {
        const errorMessage = `Ошибка при запросе getVehicles: ${error.message}`;
        console.error(errorMessage);
        return errorMessage;
    }
}
