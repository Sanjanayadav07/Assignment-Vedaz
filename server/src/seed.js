import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { Expert } from './models/Expert.js';
import { Booking } from './models/Booking.js';

dotenv.config();

// Dynamic future dates
const today = new Date();

const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const day2 = new Date(today);
day2.setDate(today.getDate() + 2);

const day3 = new Date(today);
day3.setDate(today.getDate() + 3);

const day4 = new Date(today);
day4.setDate(today.getDate() + 4);

const day5 = new Date(today);
day5.setDate(today.getDate() + 5);

const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

const experts = [
  {
    name: 'Dr. Maya Verma',
    category: 'Career Coaching',
    experience: 10,
    rating: 4.8,
    bio: 'Helps professionals with role transitions and growth strategy.',
    availableSlots: [
      {
        date: formatDate(tomorrow),
        slots: ['10:00 AM', '11:00 AM', '03:00 PM']
      },
      {
        date: formatDate(day2),
        slots: ['09:00 AM', '01:00 PM', '04:00 PM']
      }
    ]
  },

  {
    name: 'Arjun Sen',
    category: 'Software Architecture',
    experience: 12,
    rating: 4.9,
    bio: 'Specializes in scalable backend architecture and system design.',
    availableSlots: [
      {
        date: formatDate(tomorrow),
        slots: ['09:30 AM', '12:30 PM', '05:30 PM']
      },
      {
        date: formatDate(day3),
        slots: ['10:30 AM', '02:30 PM', '06:00 PM']
      }
    ]
  },

  {
    name: 'Nina Dsouza',
    category: 'Product Management',
    experience: 8,
    rating: 4.7,
    bio: 'Supports PMs in roadmap, stakeholder, and execution planning.',
    availableSlots: [
      {
        date: formatDate(day2),
        slots: ['08:30 AM', '11:30 AM', '02:00 PM']
      },
      {
        date: formatDate(day4),
        slots: ['09:00 AM', '12:00 PM', '03:30 PM']
      }
    ]
  },

  {
    name: 'Arnab Tripathy',
    category: 'Software Architecture',
    experience: 3,
    rating: 4.2,
    bio: 'Focuses on backend performance and clean architecture for MERN systems.',
    availableSlots: [
      {
        date: formatDate(day3),
        slots: ['09:30 AM', '11:00 AM', '04:30 PM']
      },
      {
        date: formatDate(day4),
        slots: ['10:30 AM', '01:00 PM', '05:00 PM']
      }
    ]
  },

  {
    name: 'Amitav Panda',
    category: 'Software Architecture',
    experience: 4,
    rating: 4.5,
    bio: 'Works on reliable API design and modular architecture patterns.',
    availableSlots: [
      {
        date: formatDate(day3),
        slots: ['10:00 AM', '12:30 PM', '03:00 PM']
      },
      {
        date: formatDate(day5),
        slots: ['09:00 AM', '02:00 PM', '06:00 PM']
      }
    ]
  },

  {
    name: 'Venugopal Swamy',
    category: 'Product Manager',
    experience: 7,
    rating: 4.0,
    bio: 'Helps product teams align strategy, discovery, and delivery outcomes.',
    availableSlots: [
      {
        date: formatDate(day4),
        slots: ['08:30 AM', '11:30 AM', '02:30 PM']
      },
      {
        date: formatDate(day5),
        slots: ['09:30 AM', '01:30 PM', '04:00 PM']
      }
    ]
  },

  {
    name: 'Birbal Das',
    category: 'Career Coaching',
    experience: 5,
    rating: 4.6,
    bio: 'Guides early and mid-career professionals through career pivots.',
    availableSlots: [
      {
        date: formatDate(day4),
        slots: ['09:00 AM', '11:00 AM', '03:00 PM']
      },
      {
        date: formatDate(day5),
        slots: ['10:00 AM', '01:00 PM', '05:00 PM']
      }
    ]
  },

  {
    name: 'Senapati Chand',
    category: 'Career Coaching',
    experience: 1,
    rating: 4.0,
    bio: 'Supports freshers with interview prep and career goal setting.',
    availableSlots: [
      {
        date: formatDate(day3),
        slots: ['08:30 AM', '12:00 PM', '04:30 PM']
      },
      {
        date: formatDate(day5),
        slots: ['09:30 AM', '02:00 PM', '06:00 PM']
      }
    ]
  }
];

const runSeed = async () => {
  await connectDB();

  await Expert.deleteMany({});
  await Booking.deleteMany({});

  await Expert.insertMany(experts);

  console.log('Seed completed: experts inserted');

  process.exit(0);
};

runSeed().catch((error) => {
  console.error('Seed failed:', error.message);

  process.exit(1);
});