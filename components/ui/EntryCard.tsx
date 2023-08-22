import { UIContext } from '@/context/ui';
import { Entry } from '@/interfaces';
import { dateUtil } from '@/util';
import { Card, CardActions, CardActionArea, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { DragEvent, FC, useContext } from 'react';

interface Props {
    entry: Entry
}

export const EntryCard:FC<Props> = ({entry}) => {

    const {startDragging, endDragging} = useContext(UIContext);
    const router = useRouter();

    const onDragStart = (event:DragEvent ) => {
        
        event.dataTransfer.setData('text', entry._id);
        
        startDragging();

    }

    const onDragEnd = () => {
        endDragging();
    }

    const onClicked = () => {
        router.push(`/entries/${entry._id}`);
    }

  return (
    <Card
        onClick={onClicked}
        sx={{marginBottom: 1}}
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
    >
        <CardActionArea>
            
            <CardContent>
                <Typography sx={{whiteSpace:'pre-line'}}>{entry.description}</Typography>                
            </CardContent>

            <CardActions sx={{display:'flex', justifyContent: 'end', paddingRight:'2'}}>
                <Typography variant='body2'>{dateUtil.getFormatDistanceToNow(entry.createdAt)}</Typography>
            </CardActions>
        </CardActionArea>

    </Card>
  )
}
