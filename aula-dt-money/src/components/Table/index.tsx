import { ITransaction } from "@/types/transaction";
import { formatCurrency, formatDate } from "@/utils";
import { useState } from "react";
import { useTransaction } from "@/hooks/transactions";
import { FormModal } from "@/components/FormModal";

export interface ITableProps {
    data: ITransaction[]
}

export function Table({data}: ITableProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [editTransaction, setEditTransaction] = useState<ITransaction | null>(null);
    const { mutateAsync: deleteTransaction } = useTransaction.Delete();
    const { mutateAsync: updateTransaction } = useTransaction.Update();

    const handleDelete = async () => {
        if (selectedId) {
            await deleteTransaction(selectedId);
            setShowModal(false);
            setSelectedId(null);
        }
    };

    const handleEdit = (transaction: ITransaction) => {
        setEditTransaction(transaction);
    };

    const handleUpdate = async (transaction: ITransaction) => {
        if (editTransaction && editTransaction.id) {
            await updateTransaction({ id: editTransaction.id, transaction });
            setEditTransaction(null);
        }
    };

    return (  
        <>
        <table className="w-full mt-16 border-0 border-separate border-spacing-y-2 ">
        <thead>
            <tr>
                <th className="px-4 text-left text-table-header text-base font-medium">Título</th>
                <th className="px-4 text-left text-table-header text-base font-medium">Preço</th>
                <th className="px-4 text-left text-table-header text-base font-medium">Categoria</th>
                <th className="px-4 text-left text-table-header text-base font-medium">Data</th>
                <th className="px-4 text-left text-table-header text-base font-medium">Ações</th>
            </tr>
        </thead>
        <tbody>
            {data.map((transaction, index) => (
                <tr key={index} className="bg-white h-16 rounded-lg">
                    <td className="px-4 py-4 whitespace-nowrap text-title">{transaction.title}</td>
                    <td className={`px-4 py-4 whitespace-nowrap text-right ${transaction.type === 'INCOME'? "text-income" : "text-outcome"}`}>{formatCurrency(transaction.price)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-table">{transaction.category}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-table">{transaction.data ? formatDate(new Date(transaction.data)) : ''}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-table flex gap-2">
                        <button
                            className="text-blue-500 hover:text-blue-700 font-bold"
                            onClick={() => handleEdit(transaction)}
                        >
                            Editar
                        </button>
                        <button
                            className="text-red-500 hover:text-red-700 font-bold"
                            onClick={() => { setSelectedId(transaction.id!); setShowModal(true); }}
                        >
                            Excluir
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>    
    {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-8 max-w-sm w-full shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Confirmar exclusão</h2>
                <p className="mb-6">Tem certeza que deseja excluir esta transação?</p>
                <div className="flex justify-end gap-4">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => { setShowModal(false); setSelectedId(null); }}
                    >
                        Cancelar
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={handleDelete}
                    >
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    )}
    {editTransaction && (
        <FormModal
            formTitle="Editar Transação"
            closeModal={() => setEditTransaction(null)}
            updateTransaction={handleUpdate}
            initialValues={editTransaction}
        />
    )}
    </> 
    )
}