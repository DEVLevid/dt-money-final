import { ITotal } from "@/types/transaction";
import { Card } from "../Card";

export interface ICardContainerProps {
  totals: ITotal
}

export function CardContainer({ totals }: ICardContainerProps){
    const { totalIncome, totalOutcome, total } = totals;

    return (
        <div className="flex justify-between">          
          <Card title="Entradas" value={totalIncome} type="income" />
          <Card title="Saídas" value={totalOutcome} type="outcome" />
          <Card title="Total" value={total} type="total" />
        </div>
    )
}