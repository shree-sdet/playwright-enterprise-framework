import http from 'k6/http';
import { check } from 'k6';

export const options = {
 stages: [
  { duration: '10s', target: 2 },
  { duration: '30s', target: 10 },
  { duration: '40s', target: 20 },
  { duration: '10s', target: 2 }
],
  thresholds: {
    http_req_duration: ['p(95)<1000'],
    http_req_failed: ['rate<0.05']
  }
};

export default function () {
  const response = http.get('https://www.saucedemo.com');
  check(response, {'status is 200': (r) => r.status === 200});
  if (response.status !== 200) {
  console.log(`Status: ${response.status}`);
}
}