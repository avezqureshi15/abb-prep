import { useState, useRef } from "react";

type ValidationRule = {
    test: (value: string) => boolean;
    message: string;
};

type ValidationRules = {
    [key: string]: ValidationRule[];
};

const useValidation = (rules: ValidationRules) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

    const setFieldRef = (field: string, element: HTMLInputElement | null) => {
        inputRefs.current[field] = element;
    };

    const validateField = (field: string, value: string): boolean => {
        const fieldRules = rules[field];
        if (!fieldRules) {
            return true;
        }
        for (const rule of fieldRules) {
            if (!rule.test(value)) {
                setErrors((prev) => ({ ...prev, [field]: rule.message }));
                return false;
            }
        }

        setErrors((prev) => ({ ...prev, [field]: "" }));
        return true;
    };

    const validateForm = (formData: { [key: string]: string }): boolean => {
        let isValid = true;
        let firstInvalidField: string | null = null;

        for (const field in formData) {
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
    };

    return { errors, validateField, validateForm, setFieldRef };
};

export default useValidation;
