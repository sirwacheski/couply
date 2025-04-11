import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@infra/constants/queries";
import { useMuralRepository } from "@infra/repositories/MuralRepository";

type Options = {
  refetchOnMount?: boolean;
}

export function useMuralQuery(profileId?: string, options?: Options) {
  const queryKey = [QueryKeys.MURAL, profileId];

  const query = useQuery({
    enabled: !!profileId,
    initialData: undefined,
    queryKey: [QueryKeys.MURAL, profileId],
    refetchOnMount: options?.refetchOnMount ?? true,
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