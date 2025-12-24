import * as yup from 'yup';

export const eventValidationSchema = yup.object({
    name: yup
        .string()
        .required('The name of the event is required'),
    description: yup
        .string()
        .required('A description is required'),
    date: yup
        .string()
        .matches(/^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/,"Date must be in MM/DD/YYYY format")
        .required('The date is required'),
    time:yup
        .string()
        .matches(/(\d){2}:(\d){2}/, 'Must be "00:00"')
        .required('The time is required'),
    priority:yup
        .string()
        .oneOf(['Low','Medium','High'],"It can onlt be Low, Medium or High")
        .required('Priority required'),
})