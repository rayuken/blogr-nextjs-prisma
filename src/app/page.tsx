import MyBlogList from '@/components/my-blog.list';
import FormNewPost from '@/components/form-new-post';

export default function Home() {

  return (
    <main className='max-w-4xl mx-auto my-5'>
      <FormNewPost />
      <MyBlogList />
    </main>
  );
}
