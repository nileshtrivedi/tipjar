import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import Hero from "components/Hero";
import Memberships from "components/Memberships";
import PledgeStats from "components/PledgeStats";
import ExternalLinks from "components/ExternalLinks";
import About from "components/About";
import fetch from "services/fetch";
import { objectKeysToCamelCase } from "utils";

const Profile = () => {
  let { vanityName } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);

        const { data: profileData } = await fetch.get(
          `/profiles?vanity_name=${vanityName}`
        );

        const { data: membershipData } = await fetch.get(
          `/memberships?creator=${profileData.id}`
        );

        if (!profileData) {
          history.push("/404");
        } else {
          setProfile(
            objectKeysToCamelCase({ ...membershipData, ...profileData })
          );
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        history.push("/404");
      }
    };

    fetchProfile();
  }, [vanityName, history]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <Hero {...profile} />
      <Memberships memberships={profile.memberships} />
      <PledgeStats
        earningsPaise={profile.earningsPaise}
        pledgeCount={profile.pledgeCount}
      />
      <ExternalLinks sources={profile.externalLinks} />
      <About videoUrl={profile.featuredVideoUrl} description={profile.about} />
    </>
  );
};

export default Profile;
