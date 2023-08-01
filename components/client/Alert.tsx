import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/component/ui/alert-dialog";
import { useAlert } from "@/redux/alert/alertActions";
import { memo } from "react";
   
function Alert() {

    const { open, title, text, ok, setAlert } = useAlert();
    
    return (
        <AlertDialog open={open}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>
                {text}
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAlert({open:false, title:"", text:""})}>Cancel</AlertDialogCancel>
            {ok && <AlertDialogAction onClick={() => {
                ok()
                setAlert({open:false, title:"", text:"", ok:undefined}
            )}}>Ok</AlertDialogAction>}
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
)
}

export default memo(Alert);