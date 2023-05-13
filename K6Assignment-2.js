import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';

export let options = {
  stages: [
    { duration: '1m', target: 10 }, // Ramp-up to 10 VUs over 1 minute
    { duration: '2m', target: 10 }, // Stay at 10 VUs for 2 minutes
    { duration: '1m', target: 0 }, // Ramp-down to 0 VUs over 1 minute
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // Set a threshold for the response time to be less than 500 milliseconds for 95% of the requests
    'http_req_failed': ['rate<0.1'], // Set a threshold for the failure rate to be less than 10%
  },
};

const myCustomTrend = new Trend('myCustomTrend'); // Initialize the custom trend that we'll use to track response times
const errorRate = new Rate('errorRate'); // Initialize a rate metric to track the error rate

export default function () {
  const response = http.get('https://reqres.in/api/users?page=1'); // Send HTTP GET request

  // Assert that the response status code is 200
  check(response, { 'Status is 200': (r) => r.status === 200 });

  // Extract and check the response body
  const responseBody = response.json();
  check(responseBody, { 'Response body is not empty': (body) => body && Object.keys(body).length > 0 });

  const users = responseBody.data;
  check(users, { 'Users array is not empty': (users) => users && users.length > 0 });

  // Record the response time for the custom trend
  myCustomTrend.add(response.timings.duration);

  // Perform additional checks
  const firstUser = users[0];
  check(firstUser.id !== null, { 'User ID is not null': firstUser.id !== null });
  check(firstUser.email.includes('@'), { 'Email is valid': firstUser.email.includes('@') });

  sleep(1);
}

export function teardown() {
  // Output the custom trend data and error rate at the end of the test
  console.log('MyCustomTrend:', JSON.stringify(myCustomTrend));
  console.log('ErrorRate:', errorRate.rate);
}
