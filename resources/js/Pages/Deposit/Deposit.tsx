import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import PromoCode from './PromoCode';
import CardDetails from './CardDetails';

export default function Transfer({ auth }: PageProps) {

  return (
    <AuthenticatedLayout
      user={auth.user}
    >
      <Head title="Deposit" />

      <CardDetails />
      <PromoCode />
      
    </AuthenticatedLayout >
  );
}
