import * as yup from 'yup';
import 'yup-phone';

export const authSchema = yup.object().shape({
  login: yup
    .string()
    .required('Пожалуйста, введите логин')
    .min(5, 'Логин должен быть не короче 5 символов')
    .max(16, 'Логин не должен превышать 16 символов')
    .matches(/(?!^\d+$)[A-Za-z0-9_-]/, 'Логин может содержать только латинские буквы, цифры, _ и -'),
  password: yup
    .string()
    .required('Пожалуйста, введите пароль')
    .min(8, 'Пароль должен быть не короче 8 символов')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/, 'Пароль должен содержать минимум одну букву и одну цифру'),
});

export const registrationSchema = authSchema.concat(
  yup.object().shape({
    first_name: yup
      .string()
      .required('Пожалуйста, введите Ваше имя')
      .matches(/[A-ZА-Я][a-zа-я-]*/, 'Имя должно начинаться с заглавной буквы'),
    second_name: yup
      .string()
      .required('Пожалуйста, введите Ваше имя')
      .matches(/[A-ZА-Я][a-zа-я-]*/, 'Фамилия должна начинаться с заглавной буквы'),
    email: yup.string().required('Пожалуйста, введите email').email('Неверный email'),
    phone: yup.string().phone('RU', true, 'Неверный формат номера').required('Пожалуйста, введите Ваш номер телефона'),
    confirm_password: yup
      .string()
      .required('Пожалуйста, подтвердите пароль')
      .oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
  })
);

export const messageSchema = yup.object().shape({
  message: yup.string().required('Пожалуйста, введите сообщение'),
});
