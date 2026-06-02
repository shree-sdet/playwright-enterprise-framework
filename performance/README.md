# K6 Performance Testing

## Objective
Demonstrate performance testing concepts using K6.

---

## Load Test

File:
homepageLoadTest.js

Configuration:
- 2 Virtual Users
- 30 Seconds

Thresholds:
- p95 < 500ms
- Failure Rate < 1%

Results:
- Passed
- Average Response Time ~16ms
- p95 ~17ms
- Failure Rate 0%

Learning:
- Basic load validation
- Response time measurement
- Threshold assertions

---

## Spike Test

File:
homepageSpikeTest.js

Configuration:
- Ramp-up from 2 to 20 users
- Hold load
- Ramp-down

Thresholds:
- p95 < 1000ms
- Failure Rate < 5%

Results:
- Application returned HTTP 429
- Rate limiting observed under sudden traffic increase

Learning:
- Spike testing
- Traffic burst simulation
- Failure detection
- Bottleneck identification

---

## Tools Used

- K6
- JavaScript

Commands

Load Test:

k6 run performance/homepageLoadTest.js

Spike Test:

k6 run performance/homepageSpikeTest.js