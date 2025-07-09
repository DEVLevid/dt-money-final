"use client";
import { BodyContainer } from "@/components/BodyContainer";
import { CardContainer } from "@/components/CardContainer";
import { FormModal } from "@/components/FormModal";
import { Header } from "@/components/Header";
import { Table } from "@/components/Table";
import { useTransaction } from "@/hooks/transactions";
import { ITotal, ITransaction } from "@/types/transaction";
import { useMemo, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const skip = (page - 1) * pageSize;
  const { data: transactions , isLoading } = useTransaction.ListAll(skip, pageSize);
  const { mutateAsync: addTransaction } = useTransaction.Create();
  const openModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddModal = (newTransaction: ITransaction) => {
    addTransaction(newTransaction);
  }

  const totalTransactions: ITotal = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return { totalIncome: 0, totalOutcome: 0, total: 0 };
    }
  
    return transactions.reduce(
      (acc: ITotal, { type, price }: ITransaction) => {
        if (type === 'INCOME') {
          acc.totalIncome += price;
          acc.total += price;
        } else if (type === 'OUTCOME') {
          acc.totalOutcome += price;
          acc.total -= price;
        }
        return acc;
      },
      { totalIncome: 0, totalOutcome: 0, total: 0 }
    );
  }, [transactions]);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <ToastContainer />
      <Header openModal={openModal} />
      <BodyContainer>
        <CardContainer totals={totalTransactions} />
        <Table data={transactions} />
        <div className="flex justify-center gap-4 my-8">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Anterior
          </button>
          <span>Página {page}</span>
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setPage((p) => (transactions && transactions.length === pageSize ? p + 1 : p))}
            disabled={!transactions || transactions.length < pageSize}
          >
            Próxima
          </button>
        </div>
        { isModalOpen && <FormModal closeModal={handleCloseModal} formTitle="Adicionar Transação" addTransaction={handleAddModal} /> }
      </BodyContainer>
    </div>
  );
}
