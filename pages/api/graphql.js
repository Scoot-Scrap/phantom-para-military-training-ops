// pages/api/graphql.js

import { ApolloServer } from 'apollo-server-micro'
import { gql } from 'graphql-tag'

// Utility to generate a random value within ±variance of a base
function randomAround(base, variance) {
  return Math.round(base + (Math.random() * 2 - 1) * variance)
}

// Generate an initial vitals payload
function generateSampleVitals() {
  const now = new Date().toISOString()
  return {
    timestamp: now,
    heartRate: randomAround(75, 5),
    bloodPressure: {
      systolic: randomAround(120, 8),
      diastolic: randomAround(80, 5),
    },
    oxygenSaturation: randomAround(98, 1),
    respiratoryRate: randomAround(16, 2),
    skinTemperature: (36 + Math.random()).toFixed(1),
  }
}

// In-memory storage for current vitals
let currentVitals = generateSampleVitals()

// GraphQL schema definition
const typeDefs = gql`
  type BloodPressure {
    systolic: Int!
    diastolic: Int!
  }

  type Vitals {
    timestamp: String!
    heartRate: Int!
    bloodPressure: BloodPressure!
    oxygenSaturation: Int!
    respiratoryRate: Int!
    skinTemperature: String!
  }

  input BloodPressureInput {
    systolic: Int!
    diastolic: Int!
  }

  input VitalsInput {
    heartRate: Int!
    bloodPressure: BloodPressureInput!
    oxygenSaturation: Int!
    respiratoryRate: Int!
    skinTemperature: String!
  }

  type Query {
    getVitals: Vitals!
  }

  type Mutation {
    updateVitals(input: VitalsInput!): Vitals!
  }
`

// Resolvers for the schema
const resolvers = {
  Query: {
    getVitals: () => currentVitals,
  },
  Mutation: {
    updateVitals: (_, { input }) => {
      currentVitals = {
        timestamp: new Date().toISOString(),
        ...input,
      }
      return currentVitals
    },
  },
}

// Create Apollo Server instance
const apolloServer = new ApolloServer({ typeDefs, resolvers })

// Disable Next.js body parsing so Apollo can handle raw requests
export const config = {
  api: {
    bodyParser: false,
  },
}

// Export the handler for the /api/graphql endpoint
export default apolloServer.createHandler({ path: '/api/graphql' })