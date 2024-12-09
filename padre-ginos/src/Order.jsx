import Pizza from "./Pizza";

export default function Order() {
    const pizzaType = "pepperoni";
    const pizzaSize = "M";
    return (
        <div className="order">
            <form action="">
                <div>
                    <div>
                        <label htmlFor="pizza-type">
                            Pizza Type
                        </label>
                        <select name="pizza-type" value={pizzaType}>
                            <option value="pepperoni">The Pepperoni Pizza</option>
                            <option value="hawaiian">The Hawaiian Pizza</option>
                            <option value="big_meat">The Big Meat Pizza</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="pizza-size">Pizza Size</label>
                        <div>
                            <span>
                                <input 
                                    type="radio" 
                                    checked={pizzaSize === "S"}
                                    value="S"
                                    id="pizza-s"
                                />
                                <label htmlFor="pizza-s">Small</label>
                            </span>
                            <span>
                                <input 
                                    type="radio" 
                                    checked={pizzaSize === "M"}
                                    value="M"
                                    id="pizza-m"
                                />
                                <label htmlFor="pizza-s">Medium</label>
                            </span>
                            <span>
                                <input 
                                    type="radio" 
                                    checked={pizzaSize === "L"}
                                    value="L"
                                    id="pizza-l"
                                />
                                <label htmlFor="pizza-l">Large</label>
                            </span>
                        </div>
                    </div>
                    <button type="submit">Add to Cart</button>
                    <div className="order-pizza">
                        <Pizza
                            name="Pepperoni"
                            description="another pep pizza"
                            image="/public/pizzas/pepperoni.webp"
                        />
                        <p>$13.37</p>
                    </div>
                </div>
            </form>
        </div>
    );
}