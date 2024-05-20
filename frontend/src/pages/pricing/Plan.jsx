function Plan({id, title, price, features, selectedPlan, setSelectedPlan}) {
    return (
        <div 
            className={`pricing-card ${selectedPlan === id? 'pricing-card-selected': ''}`}
            onClick={() => setSelectedPlan(id)}
        >
            <h3>{title}</h3>
            <p className='price'>{price}</p>
            <ul>
                {
                    features.map((feature, ind) => (
                        <li key={ind}>
                            {feature}
                        </li>
                    ))
                }
            </ul>
    
        </div>
    )
}

export default Plan