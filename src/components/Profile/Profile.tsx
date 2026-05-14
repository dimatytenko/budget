import styles from './Profile.module.scss';
import { AccountIcon, MailIcon, DollarIcon } from '@/assets/icons';
import PageWrapper from '@/components/Layout/PageWrapper';
import { Button, Input, ErrorMessage } from '@/ui-kit';

interface ProfileInterface {
  email: string;
  formDataPersonalData: {
    firstName: string;
    lastName: string;
  };
  onChangeFormDataPersonalData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitPersonalData: () => void;
  loadingPersonalData: boolean;
  errorPersonalData: string | null;
  formDataFinancialData: {
    salary: string;
    workHoursByWeek: string;
    expectReturnPercentage: string;
    investForYear: string;
  };
  onChangeFormDataFinancialData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitFinancialData: () => void;
  loadingFinancialData: boolean;
  errorFinancialData: string | null;
}

const Profile: React.FC<ProfileInterface> = ({
  email,
  formDataPersonalData,
  onChangeFormDataPersonalData,
  onSubmitPersonalData,
  loadingPersonalData,
  errorPersonalData,
  formDataFinancialData,
  onChangeFormDataFinancialData,
  onSubmitFinancialData,
  loadingFinancialData,
  errorFinancialData,
}) => {
  return (
    <PageWrapper title="Profile" subtitle="Update your personal and financial data">
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.card_header}>
            <AccountIcon aria-hidden className={styles.card_icon} />
            <span className={styles.card_title}>Personal data</span>
          </div>

          <div className={styles.fields_row}>
            <div className={styles.email_field}>
              <span className={styles.email_label}>Email</span>
              <div className={styles.email_display}>
                <MailIcon aria-hidden className={styles.email_icon} />
                <span>{email ?? '—'}</span>
              </div>
            </div>

            <Input
              label="First Name"
              name="firstName"
              value={formDataPersonalData.firstName}
              placeholder="Enter your first name"
              onChange={onChangeFormDataPersonalData}
            />

            <Input
              label="Last Name"
              name="lastName"
              value={formDataPersonalData.lastName}
              placeholder="Enter your last name"
              onChange={onChangeFormDataPersonalData}
            />
          </div>

          <div className={styles.card_footer}>
            {errorPersonalData && <ErrorMessage message={errorPersonalData} />}

            <Button
              text="Save changes"
              className={styles.save_btn}
              onClick={onSubmitPersonalData}
              isLoading={loadingPersonalData}
              disabled={[formDataPersonalData.firstName, formDataPersonalData.lastName].every(
                (value) => !value,
              )}
            />
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.card_header}>
            <DollarIcon aria-hidden className={styles.card_icon} />
            <span className={styles.card_title}>Your Financial profile</span>
          </div>

          <div className={styles.fields_row}>
            <Input
              label="Monthly income"
              name="salary"
              value={formDataFinancialData.salary}
              placeholder="$ 4,000.00"
              onChange={onChangeFormDataFinancialData}
            />

            <Input
              label="Work hours (week)"
              name="workHoursByWeek"
              value={formDataFinancialData.workHoursByWeek}
              placeholder="40"
              onChange={onChangeFormDataFinancialData}
            />

            <Input
              label="Expected return (%)"
              name="expectReturnPercentage"
              value={formDataFinancialData.expectReturnPercentage}
              placeholder="8"
              onChange={onChangeFormDataFinancialData}
            />
            <Input
              label="Invest for (years)"
              name="investForYear"
              value={formDataFinancialData.investForYear}
              placeholder="0"
              onChange={onChangeFormDataFinancialData}
            />
          </div>

          <div className={styles.card_footer}>
            {errorFinancialData && <ErrorMessage message={errorFinancialData} />}

            <Button
              text="Save changes"
              className={styles.save_btn}
              onClick={onSubmitFinancialData}
              isLoading={loadingFinancialData}
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Profile;
