import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '15s', target: 1000 }, // ramp up from 1 to 1000 VUs for 15s
    { duration: '30s', target: 1000 }, // stay flat at 1000 VUs for 30s
    { duration: '10s', target: 0 }, // ramp down to 0 VUs for 3 10s
  ]
};

const totalProducts = 1000011;
const last10PercentRange = Math.floor(0.1 * totalProducts);
const randomID = Math.floor((Math.random() * last10PercentRange) + (totalProducts - last10PercentRange));

export default function() {
  const url = 'http://localhost:8080/reviews';
  const productEndpoint = `${url}/?product_id=${randomID}`;
  const productMetaEndpoint = `${url}/meta/?product_id=${randomID}`;

  // const getReviews = http.get(productEndpoint);
  // sleep(1);
  // check(getReviews, {
  //   'response code was 200': (response) => response.status === 200,
  // });

  const getMeta = http.get(productMetaEndpoint);
  sleep(1);
  check(getMeta, {
    'response code was 200': (response) => response.status === 200,
  });
}

