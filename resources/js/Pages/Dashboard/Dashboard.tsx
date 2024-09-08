import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Balance from './Balance';
import { Head, usePage } from '@inertiajs/react';
import { PageProps, TransferInterface } from '@/types';
import Recent from './Recent';

type DashboardProps = PageProps & {
  transfers: TransferInterface[];
}

export default function Dashboard({ auth }: PageProps) {
  const { transfers } = usePage<DashboardProps>().props;

  return (
    <AuthenticatedLayout
      user={auth.user}
    >
      <Head title="Dashboard" />

      <Balance balance={auth.user.balance} />
      <Recent currentUser={auth.user} transfers={transfers} />

    </AuthenticatedLayout>
  );
}
