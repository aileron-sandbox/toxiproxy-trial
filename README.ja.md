# toxiproxy-trial

ToxiProxyを用いてカオスエンジニアリングのトライアルを行う。

## ローカル環境で実施

### fortioを起動

以下のコマンドでfortioを起動する

```sh
fortio server -quiet
```

### aileron-gatewayの起動

用意されているconfigを用いて、AILERON Gatewayを起動する。

```sh
./aileron-linux-amd64 -f limit_data/config.yaml
```

### toxiproxy-serverの実行

下記コマンドでToxiProxyサーバを実行する

```sh
./toxiproxy-server-linux-amd64 -config limit_data/config.json
```

### Run k6

K6を用いて負荷をかけると同時にレスポンスの検証を行う

```sh
k6 run --quiet --summary-trend-stats "min,avg,med,max,p(90),p(95),p(96),p(97),p(98),p(99),p(99.9),p(99.99),p(100)" ./limit_data/measure.js
```

### 障害の追加

ToxiProxyで障害（Toxic）を追加する場合は以下のようにする。

```sh
./toxiproxy-cli-linux-amd64 toxic add -t limit_data -a bytes=500000 aileron-gateway
```
