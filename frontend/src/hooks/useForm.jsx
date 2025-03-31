import { useState } from "react"

const useForm = (formInitialState) => {
    // FormState
    const [formState, setFormState] = useState(formInitialState)

    // Handle Change Input
    const handleInput = (e) => {
        const { name, value } = e.target
        setFormState((prevState) => {
            return { ...prevState, [name]: value }
        })
    }

    // Reset FormState
    const resetFormState = () => setFormState(formInitialState)

    return { formState, handleInput, resetFormState }
}

export default useForm