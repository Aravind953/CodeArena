
import './Loader.css'

function Loader({ label = 'Loading...' }) {
  return (
    <div className="ca-loader-container">
      <div className="ca-loader-spinner" />
      <p>{label}</p>
    </div>
  )
}

export default Loader
