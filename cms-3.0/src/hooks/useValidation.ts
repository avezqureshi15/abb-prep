import { useRef, useState } from "react"

type ValidateRule = {
    test: (value: string) => boolean;
    message: string;
}

type ValidateRules = {
    [key: string]: ValidateRule[];
}

const useValidations = (rules: ValidateRules) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

    const setFieldRef = (field: string, element: HTMLInputElement | null) => {
        inputRefs.current[field] = element;
    }

    const validateField = (field: string, value: string) => {
        const fieldRules = rules[field];
        if (!fieldRules) {
            return true;
        }
        for (const rule of fieldRules) {
            if (!rule.test(value)) {
                setErrors((prev) => ({ ...prev, [field]: rule.message }))
                return false;
            }
        }
        setErrors((prev) => ({ ...prev, [field]: '' }));
        return true;
    }

    const validateForm = (formData: { [key: string]: string }) => {
        let firstInvalidField = null;
        let isValid = false;
        for (let field in formData) {
            if (!validateField(field, formData[field])) {
                if (!firstInvalidField) {
                    firstInvalidField = field;
                }
                isValid = false;
            }
        }

        if (firstInvalidField && inputRefs.current[firstInvalidField]) {
            inputRefs.current[firstInvalidField]?.focus();
        }

        return isValid;
    }

    return { setFieldRef, validateField, validateForm, errors }
}

export default useValidations