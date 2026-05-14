import Profile from '@/components/Profile';
import { useUpdateUser } from '@/hooks/user';

const ProfilePage: React.FC = () => {
  const {
    user,
    formData: formDataPersonalData,
    onChangeFormData: onChangeFormDataPersonalData,
    onSubmit: onSubmitPersonalData,
    loading: loadingPersonalData,
    error: errorPersonalData,
  } = useUpdateUser();
  const {
    formData: formDataFinancialData,
    onChangeFormData: onChangeFormDataFinancialData,
    onSubmit: onSubmitFinancialData,
    loading: loadingFinancialData,
    error: errorFinancialData,
  } = useUpdateUser();
  return (
    <Profile
      email={user?.email ?? ''}
      formDataPersonalData={formDataPersonalData}
      onChangeFormDataPersonalData={onChangeFormDataPersonalData}
      onSubmitPersonalData={onSubmitPersonalData}
      loadingPersonalData={loadingPersonalData}
      errorPersonalData={errorPersonalData}
      formDataFinancialData={formDataFinancialData}
      onChangeFormDataFinancialData={onChangeFormDataFinancialData}
      onSubmitFinancialData={onSubmitFinancialData}
      loadingFinancialData={loadingFinancialData}
      errorFinancialData={errorFinancialData}
    />
  );
};

export default ProfilePage;
