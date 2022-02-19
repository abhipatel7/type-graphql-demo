import { GraphQLError } from 'graphql';
import queryComplexity, {
  fieldExtensionsEstimator,
  simpleEstimator,
} from 'graphql-query-complexity';

export const rule = queryComplexity({
  // The maximum allowed query complexity, queries above this threshold will be rejected
  maximumComplexity: 10,

  // The query variables. This is needed because the variables are not available
  // in the visitor of the graphql-js library
  variables: {},

  // Optional callback function to retrieve the determined query complexity
  // Will be invoked whether the query is rejected or not
  // This can be used for logging or to implement rate limiting
  onComplete: (complexity: number) => {
    console.log('Determined query complexity: ', complexity);
  },

  // Optional function to create a custom error
  createError: (max: number, actual: number) => {
    return new GraphQLError(
      `Query is too complex: ${actual}. Maximum allowed complexity: ${max}`
    );
  },

  // Add any number of estimators. The estimators are invoked in order, the first
  // numeric value that is being returned by an estimator is used as the field complexity.
  // If no estimator returns a value, an exception is raised.
  estimators: [
    // Add more estimators here...
    fieldExtensionsEstimator(),

    // This will assign each field a complexity of 1 if no other estimator
    // returned a value.
    simpleEstimator({
      defaultComplexity: 1,
    }),
  ],
});
