interface Props {
    form: FormData
    data: Object
}

/**
 * Function for converting a useForm hook into a FormData object
 * 
 * @prop form FormData
 * @prop data useForm
 * @returns FormData
 */
export const formHookToFormData = ({ form, data }: Props): FormData => {
    for (const [key, value] of Object.entries(data)) {
        if (value instanceof FileList) {
            form.append(key, value[0]);
            continue;
        }
        form.append(key, value);
    }
    return form
}