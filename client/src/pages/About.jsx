import { Link } from 'react-router-dom';

export default function About() {
  const achievements = [
    {
      title: 'National Award',
      description: 'Received the National Award for the Empowerment of Persons with Disabilities in 2017',
      year: '2017'
    },
    {
      title: 'UNESCO Recognition',
      description: 'Recognized by UNESCO for outstanding contribution in education for visually impaired',
      year: '2019'
    },
    {
      title: 'Sports Excellence',
      description: 'Blind Cricket Team won multiple national championships',
      year: '2020'
    },
    {
      title: 'Digital Inclusion',
      description: 'Successfully trained over 10,000 visually impaired students in digital literacy',
      year: '2023'
    }
  ];

  const initiatives = [
    {
      title: 'Education Support',
      description: 'Providing quality education and accommodation to visually impaired and disabled students through our residential schools and colleges.',
      details: [
        'Free education and accommodation',
        'Digital literacy programs',
        'Career counseling and placement support'
      ]
    },
    {
      title: 'Sports Development',
      description: 'Promoting sports among visually impaired through CABI (Cricket Association for the Blind in India).',
      details: [
        'Blind cricket training',
        'National and international tournaments',
        'Sports infrastructure development'
      ]
    },
    {
      title: 'Vocational Training',
      description: 'Offering skill development and placement-based rehabilitation programs for sustainable livelihoods.',
      details: [
        'Computer training',
        'Handicraft workshops',
        'Business entrepreneurship programs'
      ]
    },
    {
      title: 'Social Enterprises',
      description: 'Creating employment opportunities through sustainable social enterprises.',
      details: [
        'Food processing units',
        'Handicraft production',
        'Digital services'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-tertiary pt-16">
      {/* Hero Section */}
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-accent text-center">
            About Samarthanam Trust
          </h1>
          <p className="mt-4 text-xl text-tertiary text-center max-w-3xl mx-auto">
            Empowering lives through education, sports, and sustainable development initiatives since 1997.
          </p>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="py-16 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Our Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-tertiary p-6 rounded-lg shadow-lg">
                <div className="text-2xl font-bold text-primary mb-2">{achievement.year}</div>
                <h3 className="text-xl font-semibold text-primary mb-2">{achievement.title}</h3>
                <p className="text-secondary">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Initiatives Section */}
      <div className="py-16 bg-tertiary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Our Initiatives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {initiatives.map((initiative, index) => (
              <div key={index} className="bg-accent p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-primary mb-4">{initiative.title}</h3>
                <p className="text-secondary mb-4">{initiative.description}</p>
                <ul className="list-disc list-inside text-secondary">
                  {initiative.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-accent mb-4">Join Our Mission</h2>
          <p className="text-tertiary mb-8 max-w-2xl mx-auto">
            Be a part of our journey in creating an inclusive society. Volunteer with us or support our initiatives.
          </p>
          <div className="space-x-4">
            <Link
              to="/volunteer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-accent bg-secondary hover:bg-tertiary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
            >
              Volunteer
            </Link>
            <Link
              to="/donate"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-accent hover:bg-tertiary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
            >
              Donate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 