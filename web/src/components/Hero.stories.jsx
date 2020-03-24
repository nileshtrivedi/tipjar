import React from "react";

import Hero from "./Hero";

export default {
  title: "Hero",
  component: Hero,
}

export const ExhibitA = () => (
  <Hero 
    bannerImageUrl="https://images.unsplash.com/photo-1495132336320-a0923a300d34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80" 
    profileImageUrl="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2135&q=80"
    themeColor={[183, 179, 175]}
    name="Jake Peralta"
    short="Filmmaker"
    description=""
  />
)

export const ExhibitB = () => (
  <Hero 
    bannerImageUrl="https://images.unsplash.com/photo-1577490621716-b1aa5f091524?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3436&q=80" 
    profileImageUrl="https://images.unsplash.com/photo-1516575334481-f85287c2c82d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80"
    themeColor={[209, 31, 6]}
    name="Amy Santiago"
    short="Photographer"
    description=""
  />
)
