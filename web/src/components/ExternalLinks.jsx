import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import YouTubeIcon from "@material-ui/icons/YouTube";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import SvgIcon from "@material-ui/core/SvgIcon";

import { ReactComponent as TwitchIcon } from "assets/TwitchGlitchBlackOps.svg";

const ExternalLinksWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ExternalIcon = ({ Icon, ...props }) => {
  return (
    <SvgIcon style={{ padding: 2 }} {...props}>
      <Icon />
    </SvgIcon>
  );
};

const ExternalLinks = ({ sources }) => {
  if (!Array.isArray(sources)) return null;

  return (
    <ExternalLinksWrapper>
      {sources.map(({ medium, url }, index) => (
        <a
          href={url ? url : null}
          target="_blank"
          rel="noopener noreferrer"
          key={index}
        >
          <IconButton>
            {
              {
                facebook: <FacebookIcon />,
                twitter: <TwitterIcon />,
                youtube: <YouTubeIcon />,
                instagram: <InstagramIcon />,
                blog: <FormatBoldIcon />,
                twitch: <ExternalIcon Icon={TwitchIcon} />
              }[medium]
            }
          </IconButton>
        </a>
      ))}
    </ExternalLinksWrapper>
  );
};

ExternalLinks.propTypes = {
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      medium: PropTypes.string,
      url: PropTypes.string
    })
  )
};

export default ExternalLinks;
