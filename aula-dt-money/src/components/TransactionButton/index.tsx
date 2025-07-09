import Image from "next/image";

export interface TransactionButtonProps {
   type: "INCOME" | "OUTCOME"; 
   isSelected: boolean;
   onClick?: () => void;
}
export function TransactionButton({type, isSelected , onClick}: TransactionButtonProps) {
    const isIncome =  type === 'INCOME' 
    const icon = isIncome
        ? '/income.png' 
        : '/outcome.png'     
    const bgColor = isSelected
        ? isIncome
            ? "bg-income/10"
            : 'bg-outcome/10'
        : 'bg-white'
        
    const title : string = isIncome ? 'Entrada' : 'Saída'    
    return (
        <div className={`flex flex-col h-[56px] w-[236px] rounded-md ${bgColor} border-[1.5px] border-transaction-border cursor-pointer`} onClick={onClick}>
            <div className="flex flew-row justify-center align-middle items-center px-8 py-4 gap-1">
                <Image src={icon} alt={title} width={24} height={24} />
                <span className={`text-base font-normal leading-4 text-title`}>{title}</span>                
            </div>            
        </div>
    ) 
}   