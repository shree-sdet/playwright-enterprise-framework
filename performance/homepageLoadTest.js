import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 2,
  duration: '30s',

  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01']
  }
};

export default function () {
  const response = http.get('https://www.saucedemo.com');

  check(response, {
    'homepage loaded': (r) => r.status === 200,
  });
}