'use client';
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { RotateCw } from 'lucide-react';

type btnSize = "default" | "lg" | "sm";

type SubmitButtonProps = {
  className?: string;
  size?: btnSize;
  text: string;
};
export const SubmitButton = ({ className, size, text }: SubmitButtonProps) => {
    const { pending } = useFormStatus();
    return (
    <Button
    disabled={pending}
    type="submit" 
    size={size} 
    className={`${className} capitalize`}
    >
    {pending    
    ?<>
    <RotateCw className="animate-spin"/>
    <span>Please Wait...</span>
    </>
    :<p>{text}</p>}
    </Button>
  );
};
