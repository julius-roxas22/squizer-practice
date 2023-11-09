import ReactDOM from "react-dom/client";
import App from './app'
import './styling/index.css'

const docRoot = document.getElementById('root')
const root = ReactDOM.createRoot(docRoot)
root.render(<App />)