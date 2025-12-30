import { useQueryClient } from "@tanstack/react-query";

const invalidateQueries = (
  queryClient: ReturnType<typeof useQueryClient>,
  queries: Parameters<typeof queryClient.invalidateQueries>[]
) => {
  queries.forEach((query) => queryClient.invalidateQueries(...query));
};

export default invalidateQueries;
