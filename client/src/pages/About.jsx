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
    <div className="min-h-screen bg-tertiary">
  
      <div className="container-fluid">
        {/* Hero Section */}
        <div className="relative bg-accent">
          <div className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl lg:text-6xl">
              About Samarthanam Trust
            </h1>
            <p className="mt-6 text-xl text-secondary max-w-3xl">
              Empowering people with disabilities and building an inclusive society together since 1997.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Introduction */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
            <p className="text-lg text-secondary leading-relaxed">
              Samarthanam Trust for the Disabled, founded in 1997, is a non-profit organization providing education, accommodation, food, vocational training and placement based rehabilitation. Based in Bangalore, India, we have expanded our reach across India and abroad, touching countless lives and creating opportunities for people with disabilities.
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-accent p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
              <p className="text-secondary">
                Building a society where people with disabilities are potential tax-payers but not dole recipients.
              </p>
            </div>
            <div className="bg-accent p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
              <p className="text-secondary">
                To empower people with disabilities through education, skill development, and creating opportunities for sustainable livelihoods.
              </p>
            </div>
          </div>

          {/* Key Areas */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-primary mb-6">Key Areas of Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-accent p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary mb-3">Education</h3>
                <p className="text-secondary">Providing quality education and support to students with disabilities.</p>
              </div>
              <div className="bg-accent p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary mb-3">Sports</h3>
                <p className="text-secondary">Promoting sports and physical activities for people with disabilities.</p>
              </div>
              <div className="bg-accent p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary mb-3">Arts & Culture</h3>
                <p className="text-secondary">Nurturing artistic talents and cultural expression.</p>
              </div>
              <div className="bg-accent p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary mb-3">Health & Nutrition</h3>
                <p className="text-secondary">Ensuring proper healthcare and nutrition support.</p>
              </div>
              <div className="bg-accent p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary mb-3">Technology</h3>
                <p className="text-secondary">Leveraging technology for accessibility and empowerment.</p>
              </div>
              <div className="bg-accent p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary mb-3">Community Initiative</h3>
                <p className="text-secondary">Building inclusive communities through various initiatives.</p>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-primary mb-6">Our Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-accent p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
                <div className="text-secondary">Students educated</div>
              </div>
              <div className="bg-accent p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                <div className="text-secondary">Youth trained</div>
              </div>
              <div className="bg-accent p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-secondary">Visually impaired cricketers</div>
              </div>
              <div className="bg-accent p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <div className="text-secondary">Corporate partners</div>
              </div>
            </div>
          </div>

          {/* Awards */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-primary mb-6">Awards & Recognition</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-accent p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary mb-3">National Awards</h3>
                <ul className="list-disc list-inside text-secondary space-y-2">
                  <li>Three-time National Award recipient</li>
                  <li>Recognition for outstanding work in disability sector</li>
                  <li>Excellence in education and rehabilitation</li>
                </ul>
              </div>
              <div className="bg-accent p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary mb-3">International Recognition</h3>
                <ul className="list-disc list-inside text-secondary space-y-2">
                  <li>UN consultative status</li>
                  <li>CRISIL Rated organization</li>
                  <li>CAF International Validated Organization</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-accent rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Join Us in Making a Difference</h2>
            <p className="text-secondary mb-6">
              Be a part of our journey in creating an inclusive society. Volunteer, donate, or partner with us.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-accent bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 