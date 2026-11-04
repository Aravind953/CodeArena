
import './Card.css'

function Card({ children, className = '', padding = 'default' }) {
  return (
    <div className={`ca-card ca-card--${padding} ${className}`}>
      {children}
    </div>
  )
}

export default Card
