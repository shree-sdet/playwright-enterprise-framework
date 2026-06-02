import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 2,
  duration: '20s',

  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01']
  }
};

export default function () {
  const response = http.get('https://www.saucedemo.com');

  check(response, {
    'status is 200': (r) => r.status === 200
  });
}