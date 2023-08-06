import Card from '@/features/ui/Card';
import Letter from '@/features/ui/Letter';

export default function PlayPage() {
  return (
    <div className='h-full flex flex-col py-10 items-center justify-center'>
      <Card>
        <Letter value='A' />
      </Card>
    </div>
  );
}
