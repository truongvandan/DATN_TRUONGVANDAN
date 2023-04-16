import React from 'react'
import { useField, useFormikContext } from 'formik'
import { SingleDatepicker } from 'chakra-dayzed-datepicker';

const DatePickerField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);

    return (
        <SingleDatepicker
            {...field}
            {...props}
            date={field.value || new Date()}
            onDateChange={val => {
                setFieldValue(field.name, val);
            }}
        />
    );
};

export default DatePickerField
