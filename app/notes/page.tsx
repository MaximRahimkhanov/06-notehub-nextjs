// import NoteList from '@/components/NoteList/NoteList';
// import { getNotes } from '@/lib/api';

// const Notes = async () => {
//   //   const response = await getNotes();

//   return (
//     <section>
//       <h1>Notes List</h1>
//       {/* {response?.notes?.length > 0 && <NoteList notes={response.notes} />} */}
//     </section>
//   );
// };

// export default Notes;

import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  const search = '';
  const page = 1;
  const perPage = 12;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', search, page],
    queryFn: () => fetchNotes(search, page, perPage),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
