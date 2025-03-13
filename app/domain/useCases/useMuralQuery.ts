import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@infra/constants/queries";
import { useMuralRepository } from "@infra/repositories/MuralRepository";

export function useMuralQuery(profileId?: string) {
  const queryKey = [QueryKeys.MURAL, profileId];

  const query = useQuery({
    enabled: !!profileId,
    initialData: undefined,
    queryKey: [QueryKeys.MURAL, profileId],

    async queryFn() {
      const repository = useMuralRepository();
      const data = await repository.getOne(profileId!);

      if(data == undefined) {
        return null;
      }
      
      return data;
    }
  });

  return {
    ...query,
   queryKey
  }
}