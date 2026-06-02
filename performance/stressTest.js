import http from 'k6/http';
import { check } from 'k6';

export const options = {

  stages: [
    { duration: '20s', target: 10 },
    { duration: '20s', target: 25 },
    { duration: '20s', target: 50 },
    { duration: '20s', target: 100 }
  ],

  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.10']
  }
};

export default function () {

  const response = http.get(
    'https://jsonplaceholder.typicode.com/posts'
  );

  check(response, {
    'status is 200': (r) => r.status === 200
  });
}