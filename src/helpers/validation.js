import { MESSAGE } from '@/contants/message'
import { EMAIL_REGEX, PASSWORD_REGEX, PHONE_NUMBER_REGEX } from '@/contants/regex'

export const validateRequired = (value) => {
    let error;
    if (!value) {
        error = MESSAGE.required
    }
    return error
}

export const validatePrice = (value) => {
    let error;
    if (value < 0) {
        error = MESSAGE.priceInvalid
    }
    return error
}

export const validateEmail = (value) => {
    let error
    
    if (!value) {
      error = MESSAGE.required
    } else if (!EMAIL_REGEX.test(value)) {
      error = MESSAGE.emailRegexInvalid
    }
    return error
}

export const validatePassword = (value) => {
    let error;
    if (!value) {
        error = MESSAGE.required
    } else if (!PASSWORD_REGEX.test(value)) {
        error = MESSAGE.passwordRegexInvalid
    }
    return error
}

export const validatePhoneNumber = (value) => {
    let error;
    if (!value) {
        error = MESSAGE.required
    } else if (!PHONE_NUMBER_REGEX.test(value)) {
        error = MESSAGE.phoneNumberRegexInvalid
    }
    return error
}

