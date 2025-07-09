import { TransactionButton } from "../TransactionButton";

export interface TransactionSwitcherProps {
    type: 'INCOME' | 'OUTCOME';
    setType: (type: 'INCOME' | 'OUTCOME') => void;
}

export function TransactionSwitcher({type, setType }: TransactionSwitcherProps) {
    const isIncome = type === 'INCOME';
    return (
        <div className="flex flex-row justify-between w-full gap-4 ">
            <TransactionButton type="INCOME" isSelected={isIncome} onClick={() => setType("INCOME")} />
            <TransactionButton type="OUTCOME" isSelected={!isIncome} onClick={() => setType("OUTCOME")}/>
        </div>
    )
}