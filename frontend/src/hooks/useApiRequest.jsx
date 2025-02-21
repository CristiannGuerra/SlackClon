import { useState } from "react"
import ServerError from "../utils/errors.utils"

const useApiRequest = (url) => {
    // Initial API Response State
    const initialApiResponseState = {
        loading: false,
        error: null,
        data: null
    }

    // API Response State
    const [apiResponse, setApiResponse] = useState(initialApiResponseState)

    // Handle Submit Form
    const postRequest = async (body) => {
        try {
            // Set API Response Loading to true
            setApiResponse(() => {
                return { ...initialApiResponseState, loading: true }
            })
            
            // Fetch API Response
            const response = await fetch(
                url,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                }
            )

            const responseData = await response.json()

            if (responseData.ok) {
                setApiResponse((prevState) => {
                    return { ...prevState, data: responseData }
                })
            } else {
                throw new ServerError(responseData.message, responseData.ok)
            }

        } catch (error) {
            setApiResponse((prevState) => {
                if (error.status) {
                    return { ...prevState, error: error.message }
                } else {
                    return { ...prevState, error: 'Something went wrong' }
                }
            })

        }
        finally {
            // Set API Response Loading to false
            setApiResponse((prevState) => {
                return { ...prevState, loading: false }
            })
        }

    }
    return { apiResponse, postRequest }
}

export default useApiRequest