import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const MainContainer = styled(Container)`
  margin: ${({ theme }) => theme.spacing(4)}px auto;
`

const VideoWrapper = styled.div`
  position: relative;
	padding-bottom: 56.25%; /* 16:9 */
	padding-top: 25px;
	height: 0;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

const Description = styled(Typography)`
`

const Video = ({ url }) => {
  return (
    <VideoWrapper>
      <iframe
        src={url}
        frameBorder="0"
        allowFullScreen
        title="profile-video-embed"
      />
    </VideoWrapper>
  )
}

const About = ({ videoUrl, description }) => {
  const videoEmbedUrl = videoUrl
  ? `https://www.youtube-nocookie.com/embed/${(new URL(videoUrl)).searchParams.get("v")}`
  : null

  const useStyles = makeStyles(theme => ({
    cardContent: {
      margin: theme.spacing(2)
    }
  }));

  const classes = useStyles();

  return (
    <MainContainer maxWidth="sm">
      <Card variant="outlined">
        {videoEmbedUrl &&
          <CardContent className={classes.cardContent}>
            <Video url={videoEmbedUrl}/>
          </CardContent>
        }
        <CardContent className={classes.cardContent}>
          <Description variant="body1" dangerouslySetInnerHTML={{ __html: description }} />
        </CardContent>
      </Card>
    </MainContainer>
  )
}

About.propTypes = {
  videoUrl: PropTypes.string,
  description: PropTypes.string
}

export default About;
