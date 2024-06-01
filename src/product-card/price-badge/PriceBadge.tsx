import { FC } from "react"
import './styles.css'
const PriceBadge: FC = () => {
    return (
        <div className="price-container">
            <div className="price">
                <span className="number">25$</span>
            </div>
        </div>
    )
}

export { PriceBadge }