import {useContext} from 'react';

import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"

import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import { UIContext } from '@/context/ui';

const menuItems: string[] = ['Inbox','Starreed', 'Send Email', 'Drafts'];

export const Sidebar = () => {

    const { sidemenuOpen, closeSideMenu } = useContext(UIContext);



  return (
    <Drawer 
        anchor="left"
        open={sidemenuOpen}
        onClose={closeSideMenu}
    >

        <Box sx={{ width:250}}>

            <Box sx={{padding:'5px'}}>
                <Typography variant="h4">Menú</Typography>
            </Box>

            <List>
                {
                    menuItems.map( (text, index)=> (
                        <ListItem key={text} >
                            <ListItemIcon>
                                {index % 2 ? <InboxOutlinedIcon/> : <MailOutlineIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                            
                        </ListItem>
                    ) )
                }
            </List>

            <Divider/>

            <List>
                {
                    menuItems.map( (text, index)=> (
                        <ListItem key={text} >
                            <ListItemIcon>
                                {index % 2 ? <InboxOutlinedIcon/> : <MailOutlineIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                            
                        </ListItem>
                    ) )
                }
            </List>

        </Box>

        

    </Drawer>
  )
}
