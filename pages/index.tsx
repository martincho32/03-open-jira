import { Layout } from '@/components/layouts'
import { Grid, Card, CardHeader, CardContent } from '@mui/material'
import { EntryList, NewEntry } from '../components/ui';

export default function HomePage() {
  return (
    <Layout title='Home - OpenJira'>
      
      <Grid container spacing={ 2 }>
        
        <Grid item xs={ 12 } sm={ 4 } >
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Pendientes' />
              
              <NewEntry status='pending' />
              <EntryList status='pending' />

          </Card>  
        </Grid>
        <Grid item xs={ 12 } sm={ 4 } >
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='En progreso' />
              
            {/* <NewEntry status='in-progress' /> */}
            <EntryList status='in-progress' />

          </Card>  
        </Grid>
        <Grid item xs={ 12 } sm={ 4 } >
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Completadas' />
              
              {/* <NewEntry status='finished' /> */}
              <EntryList status='finished' />

          </Card>  
        </Grid>
        
      </Grid>
    
    </Layout>
  )
}
