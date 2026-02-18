# toxiproxy-trial

Try chaos-engineering using ToxiProxy

## Try on local

### Run fortio

```sh
fortio server -quiet
```

### Run aileron-gateway

```sh
./aileron-linux-amd64 -f limit_data/config.yaml
```

### Run toxiproxy-server

```sh
./toxiproxy-server-linux-amd64 -config limit_data/config.json
```

### Run k6

```sh
k6 run --quiet --summary-trend-stats "min,avg,med,max,p(90),p(95),p(96),p(97),p(98),p(99),p(99.9),p(99.99),p(100)" ./limit_data/measure.js
```

### Add toxic

```sh
./toxiproxy-cli-linux-amd64 toxic add -t limit_data -a bytes=500000 aileron-gateway
```
