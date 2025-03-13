import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@infra/constants/queries";
import { useProfileRepository } from "@infra/repositories/ProfileRepository";

export function useProfileQuery(id: string) {
  const queryKey = [QueryKeys.PROFILE, id];

  const query = useQuery({
    queryKey: queryKey,
    initialData: undefined,

    async queryFn() {
      const userRepository = useProfileRepository();
      const { data, error } = await userRepository.getOneById(id);

      if(error != null) {
        throw new Error(error.message!);
      }

      return data ? data : null;
    }
  });

  return {
    ...query,
    queryKey,
  }
}