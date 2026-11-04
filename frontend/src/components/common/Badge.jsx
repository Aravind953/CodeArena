
import './Badge.css'

function Badge({ children, variant = 'default' }) {
  return (
    <span className={`ca-badge ca-badge--${variant}`}>
      {children}
    </span>
  )
}

export default Badge
