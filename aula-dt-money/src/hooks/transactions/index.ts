import { createTransaction, getTransactions, deleteTransaction, updateTransaction } from "@/services/transactions"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ITransaction } from "@/types/transaction";

const QUERY_KEY = 'qkTransaction'

const Create = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
    }
  })
}

const ListAll = (skip = 0, take = 10) => {
  return useQuery({ queryKey: [QUERY_KEY, skip, take], queryFn: () => getTransactions(skip, take)})
}

const Delete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
    }
  })
}

const Update = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({id, transaction}: {id: string, transaction: ITransaction}) => updateTransaction(id, transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
    }
  })
}

export const useTransaction = {
    Create,
    ListAll,
    Delete,
    Update,
}

