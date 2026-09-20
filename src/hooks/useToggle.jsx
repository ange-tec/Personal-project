import {useState} from "react";

export default function useToggle(initialValue = false) {
    const [value, setValue] = useState( initialValue );
    const toggle = () => {
        setValue((oldValue) => !oldValue); //inverse l'ancienne valeur
    }
    return [value, toggle]
}
