import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GameIcon from '../../assets/Game_icon.png';
import MovieIcon from '../../assets/Movie_icon.png';
import BookIcon from '../../assets/Book_icon.png';
import Box from '@mui/material/Box';

const HomepageCards = () => {
    return (
        <Box className="homepage-cards"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '50px',
                padding: { xs: '80px 30px', md: '150px 30px' },
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'center', md: 'stretch' }
            }}>
            {/*https://mui.com/material-ui/react-card/*/}
            <Card sx={{ maxWidth: '350px', textAlign: 'center', borderRadius: 2, boxShadow: 5, flex: 1 }}>
                <CardContent sx={{ paddingTop: '30px' }}>
                    <img src={GameIcon} alt="game icon" style={{ height: '100px', widht: '100px', margin: '20px' }} />
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: '28px' }}>
                        Let's Play!
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '16px', height: '70px' }}>
                        Discover exciting games and epic adventures waiting for you!
                    </Typography>
                </CardContent>
                <CardActions sx={{ textAlign: 'center', justifyContent: 'center', padding: '10px 20px 50px 20px' }}>
                    <Button variant="contained"
                        href="/products/games"
                        sx={{
                            backgroundColor: '#FAD25B',
                            color: '#282120',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            width: '150px',
                            height: '50px',
                            padding: '10px'
                        }}>
                        Explore Games
                    </Button>
                </CardActions>
            </Card>
            <Card sx={{ maxWidth: '350px', textAlign: 'center', borderRadius: 2, boxShadow: 5, flex: 1 }}>
                <CardContent sx={{ paddingTop: '30px' }}>
                    <img src={MovieIcon} alt="movie icon" style={{ height: '100px', widht: '100px', margin: '20px' }} />
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: '28px' }}>
                        Movie Time!
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '16px', height: '70px' }}>
                        From blockbusters to hidden gems, find movies you'll love!
                    </Typography>
                </CardContent>
                <CardActions sx={{ textAlign: 'center', justifyContent: 'center', padding: '10px 20px 50px 20px' }}>
                    <Button variant="contained"
                        href="/products/movies"
                        sx={{
                            backgroundColor: '#FAD25B',
                            color: '#282120',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            width: '150px',
                            height: '50px',
                            padding: '10px'
                        }}>
                        Explore Movies
                    </Button>
                </CardActions>
            </Card>
            <Card sx={{ maxWidth: '350px', textAlign: 'center', borderRadius: 2, boxShadow: 5, flex: 1 }}>
                <CardContent sx={{ paddingTop: '30px' }}>
                    <img src={BookIcon} alt="book icon" style={{ height: '100px', widht: '100px', margin: '20px' }} />
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: '28px' }}>
                        Grab a Story!
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '16px', height: '70px' }}>
                        Dive into worlds, adventures, and ideas - your next favourite read awaits!
                    </Typography>
                </CardContent>
                <CardActions sx={{ textAlign: 'center', justifyContent: 'center', padding: '10px 20px 50px 20px' }}>
                    <Button variant="contained"
                        href="/products/books"
                        sx={{
                            backgroundColor: '#FAD25B',
                            color: '#282120',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            width: '150px',
                            height: '50px',
                            padding: '10px'
                        }}>
                        Explore Books
                    </Button>
                </CardActions>
            </Card>
        </Box>

    );
}

export default HomepageCards;