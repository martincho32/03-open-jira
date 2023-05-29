import { Card, Typography, CardContent, CardActionArea, CardActions } from '@mui/material';
import { Entry } from '@/interfaces';
import { FC, DragEvent, useContext } from 'react';
import { UIContext } from '@/context/ui';
import { useRouter } from 'next/router';
import { dateFunctions } from '@/utils';


interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {

  const { startDragging, endDragging } = useContext( UIContext )
  const { description, createdAt } = entry;
  


  const router = useRouter();
  
  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('text', entry._id);
    startDragging();
  }

  const onDragEnd = () => {
    endDragging();
  }

  const onClick = () => {
    router.push(`/entries/${ entry._id }`)
  }

  return (
    <Card
      sx={{ marginBottom: 1 }}
      // Eventos de drag
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={ onClick }
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{ description }</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2'>
            Hace { dateFunctions.getFormatDistanceToNow( createdAt ) }
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
