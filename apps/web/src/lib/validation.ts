import * as Yup from 'yup';

export const AddMangerSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').trim().max(50, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required')
});