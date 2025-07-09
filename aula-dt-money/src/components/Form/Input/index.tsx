import { InputHTMLAttributes } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    // Add any additional props here
}

export function Input(props:IInputProps){
    return (
        <input {...props} className="w-full h-16 px-6 py-y bg-background text-input text-normal border-1 border-input-border rounded-md placeholder-input focus:outline-none focus:border-primary" />
    )
}