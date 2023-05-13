import http from 'k6/http';
import { sleep } from 'k6';
import { Trend } from 'k6/metrics';

export let options = {
  stages: [
    { duration: '1m', target: 10 }, // Ramp-up to 10 VUs over 1 minute
    { duration: '2m', target: 10 }, // Stay at 10 VUs for 2 minutes
    { duration: '1m', target: 0 }, // Ramp-down to 0 VUs over 1 minute
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // Set a threshold for the response time to be less than 500 milliseconds for 95% of the requests
  },
};

const myCustomTrend = new Trend('myCustomTrend'); // Initialize the custom trend that we'll use to track response times

export default function () {
  const response = http.get('https://reqres.in/api/users?page=1');  //Send http get request

  // Record the response time for the custom trend
  myCustomTrend.add(response.timings.duration);

  sleep(1);
}

export function teardown() {
  // Output the custom trend data at the end of the test
 console.log('MyCustomTrend:', JSON.stringify(myCustomTrend));
}
