'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient()
interface IProvidersProps {
    children: ReactNode;
}
export function Providers({ children}: IProvidersProps) {
    //const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}