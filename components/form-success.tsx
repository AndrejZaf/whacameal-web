import { CheckCircle2 } from "lucide-react";

const FormSuccess = ({ message }: { message?: string }) => {
    if (!message) {
        return null;
    }

    return (
        <div className="bg-green-400/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-green-700">
            <CheckCircle2 className="h-4 w-4" />
            <p>{message}</p>
        </div>
    );
};
export default FormSuccess;