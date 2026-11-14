import { fetchNoteById } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';

interface NoteDetailsProps {
  id: string;
}

export default async function NoteDetails({ id }: NoteDetailsProps) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['SingleNote', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}
