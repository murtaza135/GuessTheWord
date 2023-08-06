type Props = {
  children: React.ReactNode;
};

export default function Card({ children }: Props) {
  return (
    <section className='bg-gray-50 dark:bg-gray-900 text-black dark:text-white rounded-md px-8 py-6'>
      {children}
    </section>
  );
}
