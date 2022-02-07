import { Tooltip } from "@mui/material";

export default function NavItem(props){

    return(
        <Tooltip title={props.title}>
            <div className="nav-item">
                {props.ico}
                {parseFloat(props.value).toFixed(2)}
            </div>
        </Tooltip>
    )
}