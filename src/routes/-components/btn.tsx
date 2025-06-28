import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, ...props }, ref) => (
        <button
            ref={ref}
            className={
                [
                    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors cursor-pointer disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2",
                    className
                ].filter(Boolean).join(" ")
            }
            {...props}
        />
    )
);
Button.displayName = "Button";
