import {
  authSchema,
  registrationSchema,
  messageSchema,
  changePasswordSchema,
  profileSchema,
} from '@/utils/validation/validationSchema';

describe('Validation Schema', () => {
  describe('Test authSchema', () => {
    test('login should not be empty', async () => {
      await expect(authSchema.validateAt('login', { login: '' })).rejects.toBeTruthy();
    });

    test('login should be between 5 and 16 symbols', async () => {
      await expect(authSchema.validateAt('login', { login: 'a'.repeat(4) })).rejects.toBeTruthy();
      await expect(authSchema.validateAt('login', { login: 'a'.repeat(17) })).rejects.toBeTruthy();
    });

    test('login should not contain symbols except _ and -', async () => {
      const invalidSymbols1 = '!"#$%&\'()*+';
      const invalidSymbols2 = ',./:;<=>?@[';
      const invalidSymbols3 = '\\]^`{|}~';
      const validSymbols = '-_-_-_';

      await expect(authSchema.validateAt('login', { login: invalidSymbols1 })).rejects.toBeTruthy();
      await expect(authSchema.validateAt('login', { login: invalidSymbols2 })).rejects.toBeTruthy();
      await expect(authSchema.validateAt('login', { login: invalidSymbols3 })).rejects.toBeTruthy();
      await expect(authSchema.validateAt('login', { login: validSymbols })).resolves.toBeTruthy();
    });

    test('login should not accept cyrillic', async () => {
      await expect(authSchema.validateAt('login', { login: 'абвгдеёжз' })).rejects.toBeTruthy();
    });

    test('login should accept a valid value', async () => {
      const validValue = 'Valid_Login-1';
      await expect(authSchema.validateAt('login', { login: validValue })).resolves.toBeTruthy();
    });

    test('password should not be empty', async () => {
      await expect(authSchema.validateAt('password', { password: '' })).rejects.toBeTruthy();
    });

    test('password should be more than 8 symbols', async () => {
      await expect(authSchema.validateAt('password', { password: '1@qwe' })).rejects.toBeTruthy();
      await expect(authSchema.validateAt('password', { password: '1@qwerty' })).resolves.toBeTruthy();
    });

    test('password should contain number and symbol', async () => {
      await expect(authSchema.validateAt('password', { password: 'invalidpassword' })).rejects.toBeTruthy();
      await expect(authSchema.validateAt('password', { password: 'inv@lidpassw0rd' })).resolves.toBeTruthy();
    });

    test('password should accept a valid value', async () => {
      const validPassword = 'V@lid_Pa$s-1';
      await expect(authSchema.validateAt('password', { password: validPassword })).resolves.toBeTruthy();
    });
  });

  describe('Test registrationSchema', () => {
    test('first name should not be empty', async () => {
      await expect(registrationSchema.validateAt('first_name', { first_name: '' })).rejects.toBeTruthy();
    });

    test('first name should start with capital letter', async () => {
      await expect(registrationSchema.validateAt('first_name', { first_name: 'alex' })).rejects.toBeTruthy();
      await expect(registrationSchema.validateAt('first_name', { first_name: 'Alex' })).resolves.toBeTruthy();
    });

    test('second name should not be empty', async () => {
      await expect(registrationSchema.validateAt('second_name', { second_name: '' })).rejects.toBeTruthy();
    });

    test('second name should start with capital letter', async () => {
      await expect(registrationSchema.validateAt('second_name', { second_name: 'alex' })).rejects.toBeTruthy();
      await expect(registrationSchema.validateAt('second_name', { second_name: 'Alex' })).resolves.toBeTruthy();
    });

    test('email should not be empty', async () => {
      await expect(registrationSchema.validateAt('email', { email: '' })).rejects.toBeTruthy();
    });

    test('email should accept only valid values', async () => {
      await expect(registrationSchema.validateAt('email', { email: 'mail@' })).rejects.toBeTruthy();
      await expect(registrationSchema.validateAt('email', { email: 'inbox@mail.box' })).resolves.toBeTruthy();
    });

    test('phone should not be empty', async () => {
      await expect(registrationSchema.validateAt('phone', { phone: '' })).rejects.toBeTruthy();
    });

    test('phone should accept only valid values', async () => {
      await expect(registrationSchema.validateAt('phone', { phone: '+12345678abc' })).rejects.toBeTruthy();
      await expect(registrationSchema.validateAt('phone', { phone: '88005553535' })).resolves.toBeTruthy();
    });
  });

  describe('Test messageSchema', () => {
    test('message should not be empty', async () => {
      await expect(messageSchema.validateAt('message', { message: '' })).rejects.toBeTruthy();
    });
  });

  describe('Test changePasswordSchema', () => {
    test('old password should not be empty', async () => {
      await expect(changePasswordSchema.validateAt('oldPassword', { oldPassword: '' })).rejects.toBeTruthy();
    });

    test('new password should not be empty', async () => {
      await expect(changePasswordSchema.validateAt('newPassword', { newPassword: '' })).rejects.toBeTruthy();
    });

    test('new password should be more than 8 symbols', async () => {
      await expect(changePasswordSchema.validateAt('newPassword', { newPassword: '1@qwe' })).rejects.toBeTruthy();
      await expect(changePasswordSchema.validateAt('newPassword', { newPassword: '1@qwerty' })).resolves.toBeTruthy();
    });

    test('new password should contain number and symbol', async () => {
      await expect(
        changePasswordSchema.validateAt('newPassword', { newPassword: 'invalidpassword' })
      ).rejects.toBeTruthy();
      await expect(
        changePasswordSchema.validateAt('newPassword', { newPassword: 'inv@lidpassw0rd' })
      ).resolves.toBeTruthy();
    });

    test('new password should accept a valid value', async () => {
      const validPassword = 'V@lid_Pa$s-1';
      await expect(
        changePasswordSchema.validateAt('newPassword', { newPassword: validPassword })
      ).resolves.toBeTruthy();
    });

    test('confirm password should not be empty', async () => {
      await expect(changePasswordSchema.validateAt('confirm_password', { confirm_password: '' })).rejects.toBeTruthy();
    });
  });

  describe('Test profileSchema', () => {
    test('display name could be empty', async () => {
      await expect(profileSchema.validateAt('display_name', { display_name: '' })).resolves.toEqual('');
    });

    test('display name should be between 3 and 10 symbols', async () => {
      await expect(profileSchema.validateAt('display_name', { display_name: 'a'.repeat(2) })).rejects.toBeTruthy();
      await expect(profileSchema.validateAt('display_name', { display_name: 'a'.repeat(8) })).resolves.toBeTruthy();
      await expect(profileSchema.validateAt('display_name', { display_name: 'a'.repeat(11) })).rejects.toBeTruthy();
    });

    test('display name should not contain symbols except _ and -', async () => {
      const invalidSymbols1 = '!"#$%&\'()*+';
      const invalidSymbols2 = ',./:;<=>?@[';
      const invalidSymbols3 = '\\]^`{|}~';
      const validSymbols = '-_-_-_';

      await expect(profileSchema.validateAt('display_name', { display_name: invalidSymbols1 })).rejects.toBeTruthy();
      await expect(profileSchema.validateAt('display_name', { display_name: invalidSymbols2 })).rejects.toBeTruthy();
      await expect(profileSchema.validateAt('display_name', { display_name: invalidSymbols3 })).rejects.toBeTruthy();
      await expect(profileSchema.validateAt('display_name', { display_name: validSymbols })).resolves.toBeTruthy();
    });

    test('display name should not accept cyrillic', async () => {
      await expect(profileSchema.validateAt('display_name', { display_name: 'абвгдеёжз' })).rejects.toBeTruthy();
    });

    test('display name should accept a valid value', async () => {
      const validValue = 'N1ck_name';
      await expect(profileSchema.validateAt('display_name', { display_name: validValue })).resolves.toBeTruthy();
    });
  });
});
