import './App.css';
import Table from "./components/Table"

//TODO Holdings Table. Move fetch up a level. Process the transaction data, and feed it into a plain version of the sortable table.


const holdingColumns = [
    { label: "Ticker", accessor: "tickerString", sortable: true },
    { label: "Quantity", accessor: "quanitity", sortable: true },
]

const transactionColumns = [
    { label: "Ticker", accessor: "tickerString", sortable: true, fk: "tickers/TickerString", type: "" },
    { label: "Quantity", accessor: "quantity", sortable: false, fk: "", type: "" },
    { label: "Cost", accessor: "cost",      sortable: true, fk: "", type:"" },
    { label: "Purchase?", accessor: "buy", sortable: true, fk: "", type: "boolean" },
    { label: "Price", accessor: "price", sortable: true, fk: "", type: "" },
    { label: "Date", accessor: "date", sortable: true, fk: "", type: "" }
];

const tickerColumns = [
    { label: "Ticker", accessor: "tickerString", sortable: true, fk: "", type: "" },
    { label: "Exchange", accessor: "exchangeString", sortable: true, fk: "exchange/ExchangeString", type: "" },
    { label: "Name", accessor: "name", sortable: true, fk: "", type: "" },
    { label: "Type", accessor: "type", sortable: true, fk: "", type: "" },
    { label: "RatioToOne", accessor: "ratioToOne", sortable: false, fk: "", type: "" },
    { label: "Current Price", accessor: "price", sortable: false, fk: "", type: "" },
    { label: "Last Updated", accessor: "lastUpdated", sortable: true, fk: "", type: "" }
];

const exchangeColumns = [
    { label: "Exchange", accessor: "exchangeString", sortable: true, fk: "", type: "" },
    { label: "AV Code", accessor: "avCode", sortable: false, fk: "", type: "" },
    { label: "Currency", accessor: "currency", sortable: true, fk: "", type: "" }
];

function App() {
    //const [showWeather, setShowWeather] = useState(false);
    //const [forecastData, setForecasts] = ?
    //const [rowCount, setRowCount] = useState(2);

    return (
        <>
            <div className="table_container">
                <h1>Table of Transactions</h1>
                <Table
                    caption="List of Transactions."
                    query={'transactions'}
                    columns={transactionColumns}
                />
            </div>
            <div className="table_container">
                <h1>Table of Tickers</h1>
                <Table
                    caption="List of tickers."
                    query={'tickers'}
                    columns={tickerColumns}
                />
            </div>
            <div className="table_container">
                <h1>Table of Exchanges</h1>
                <Table
                    caption="List of exchanges."
                    query={'exchange'}
                    columns={exchangeColumns}
                />
            </div>
        </>
    );
}



export default App;

/*
            {!showWeather ? (
                <div>
                    <h1>Welcome!</h1>
                    <p>This is a landing page for your practice SPA.</p>
                    <button onClick={() => setShowWeather(true)}>Show Weather Forecast</button>
                </div>
            ) : (
                <div>
                    <button onClick={() => setRowCount(prev => prev + 1)}>
                        Show More Rows
                    </button>
                    <button onClick={() => setRowCount(prev => prev > 1 ? prev - 1 : 1)}>
                        Show Less Rows
                    </button>

                    <WeatherForecast rows={rowCount} /> /// How does it know to call WeatherForecast when I onClick?
                </div>
            )}


function App() {
    const [forecasts, setForecasts] = useState();

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );
    
    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        if (response.ok) {
            const data = await response.json();
            setForecasts(data);
        }
    }
}

export default App;
*/