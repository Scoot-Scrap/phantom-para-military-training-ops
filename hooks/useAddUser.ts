import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useAddUser() {
  const queryClient = useQueryClient()
  return useMutation(
    (newUser: { name: string }) =>
      fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      }).then((res) => res.json()),
    {
      onMutate: async (newUser) => {
        await queryClient.cancelQueries(['users'])
        const previous = queryClient.getQueryData(['users'])
        queryClient.setQueryData(['users'], (old: any[]) => [...(old || []), newUser])
        return { previous }
      },
      onError: (_err, _user, context: any) => {
        if (context?.previous) {
          queryClient.setQueryData(['users'], context.previous)
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(['users'])
      },
    }
  )
}