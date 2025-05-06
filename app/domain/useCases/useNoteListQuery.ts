import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@infra/constants/queries";
import { useNoteRepository } from "@infra/repositories/NoteRepository";

export function useNoteListQuery(muralId: string | undefined, search?: string) {
  const queryKey = [QueryKeys.NOTES, muralId, search]

  const query = useQuery({
    initialData: [],
    queryKey: queryKey,
    enabled: !!muralId,
    async queryFn() {
      const repository = useNoteRepository();
      const { data, error } = await repository.getManyByMuralId(muralId!, search);

      if(error) {
        throw new Error(error.message);
      }

      return data;
    }
  });

  return {
    ...query,
    queryKey,
  }
}