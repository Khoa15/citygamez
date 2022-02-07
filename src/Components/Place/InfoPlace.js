import {Dialog, DialogContent, DialogTitle, Table, TableBody, TableCell, TableRow} from '@mui/material'
import { useEffect, useState } from 'react'
import ItemInfoPlace from './ItemInfoPlace'
export default function InfoPlace(props){
    return(
        <Dialog open={props.open} onClose={props.close}>
            <DialogTitle>Info Place</DialogTitle>
            <DialogContent>
                <Table>
                    <TableBody>
                        {
                            props.info && (
                            <>
                                <ItemInfoPlace name="Name" value={props.info.name} />
                                <ItemInfoPlace name="Level" value={props.info.level+1} upLevel={props.upLevel} inUpLevel={props.inUpLevel} />
                                {props.info.resource&&(<ItemInfoPlace name="Productive" value={props.info.resource.coefficient} />)}
                                {props.info.resource && (
                                    <>
                                        <ItemInfoPlace name="Food" value={props.info.resource.food} />
                                        <ItemInfoPlace name="Gold" value={props.info.resource.gold} />
                                        <ItemInfoPlace name="Energy" value={props.info.resource.energy} />
                                        <ItemInfoPlace name="Army" value={props.info.resource.army} />
                                        <ItemInfoPlace name="Labor" value={props.info.resource.labor} />
                                        <ItemInfoPlace name="Gem" value={props.info.resource.gem} />
                                    </>
                                )}
                            </>
                            
                            )
                        }
                    </TableBody>
                </Table>
            </DialogContent>
        </Dialog>
    )
}