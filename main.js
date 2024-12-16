// 現地の時間と日付を取得して表示する関数
function getLocalTimeAndDate(timezone, elementId, cityName) {
    const options = {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const dateString = new Intl.DateTimeFormat('ja-JP', options).format(new Date());
    document.getElementById(elementId).innerHTML = `${cityName}の日時: ${dateString}`;
}

// 天気情報を取得して表示する関数
function getWeather(city, elementId) {
    const apiKey = 'f4958b0a0541fd7b5811d5e56557bc6c';  // OpenWeatherMapのAPIキーをここに入力
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const temp = data.main.temp;
            const description = data.weather[0].description;
            document.getElementById(elementId).innerHTML = `${city}の天気: ${temp}°C, ${description}`;
        })
        .catch(error => {
            document.getElementById(elementId).innerHTML = `天気情報の取得に失敗しました。`;
        });
}

// 東京とプラハの時間、日付、天気情報を表示
function updateTokyoPrague() {
    // 東京の時間と日付 (タイムゾーンは Asia/Tokyo)
    getLocalTimeAndDate('Asia/Tokyo', 'tokyo-time', '東京');
    
    // プラハの時間と日付 (タイムゾーンは Europe/Prague)
    getLocalTimeAndDate('Europe/Prague', 'prague-time', 'プラハ');

    // 東京とプラハの天気情報を表示
    getWeather('Tokyo', 'tokyo-weather');
    getWeather('Prague', 'prague-weather');
}

// ページ読み込み後に情報を更新
updateTokyoPrague();

// 1秒ごとに時間と日付を更新
setInterval(() => {
    updateTokyoPrague();
}, 1000);
