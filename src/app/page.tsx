import FormNewPost from '@/components/form-new-post';
import { useSession } from 'next-auth/react';

export default function Home() {

  return (
    <main className='max-w-4xl mx-auto my-5'>
      <FormNewPost />
    </main>
  );
}
