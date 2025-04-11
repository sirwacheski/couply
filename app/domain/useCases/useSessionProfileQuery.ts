import { SessionAtom } from "@atoms";
import { useAtomValue } from "jotai";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@infra/constants/queries";
import { useProfileRepository } from "@infra/repositories/ProfileRepository";

type Options = {
  refetchOnMount?: boolean;
}

export function useSessionProfileQuery(options?: Options) {
  const { user } = useAtomValue(SessionAtom);

  const queryKey = [QueryKeys.PROFILE, user?.id];

  const query = useQuery({
    enabled: !!user,
    initialData: null,
    queryKey: queryKey,
    refetchOnMount: options?.refetchOnMount ?? true,
    async queryFn() {
      const repository = useProfileRepository();
      const { data, error } = await repository.getOneByUserId(user?.id!);

      if(error != null) {
        const { code } = error;
        
        if(code === "PGRST116") {
          return null;
        }

        throw new Error(error.message);
      }

      return data ? data : null;
    }
  });

  return {
    ...query,
    queryKey: queryKey,
  }
}