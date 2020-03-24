import React from "react";
import ExternalLinks from "./ExternalLinks";

export default {
  title: "ExternalLinks",
  component: ExternalLinks
}

export const ExhibitA = () => (
    <ExternalLinks
      sources={[
        { type: 'facebook' },
        { type: 'twitter' },
        { type: 'youtube' },
        { type: 'instagram' },
        { type: 'twitch' },
        { type: 'blog' },
      ]}
    />
)
