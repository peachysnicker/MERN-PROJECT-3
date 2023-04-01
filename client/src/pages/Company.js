import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

function Company() {
  return (
    <VerticalTimeline lineColor="#2d3439">
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="March 27, 2023"
        iconStyle={{ background: "#2d3439", color: "#fff" }}
      >
        <p>Idea about this website generated</p>
        <p>Team members: Mariah, Mitsu, Jinhui</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="March 28, 2023"
        iconStyle={{ background: "#2d3439", color: "#fff" }}
      >
        <p>Project progressesion</p>
        <p>
          Technology used: Node.js, React, Express, MongoDB, Graphql, Bootstrap
        </p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="April 02, 2023"
        iconStyle={{ background: "#2d3439", color: "#fff" }}
      >
        <p>Project completed</p>
        <p>Website deployed to Heroku</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement className='vertical-timeline-element--education' iconStyle={{background: '#2d3439', color: '#fff'}}>
        <a href="https://github.com/peachysnicker" rel="noreferrer" target="_blank">Mariah's github</a> <br />
        <a href="https://github.com/mitsushiro1" rel="noreferrer" target="_blank">Mistu's github</a> <br />
        <a href="https://github.com/jhu8480" rel="noreferrer" target="_blank">Jinhui's github</a> <br />
      </VerticalTimelineElement>
    </VerticalTimeline>
  );
}

export default Company;
