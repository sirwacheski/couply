import { QueryKeys } from "@infra/constants/queries";
import { useMuralRepository } from "@infra/repositories/MuralRepository";
import { useQuery } from "@tanstack/react-query";

export function useInviteListQuery(profileId?: string) {
  const key = [QueryKeys.INVITES, profileId];

  const query = useQuery({
    queryKey: key,
    enabled: !!profileId,
    initialData: [],

    async queryFn() {
      const repository = useMuralRepository();
      const { data, error } = await repository.getInvitesByProfile(profileId!);

      if(error) {
        throw new Error(error.message);
      }

      return data;
    },
  });

  return {
    queryKey: key,
    ...query,
  }
}