import { TableRow,TableCell, IconButton, Tooltip } from "@mui/material";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
export default function ItemInfoPlace(props){
    let fixedNumber = props.value
    if(fixedNumber > 0 && fixedNumber % 1 !== 0) fixedNumber = fixedNumber.toFixed(2)
    return(
        <>
        {
            props.value!==0 && (
                <>
                    {props.value && <TableRow>
                        <TableCell>{props.name}</TableCell>
                        <TableCell>{fixedNumber}
                        {
                            props.name === "Level" && (
                                <Tooltip title="You must have least 5 labor and 10 energy to upgrade this place">
                                    <IconButton onMouseDown={props.upLevel} onMouseUp={props.inUpLevel}  >
                                        <ArrowDropUpIcon/>
                                    </IconButton>
                                </Tooltip>
                            )
                        }
                        </TableCell>
                    </TableRow>}
                </>
            )
        }
        </>
    )
}