import http from "k6/http";
import { check } from "k6";
import { Rate } from "k6/metrics";
import { Counter } from "k6/metrics";

export const options = {
    scenarios: {
        measure: {
            executor: 'constant-arrival-rate',
            exec: "measure",
            rate: 1000,
            timeUnit: '1s',
            duration: '180s',
            preAllocatedVUs: 200,
            maxVUs: 500,
        },
    },
    thresholds: {
        "http_req_duration": [
            "p(90) < 10",
            "p(95) < 50",
            "p(99) < 250",
            "p(100) < 500",
        ],
        "http_000_rate": ["rate < 0.01"],
        "http_200_rate": ["rate > 0.98"],
        "http_500_rate": ["rate < 0.01"],
        "http_response": ["rate > 900"],
        
    }
};

const rate000 = new Rate("http_000_rate"); // Not 200, 500
const rate200 = new Rate("http_200_rate");
const rate500 = new Rate("http_500_rate");
const http_response = new Counter("http_response");

export function measure() {
    const url = "http://localhost:28080/debug";
    const payload = JSON.stringify({
        id: 123,
        name: "John Doe",
    });
    const params = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    let res = http.post(url, payload, params);
    rate200.add(res.status === 200);
    rate500.add(res.status === 500);
    rate000.add(!(res.status === 200 || res.status === 500));
    http_response.add(res.status === 200 || res.status === 500) // UnexpectedEOFのような結果を除外してカウント
    check(res, {
        "status is 200 or 500": (r) => r.status === 200 || r.status === 500,
    });
}
