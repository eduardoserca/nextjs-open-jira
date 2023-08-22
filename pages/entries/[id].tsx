import { ChangeEvent, FC, useMemo, useState, useContext } from 'react';

import { Layout } from "@/components/layouts";
import {Entry, EntryStatus } from "@/interfaces";

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { capitalize, Grid, Card, CardHeader, CardContent, TextField, 
    CardActions, Button, FormControl, FormLabel, RadioGroup, 
    FormControlLabel, Radio, IconButton } from '@mui/material';

import { dateUtil, isValidObjectIdMongo } from "@/util";

import { GetServerSideProps } from 'next';
import { entryService } from "@/service";
import { EntriesContext } from "@/context/entries";

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
    entry: Entry;
}

const EntryPage:FC<Props> = ({entry}) => {

    const {updateEntry} = useContext(EntriesContext);
    
    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState( entry.status );
    const [touched, setTouched] = useState(false);

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

    const onInputValueChanged = ( event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setStatus(event.target.value as EntryStatus);
    }

    const onSave = () => {
        if( inputValue.trim().length === 0 ) return;

        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue
        }
        
        updateEntry(updatedEntry, true);
    }


  return (
    <Layout title={inputValue.substring(0.20) + '...'}>
        <Grid
            container
            justifyContent='center'
            sx={{marginTop: 2}}
        >
            <Grid item xs={12} md={6}>
                <Card>
                    <CardHeader 
                        title={`Entrada: `}
                        subheader={`Creada ${ dateUtil.getFormatDistanceToNow(entry.createdAt) }`}
                    />

                    <CardContent>
                        <TextField
                            sx={{marginTop:2, marginBottom:1}}
                            fullWidth
                            placeholder="Nueva entrada"
                            autoFocus
                            multiline
                            label="Nuevo entrada"
                            value={inputValue}
                            onChange={onInputValueChanged}
                            onBlur={()=> setTouched(true)}
                            helperText={ isNotValid && 'Ingrese un valor'}
                            error = {isNotValid}
                        />

                        <FormControl>
                            <FormLabel>Estado:</FormLabel>
                            <RadioGroup 
                                row
                                value={status}
                                onChange={onStatusChanged}
                                >
                                {
                                    validStatus.map(option => (
                                        <FormControlLabel
                                            key={option}
                                            value={option}
                                            control={<Radio/>}
                                            label= {capitalize(option) }
                                        />

                                        
                                    ))
                                }

                            </RadioGroup>
                        </FormControl>

                    </CardContent>

                    <CardActions>
                        <Button
                            startIcon={<SaveOutlinedIcon/>}
                            variant="contained"
                            fullWidth
                            onClick={onSave}
                            disabled = {inputValue.length <= 0 }
                        >
                            Save

                        </Button>

                    </CardActions>

                </Card>

            </Grid>

        </Grid>

        <IconButton sx={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            backgroundColor: 'error.dark'

        }}
            
        >
            <DeleteOutlinedIcon/>
        </IconButton>

    </Layout>
  );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    
    const { id } = ctx.params as { id: string };    
    if( !isValidObjectIdMongo(id) ) {
        return {
            redirect:{
                destination: '/',
                permanent: false,
            }
        }
    }

    const entry = await entryService.getEntryById(id);    

    return {
        props: {
            entry
        }
    }
}

export default EntryPage

