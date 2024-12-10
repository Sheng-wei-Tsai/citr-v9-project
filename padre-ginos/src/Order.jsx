import { useEffect, useState} from "react";
import Pizza from "./Pizza";

const intl = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

export default function Order() {
    const [pizzaType, setPizzaType] = useState("pepperoni");
    const [pizzaSize, setPizzaSize] = useState("M");
    const [pizzaTypes, setPizzaTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    let price, selectedPizza;
    if(!loading) {
        selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
        price = intl.format(
            selectedPizza.sizes ? selectedPizza.sizes[pizzaSize] : ""
        )
    }
    //  the [] at the end of the useEffect is where you declare your data dependencies. React wants to know when to run that effect again. You don't give it data dependencies, it assumes any time any hook changes that you should run the effect again. This is bad because that would mean any time setPizzaTypes gets called it'd re-run render and all the hooks again. It'd run infinitely since fetchPizzaTypes calls setPizzaTypes. In our case, we actually only want it to run once, on creation of the component, and then to not run that effect again. (we'll do searching later via clicking the submit button) You can accomplish this only-run-on-creation by providing an empty array.
    useEffect(() => {
        fetchPizzaTypes(pizzaSize);
    }, []);


    async function fetchPizzaTypes() {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const pizzasRes = await fetch("/api/pizzas");
        const pizzasJson = await pizzasRes.json();
        setPizzaTypes(pizzasJson);
        setLoading(false);
    }

    return (
        <div className="order">
          <h2>Create Order</h2>
          <form>
            <div>
              <div>
                <label htmlFor="pizza-type">Pizza Type</label>
                <select
                  onChange={(e) => setPizzaType(e.target.value)}
                  name="pizza-type"
                  value={pizzaType}
                >
                  {pizzaTypes.map((pizza) => (
                    <option key={pizza.id} value={pizza.id}>
                      {pizza.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="pizza-size">Pizza Type</label>
                <div>
                  <span>
                    <input
                      onChange={(e) => setPizzaSize(e.target.value)}
                      checked={pizzaSize === "S"}
                      type="radio"
                      name="pizza-size"
                      value="S"
                      id="pizza-s"
                    />
                    <label htmlFor="pizza-s">Small</label>
                  </span>
                  <span>
                    <input
                      onChange={(e) => setPizzaSize(e.target.value)}
                      checked={pizzaSize === "M"}
                      type="radio"
                      name="pizza-size"
                      value="M"
                      id="pizza-m"
                    />
                    <label htmlFor="pizza-m">Medium</label>
                  </span>
                  <span>
                    <input
                      onChange={(e) => setPizzaSize(e.target.value)}
                      checked={pizzaSize === "L"}
                      type="radio"
                      name="pizza-size"
                      value="L"
                      id="pizza-l"
                    />
                    <label htmlFor="pizza-l">Large</label>
                  </span>
                </div>
              </div>
              <button type="submit">Add to Cart</button>
            </div>
            {loading ? (
              <h3>LOADING …</h3>
            ) : (
              <div className="order-pizza">
                <Pizza
                  name={selectedPizza.name}
                  description={selectedPizza.description}
                  image={selectedPizza.image}
                />
                <p>{price}</p>
              </div>
            )}
          </form>
        </div>
      );
    
}
