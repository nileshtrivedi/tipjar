import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types"
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import { rgbToRgba } from "utils"

const MainContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(8)}px;
`

const BannerImage = styled.div`
  position: relative;
  height: 200px;
  width: 100%;
  background-image: url(${({ imageUrl }) => imageUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  
  ${({ theme }) => theme.breakpoints.up('md')} {
    height: 500px;
  }
`

const Gradient = styled.div`
  ${({ theme }) => `
    background: linear-gradient(0deg, ${rgbToRgba(theme.palette.common.black, 0.6)} 0%, ${rgbToRgba(theme.palette.common.black, 0)} 50%);
  `}

  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
`

const ProfileContainer = styled(Container)`
  position: relative;
  top: -100px;
  margin-bottom: -100px;
  display: grid;
  grid-template-columns: 1fr;

  ${({ theme }) => theme.breakpoints.up('md')} {
    top: -150px;
    margin-bottom: -150px;
    grid-template-columns: 300px 1fr;
  }
`

const ProfileImage = styled.div`
  background-image: url(${({ imageUrl }) => imageUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  height: 150px;
  width: 150px;
  border: 2px solid white;
  justify-self: center;
  align-self: start;

  ${({ theme }) => theme.breakpoints.up('md')} {
    justify-self: start;
    height: 300px;
    width: 300px;
  }
`

const TitleWrapper = styled.div`
  display: grid;
`

const Name = styled.h1`
  font-family: "Playfair Display", serif;
  font-weight: 500;    
  font-size: 2.5rem;
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;

  ${({ theme }) => theme.breakpoints.up('md')} {
    text-align: right;
    font-size: 4rem;
    font-weight: 500;
    margin-top: 150px;
    margin-bottom: 0;
  }
`
const Short = styled(Typography)`
  text-align: center;

  ${({ theme }) => theme.breakpoints.up('md')} {
    text-align: right;
  }
`

const Hero = ({
  bannerImageUrl,
  profileImageUrl,
  name,
  short,
}) => {
return (
    <MainContainer>
      <BannerImage imageUrl={bannerImageUrl}>
        <Gradient/>
      </BannerImage>
      <ProfileContainer>
        <ProfileImage imageUrl={profileImageUrl} />
        <TitleWrapper>
          <Name>{name}</Name>
          <Short variant="h5" color="textSecondary">{short}</Short>
        </TitleWrapper>
      </ProfileContainer>
    </MainContainer>
  )
}

Hero.propTypes = {
  bannerImageUrl: PropTypes.string,
  profileImageUrl: PropTypes.string,
  name: PropTypes.string,
  short: PropTypes.string,
}

export default Hero