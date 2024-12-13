
const Pizza = (props) => {
    return (
        <div className="pizza">
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <img src={props.image ? props.image : "https://piscum.phtots/200"} alt={props.name} />
        </div>
    )
}


  export default Pizza;