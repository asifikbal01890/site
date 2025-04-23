import React from 'react';
import Banner from './Banner/Banner';
import JobCard from './Job/JobCard';
import ApplicationList from './ApplicationList/ApplicationList';

const Home = () => {
    return (
        <div>
           <div>
            <Banner></Banner>
            </div> 
           {/*  <div>
                <AnimatedImages></AnimatedImages>
            </div> */}
            <div>
                <JobCard></JobCard>
            </div>
            <div>
                <ApplicationList></ApplicationList>
            </div>
        </div>
    );
};

export default Home;