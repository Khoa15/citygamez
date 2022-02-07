import { Button, Card, CardActions, CardContent, CardMedia, Container, Dialog, DialogContent, DialogTitle, Grid, IconButton, Tooltip, Typography, Stack } from "@mui/material";
import { Box } from "@mui/system";
import TypeImage from "../TypeImage";
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import places from './places.json'
function Subplace(props){
    return (
        <Grid item md={12} xs={12} sx={{textOverflow: 'ellipsis'}}>
            <Tooltip title={props.name +" "+ props.value}>
                <Typography noWrap sx={{fontSize: '12px'}}>
                    {props.name}: <b>{props.value}</b>
                </Typography>
            </Tooltip>
        </Grid>
    )
}
export default function NewPlace(props){
    return(
        <Dialog open={props.open} onClose={props.close} maxWidth="md">
            <DialogTitle>Add New Place</DialogTitle>
            <DialogContent>
                <Container>
                    <Grid container spacing={2} justifyContent="space-between">
                            {places.map((place, i)=>{
                            if(!place.typeObject)return(
                            <Grid item md={2} xs={6} key={i}>
                                <Card>
                                    <TypeImage type={place.id} typeObj={2} />
                                    <CardContent sx={{height: '50px'}}>
                                        <Grid container direction={'row'}>
                                            <Grid item md={12} xs={12}>
                                                <Tooltip title={place.name}>
                                                    <Typography noWrap>
                                                        {place.name}
                                                    </Typography>
                                                </Tooltip>
                                            </Grid>
                                            <Grid item md={8} xs={12} sx={{textOverflow: 'ellipsis'}}>
                                                <Tooltip title={"Productive " + place.resource.productive}>
                                                    <Typography noWrap sx={{fontSize: '12px'}}>
                                                        Productive:
                                                    </Typography>

                                                </Tooltip>
                                            </Grid>
                                            <Grid item md={4} xs={12} sx={{textOverflow: 'ellipsis'}} >
                                                <Typography noWrap sx={{fontSize: '12px'}}>
                                                    <b>{place.resource.productive}</b>
                                                </Typography>
                                            </Grid>
                                            
                                            {place.resource.food !==0 && <Subplace name="Food" value={place.resource.food} />}
                                            {place.resource.gold !==0 && <Subplace name="Gold" value={place.resource.gold} />}
                                            {place.resource.energy !==0 && <Subplace name="Energy" value={place.resource.energy} />}
                                            {place.resource.army !==0 && <Subplace name="Army" value={place.resource.army} />}
                                            {place.resource.labor !==0 && <Subplace name="Labor" value={place.resource.labor} />}
                                            
                                        </Grid>
                                    </CardContent>
                                    <CardActions>
                                        <Stack direction="row" justifyContent="space-between" spacing={2}>
                                            <IconButton onClick={()=>props.clickBuy(place.id)}>
                                                <AddIcon />
                                            </IconButton>
                                            <IconButton>
                                                <InfoIcon />
                                            </IconButton>

                                        </Stack>
                                    </CardActions>
                                </Card>
                            </Grid>
                                )
                            })}
                    </Grid>
                </Container>
            </DialogContent>
        </Dialog>
    )
}