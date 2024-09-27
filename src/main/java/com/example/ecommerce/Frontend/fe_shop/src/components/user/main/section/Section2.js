import React from 'react'
import { Card, Typography} from '@mui/material';
import CardContent from '@mui/joy/CardContent';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import BiotechIcon from '@mui/icons-material/Biotech';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Col, Container, Row } from 'reactstrap';

export default function Section2() {
  return (
    <div>
      <Container>
        <h2>Categories</h2>
                    <Row uk-grid uk-scrollspy="cls: uk-animation-fade; target: .col-6; delay: 200; repeat: true">
                        <Col lg="3" md="4" xs="6" sm="6" >
                            <Card variant="plain">
                                <CardContent>
                                    <SportsBasketballIcon></SportsBasketballIcon>
                                </CardContent>
                                <CardContent>
                                <Typography level="title-md">Sport</Typography>
                                <Typography >
                                    Videos about football, basketball, volleyball, swimming, running,...
                                </Typography>
                                </CardContent> 
                            </Card>
                        </Col>
                        <Col lg="3" md="4" xs="6" sm="6">
                            <Card variant="plain">
                                <CardContent>
                                    <SportsEsportsIcon></SportsEsportsIcon>
                                </CardContent>
                                <CardContent>
                                <Typography level="title-md">Game</Typography>
                                <Typography>
                                    Videos replay games, trailer game, story of game,...
                                </Typography>
                                </CardContent> 
                            </Card>
                        </Col>
                        <Col lg="3" md="4" xs="6" sm="6">
                            <Card variant="plain">
                                <CardContent>
                                    <CardContent>
                                        <LiveTvIcon></LiveTvIcon>
                                    </CardContent>
                                <Typography level="title-md">Movie</Typography>
                                <Typography>
                                    All type of movie like action, comedy, cartoon,... or trailer new movie release...
                                </Typography>
                                </CardContent> 
                            </Card>
                        </Col>
                        <Col lg="3" md="4" xs="6" sm="6">
                            <Card variant="plain">
                                    <CardContent>
                                        <BiotechIcon></BiotechIcon>
                                    </CardContent>
                                <CardContent>
                                <Typography level="title-md">Documentary</Typography>
                                <Typography>
                                A type of video about scientific topics related to humans such as history, science, universe,...
                                </Typography>
                                </CardContent> 
                            </Card>
                        </Col>
                        <Col lg="3" md="4" xs="6" sm="6">
                            <Card variant="plain">
                                    <CardContent>
                                        <NewspaperIcon></NewspaperIcon>
                                    </CardContent>
                                <CardContent>
                                <Typography level="title-md">News</Typography>
                                <Typography>
                                    Videos about news in the word about finance, war, medical,...
                                </Typography>
                                </CardContent> 
                            </Card>
                        </Col>
                        <Col lg="3" md="4" xs="6" sm="6">
                            <Card variant="plain">
                                    <CardContent>
                                        <AutoAwesomeIcon></AutoAwesomeIcon>
                                    </CardContent>
                                <CardContent>
                                <Typography level="title-md">Entertainment</Typography>
                                <Typography>
                                    All of videos entertaining include comedy movie, cartoon, TV show,...
                                </Typography>
                                </CardContent> 
                            </Card>
                        </Col>
                        <Col lg="3" md="4" xs="6" sm="6">
                            <Card variant="plain">
                                    <CardContent>
                                        <AudiotrackIcon></AudiotrackIcon>
                                    </CardContent>
                                <CardContent>
                                <Typography level="title-md">Music</Typography>
                                <Typography>
                                    Music and Music video
                                </Typography>
                                </CardContent> 
                            </Card>
                        </Col>
                        <Col lg="3" md="4" xs="6" sm="6">
                            <Card variant="plain">
                                    <CardContent>
                                        <AutoStoriesIcon></AutoStoriesIcon>
                                    </CardContent>
                                <CardContent>
                                <Typography level="title-md">Education</Typography>
                                <Typography>
                                    Type of Video about educate: dev program, pronounce for kids,...
                                </Typography>
                                </CardContent> 
                            </Card>
                        </Col>
                    </Row>
                </Container>
    </div>
  )
}
