import { Box, Tooltip } from "@mui/material";

export default function NavItem(props){

    return(
        <Tooltip title={props.title} onClick={props.save} className={props.class} id={props.name}>
            <div className="nav-item">
                {props.ico}
                {props.value && <span className="nav-value">
                    {parseFloat(props.value).toFixed(2)}
                </span>}
            </div>
        </Tooltip>
    )
}