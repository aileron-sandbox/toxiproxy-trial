import http from "k6/http";
import { check } from "k6";
import { Rate } from "k6/metrics";
import { Counter } from "k6/metrics";

export const options = {
    scenarios: {
        warmup: {
            executor: 'constant-arrival-rate',
            exec: "warmup",
            rate: 100,
            timeUnit: '1s',
            duration: '5s',
            preAllocatedVUs: 100,
            maxVUs: 200,
        },
    },
};

export function warmup() {
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
    http.post(url, payload, params);
}
