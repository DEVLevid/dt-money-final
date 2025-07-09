export interface IBodyContainerProps {
    children: React.ReactNode;
}
export function BodyContainer({ children }: IBodyContainerProps) {
  return (
    <div className="mx-auto max-w-[1120px] -mt-16">
        {children}
    </div>
  )
}