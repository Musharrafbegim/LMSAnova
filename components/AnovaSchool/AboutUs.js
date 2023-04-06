import React from 'react'
import Link from 'next/link'

const AboutUs = () => {
  return (
    <>
      <div className="about-area bg-fef8ef ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="about-image">
                <img src="/images/about-img1.png" alt="About" />
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="about-content">
                <span className="sub-title">Online learning</span>
                <h2>
                  Develop Your Skills, Learn Something New, and Grow Your Skills
                  From Anywhere in the World!
                </h2>
                <p>
                  We understand better that online-based learning can make a
                  significant change to reach students from all over the world!
                  Giving options to learn better always can offer the best
                  outcomes!
                </p>

                <ul className="features-list">
                  <li>
                    <span>
                      <i className="flaticon-experience"></i> Expert Trainers
                    </span>
                  </li>
                  <li>
                    <span>
                      <i className="flaticon-time-left"></i> Lifetime Acces
                    </span>
                  </li>
                  <li>
                    <span>
                      <i className="flaticon-tutorials"></i> Remote Learning
                    </span>
                  </li>
                  <li>
                    <span>
                      <i className="flaticon-self-growth"></i> Self Development
                    </span>
                  </li>
                </ul>

                <Link href="/courses">
                  <a className="default-btn">
                    <i className="flaticon-user"></i> View All Courses{' '}
                    <span></span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="shape1">
          <img src="/images/shape1.png" alt="image" />
        </div>
        <div className="shape4">
          <img src="/images/shape4.png" alt="image" />
        </div>
      </div>
    </>
  )
}

export default AboutUs
