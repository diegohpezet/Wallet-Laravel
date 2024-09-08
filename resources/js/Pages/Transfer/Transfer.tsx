import { Head, usePage } from '@inertiajs/react';
import { PageProps, TransferInterface } from '@/types';
import { AccountProvider } from '@/Hooks/AccountProvider';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import History from './History';
import SelectAccount from './SelectAccount';
import AccountDetails from './AccountDetails';

type TransferProps = PageProps & {
  transfers: TransferInterface[];
}

export default function Transfer({ auth }: PageProps) {
  const { transfers } = usePage<TransferProps>().props;

  return (
    <AuthenticatedLayout
      user={auth.user}
    >
      <Head title="Transfer" />

      <AccountProvider>
        <SelectAccount />
        <History transfers={transfers} currentUser={auth.user}/>

        <AccountDetails /> {/* Render modal */}
      </AccountProvider>

    </AuthenticatedLayout >
  );
}
