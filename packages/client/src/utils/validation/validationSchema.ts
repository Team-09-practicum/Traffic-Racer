import * as yup from 'yup';
import 'yup-phone';
// import wordsCounter from 'word-counting';

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

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required('Пожалуйста, введите пароль'),
  newPassword: yup
    .string()
    .required('Пожалуйста, введите пароль')
    .min(8, 'Пароль должен быть не короче 8 символов')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/, 'Пароль должен содержать минимум одну букву и одну цифру')
    .notOneOf([yup.ref('oldPassword'), null], 'Старый и новый пароли совпадают'),
  confirm_password: yup
    .string()
    .required('Пожалуйста, подтвердите пароль')
    .oneOf([yup.ref('newPassword'), null], 'Пароли не совпадают'),
});

export const profileSchema = registrationSchema.omit(['password', 'confirm_password']).concat(
  yup.object().shape(
    {
      display_name: yup
        .string()
        .nullable()
        .when('display_name', (value) => {
          if (value?.length > 0) {
            return yup
              .string()
              .min(3, 'Имя должно быть не короче 3 символов')
              .max(10, 'Имя не должно превышать 10 символов')
              .matches(/(?!^\d+$)[A-Za-z0-9_-]/, 'Имя может содержать только латинские буквы, цифры, _ и -');
          }
          return yup.string().notRequired();
        }),
    },
    [['display_name', 'display_name']]
  )
);

export const createTopicSchema = yup.object().shape({
  topic_name: yup
    .string()
    .required('Пожалуйста, введите название темы')
    .min(5, 'Название темы не должно быть короче 5 символов')
    .max(100, 'Название темы не должно превышать 100 символов'),
  rich_text: yup.string(),
  // .test(
  //   'Минимум одно слово',
  //   'Пожалуйста, введите текст сообщения',
  //   (value) => wordsCounter(value || '', { isHtml: true }).wordsCount > 0
  // ),
});

export const replyInTopicSchema = yup.object().shape({
  rich_text: yup.string(),
  // .test(
  //   'Минимум одно слово',
  //   'Пожалуйста, введите текст сообщения',
  //   (value) => wordsCounter(value || '', { isHtml: true }).wordsCount > 0
  // ),
});
