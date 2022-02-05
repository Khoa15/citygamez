import { TableRow,TableCell, IconButton, Tooltip } from "@mui/material";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
export default function ItemInfoPlace(props){
    return(
        <>
        {
            props.value !==0 && (
            <TableRow>
                <TableCell>{props.name}</TableCell>
                <TableCell>{props.value}
                {
                    props.name === "Level" && (
                        <Tooltip title="You must have least 5 labor and 10 energy to upgrade this place">
                            <IconButton>
                                <ArrowDropUpIcon/>
                            </IconButton>
                        </Tooltip>
                    )
                }
                </TableCell>
            </TableRow>
            )
        }
        </>
    )
}