import { Button, CircularProgress } from "@mui/material";
import { ButtonProps } from "@mui/material/Button";


interface LoadingButtonProps extends ButtonProps {
    loading: boolean;
}

export default function LoadingButton({loading, disabled, children, className,...props}: LoadingButtonProps) {
    return (
        <Button
            disabled={loading || disabled} // Disable the button if loading or explicitly disabled
            className={className} // Pass optional className
            {...props} // Spread other MUI Button props
            startIcon={
                loading && (
                    <CircularProgress
                        size={20} // Adjust the size of the spinner
                        color="inherit" // Inherit the button's text color
                    />
                )
            }
        >
            {children}
        </Button>
    );
}